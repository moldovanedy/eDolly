using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json.Linq;
using Server.Models;

namespace Server.Controllers.UserControllers
{
    [ApiController]
    [Route("users")]
    public class GetUserData : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Produces("application/json")]
        public async Task<IActionResult> GetUserDataEndpoint()
        {
            StringValues authToken = Request.Headers.Authorization;
            if (authToken.Count == 0 || (!authToken[0]?.StartsWith("Bearer ") ?? false))
            {
                return Unauthorized("Nu sunteți logat în cont");
            }

            string? token = authToken[0]?.Substring("Bearer ".Length);
            if (string.IsNullOrWhiteSpace(token))
            {
                return Unauthorized("Nu sunteți logat în cont");
            }
            
            //TODO: check token against the DB
            await using var ctx = new AppDbContext();
            User? user = await ctx.Users.FirstOrDefaultAsync(dbUser => dbUser.AuthToken == token);
            if (user == null)
            {
                return Unauthorized("Nu sunteți logat în cont");
            }

            return Ok(
                new JObject(
                    new JProperty("name", user.Name),
                    new JProperty("email", user.Email),
                    new JProperty("phone", user.Phone)));
        }
    }
}
