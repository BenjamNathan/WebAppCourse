using System.ComponentModel.DataAnnotations;

namespace CourseApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "Please provide a username")]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Password { get; set; }        
    }
}