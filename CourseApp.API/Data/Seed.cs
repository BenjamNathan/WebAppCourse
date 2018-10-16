using System.Collections.Generic;
using System.Linq;
using CourseApp.API.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace CourseApp.API.Data
{
    public class Seed
    {
        /* No longer needed because of Identity
           private readonly DataContext _context;

           public Seed(DataContext context)
           {
                _context = context;
           }
        */

        private readonly UserManager<User> _userManager;

        public Seed(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public void SeedUsers()
        {
            if (!_userManager.Users.Any())
            {
                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    _userManager.CreateAsync(user, "password").Wait();

                    // No longer need to generate a password hash because of Identity
                    // byte[] passwordHash, passwordSalt;
                    // CreatePasswordHash("password", out passwordHash, out passwordSalt);

                    // No longer need this because no longer using own password verification
                    // user.PasswordHash = passwordHash;
                    // user.PasswordSalt = passwordSalt;
                    // user.UserName = user.UserName.ToLower();

                    // _context.Users.Add(user);
                }

                // _context.SaveChanges();
            }            
        }

        // No longer using this method above
        // private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        // {
        //     using (var hmac = new System.Security.Cryptography.HMACSHA512())
        //     {
        //         passwordSalt = hmac.Key;
        //         passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        //         // ComputeHash accepts a byte array so have to convert password string into bytes
        //     }
        // }
    }
}