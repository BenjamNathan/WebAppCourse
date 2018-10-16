using System;
using System.Threading.Tasks;
using CourseApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext Context { get; }

        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.UserName == username);

            if (user == null)
                return null;

            // Commented out because no longer using own password verification
            //if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            //    return null;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                // ComputeHash accepts a byte array so have to convert password string into bytes
                for (int i = 0; i < computedHash.Length; i++){
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            // No longer need this because no longer using own password verification 
            // user.PasswordHash = passwordHash;
            // user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return user;

        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                // ComputeHash accepts a byte array so have to convert password string into bytes
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.UserName == username))
                return true;

            return false;
        }
    }
}