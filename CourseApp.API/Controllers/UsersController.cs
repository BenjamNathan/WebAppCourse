using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using CourseApp.API.Data;
using CourseApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ICourseAppRepository _repo;
        private readonly IMapper _mapper;
        public UsersController(ICourseAppRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetUsers();

            var usersToReturn = _mapper.Map<IEnumerable<UserForListDto>>(users);
            // Requires IEnumerable because it's returning a list

            return Ok(usersToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.GetUser(id);

            var userToReturn = _mapper.Map<UserForDetailedDto>(user);
            // UserForDetailedDto is the map into class (technically the Type) and user is the map from

            return Ok(userToReturn);
        }


    }
}