using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hahn.ApplicatonProcess.May2020.Data;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Hahn.ApplicatonProcess.May2020.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {
        private readonly ApplicantDBContext _context;

        public ApplicantController(ApplicantDBContext applicantDBContext)
        {
            _context = applicantDBContext;
        }
        /// <summary>
        /// Gets all available Applicant
        /// </summary>
        /// <returns>List of Applicant</returns>
        // GET api/Applicant
        [HttpGet]
        public async Task<IEnumerable<Applicant>> GetAll()
        {
            return await _context.Applicants.
                                  AsNoTracking().
                                  ToListAsync();
        }
        /// <summary>
        /// Gets an individual Applicant by Id
        /// </summary>
        /// <param name="id">Applicant identifier</param>
        /// <returns></returns>
        // GET api/Applicant/5
        [HttpGet("{id}")]
        public async Task<Applicant> Get(int id)
        {
            return await _context.Applicants
                                 .AsNoTracking()
                                 .SingleOrDefaultAsync(m => m.GetID() == id);
        }

        // POST api/applicant
        [HttpPost]
        public async Task<int> Post([FromBody]Applicant applicant)
        {
            _context.Add(applicant);
            return await _context.SaveChangesAsync();
        }

        // PUT api/applicant/5
        [HttpPut("{id}")]
        public async Task<int> Put(int id, [FromBody]Applicant applicant)
        {
            _context.Update(applicant);
            return await _context.SaveChangesAsync();
        }

        // DELETE api/authors/5
        [HttpDelete("{id}")]
        public async Task<int> Delete(int id)
        {
            var author = _context.Applicants.SingleOrDefault(m => m.ID == id);
            _context.Applicants.Remove(author);
            return await _context.SaveChangesAsync();
        }

        [HttpGet("count")]
        public async Task<int> GetCount()
        {
            return await _context.Applicants.CountAsync();
        }
    }
}