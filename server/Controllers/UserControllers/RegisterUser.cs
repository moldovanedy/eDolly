using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.DTO.Users;
using Server.Models;
using Server.Validations;

namespace Server.Controllers.UserControllers
{
    [ApiController]
    [Route("users")]
    public class RegisterUser : ControllerBase
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> RegisterEndpoint(NewUserDto userDto)
        {
            string? errorMessage = UserValidations.ValidateName(userDto.Name);
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }
        
            errorMessage = UserValidations.ValidateEmail(userDto.Email);
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }
        
            errorMessage = UserValidations.ValidatePassword(userDto.Password);
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }
        
            errorMessage = UserValidations.ValidatePhone(userDto.Phone);
            if (errorMessage != null)
            {
                return BadRequest(errorMessage);
            }

            var user = new User
            {
                Email = userDto.Email, Name = userDto.Name, Phone = userDto.Phone
            };
            
            PasswordHasher<User> passwordHasher = new();
            string hashedPassword = passwordHasher.HashPassword(user, userDto.Password);
            user.Password = hashedPassword;

            await using (var ctx = new AppDbContext())
            {
                if (await ctx.Users.AnyAsync(dbUser => dbUser.Email == userDto.Email))
                {
                    return BadRequest("Acest email este deja folosit de un alt cont");
                }

                await ctx.Users.AddAsync(user);

                try
                {
                    await ctx.SaveChangesAsync();
                }
                catch (DbUpdateException e)
                {
                    Trace.TraceError(e.Message);
                    return StatusCode(500, "A apărut o eroare, vă rugăm reîncercați mai târziu");
                }
            }
        
            return Created();
        }
    }
}
