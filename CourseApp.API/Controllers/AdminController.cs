using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CourseApp.API.Data;
using CourseApp.API.Dtos;
using CourseApp.API.Helpers;
using CourseApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly ICourseAppRepository _repo;
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;

        public AdminController(ICourseAppRepository repo, DataContext context,
            UserManager<User> userManager, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _repo = repo;
            _context = context;
            _userManager = userManager;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        // Authorize policy matches name in start up class
        [Authorize(Policy = "RequireAdminRole")]
        [HttpGet("usersWithRoles")]
        public async Task<IActionResult> GetUsersWithRoles()
        {
            var userList = await (from user in _context.Users
                                  orderby user.UserName
                                  select new
                                  {
                                      user.Id,
                                      user.UserName,
                                      Roles = (from userRole in user.UserRoles
                                               join role in _context.Roles
                                               on userRole.RoleId
                                               equals role.Id
                                               select role.Name).ToList()
                                  }).ToListAsync();

            return Ok(userList);
        }

        [Authorize(Policy = "RequireAdminRole")]
        [HttpPost("editRoles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDto roleEditDto)
        {
            var user = await _userManager.FindByNameAsync(userName);

            var userRoles = await _userManager.GetRolesAsync(user);

            var selectedRoles = roleEditDto.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };
            // ?? is the null coalescing operator which expands to:
            // selectedRoles = selectedRoles != null ? selectedRoles : new string[] {}
            // Essentially means, if not null use what's on the left, if it is use what's on the right

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to add to roles");

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));

            if (!result.Succeeded)
                return BadRequest("Failed to remove the roles");

            return Ok(await _userManager.GetRolesAsync(user));
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpGet("photosForModeration")]
        public async Task<IActionResult> GetPhotosForModeration()
        {
            var photoList = await (from photo in _context.Photos.IgnoreQueryFilters()
                                 orderby photo.DateAdded
                                 select new
                                 {
                                     photo.Id,
                                     photo.UserId,
                                     photo.IsApproved,
                                     photo.Url
                                 }).ToListAsync();

            var unapprovedPhotosList = photoList.Where(p => p.IsApproved == false);

            return Ok(unapprovedPhotosList);
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpPut("approvePhoto/{id}")]
        public async Task<IActionResult> ApprovePhoto(int id)
        {
            var photoToApprove = await _repo.GetPhoto(id);

            photoToApprove.IsApproved = true;

            await _context.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Policy = "ModeratePhotoRole")]
        [HttpDelete("photosForModeration/{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = _cloudinary.Destroy(deleteParams);

                if (result.Result == "ok")
                    _repo.Delete(photoFromRepo);
            }

            if (photoFromRepo.PublicId == null)
                _repo.Delete(photoFromRepo);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Failed to delete the photo");
        }
    }
}
