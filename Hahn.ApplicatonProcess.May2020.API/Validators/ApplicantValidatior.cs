using FluentValidation;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.API.Validators
{
    public class ApplicantValidatior : AbstractValidator<Applicant>
    {

        private readonly IHttpClientFactory _clientFactory;
       
        public ApplicantValidatior(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
            RuleFor(m => m.Name).NotEmpty().WithMessage("Please provide a Name").MinimumLength(5).WithMessage("Please provide minimum 5 letters");

            RuleFor(m => m.Family).NotEmpty().WithMessage("Please provide a Family Name").MinimumLength(5).WithMessage("Please provide minimum 5 letters");

            RuleFor(m => m.Address).NotEmpty().WithMessage("Please provide a Address").MinimumLength(10).WithMessage("Please provide minimum 10 letters");

            RuleFor(m => m.CountryOfOrgin).NotEmpty().WithMessage("Please provide a Country").
                Must(c => Task.Run(async () => await SearchForACountry(c)).Result).WithMessage("Please provide a valid country");

            RuleFor(m => m.Email).NotEmpty().WithMessage("Please provide a Country").EmailAddress().WithMessage("Please provide a valid Email");

            RuleFor(m => m.Age).InclusiveBetween(20, 60).WithMessage("Please provide age between 20 and 60");
        }
       

        private async Task<bool> SearchForACountry(string countryName)
        {
          
            try
            {
                var request = new HttpRequestMessage(HttpMethod.Get,
            $"name/{countryName}?fullText=true");
                var client = _clientFactory.CreateClient("CountryValidatior");
                var response = await client.SendAsync(request);
                if (response.IsSuccessStatusCode)
                {
                     var responseStream = await response.Content.ReadAsStringAsync();
                    return true;

                }
                return false;
            }
            catch (System.Exception ex)
            {
                return false;

            }
        }
    }
}
