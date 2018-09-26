using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseApp.API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CourseApp.API.Controllers
{
    // http://localhost:5000/api/values  This URL would hit the first method (GET api/values) Assuming this is a GET URL
    // If the URL ended /values/5 this would hit the second method and that's what the browser would return
    // App knows to point to localhost:5000 because it's set in the Properties > launchSettings.json file
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;

        public ValuesController(DataContext context)
        {
            _context = context;
        }
        // GET api/values
        [HttpGet]
        // IActionResult allows us to return http responses to the client       
        // Made asynchronous because it keeps the connection open allowing multiple request to be performed at the same time
        // If it wasn't then each request would have to wait for the other to finish
        public async Task<IActionResult> GetValues()
        {
            var values = await _context.Values.ToListAsync();

            // await used to make it an async method and ToListAsync to 

            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);

            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
