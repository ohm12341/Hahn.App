using Hahn.ApplicatonProcess.May2020.API;
using Hahn.ApplicatonProcess.May2020.API.Controllers;
using Hahn.ApplicatonProcess.May2020.API.Models;
using Hahn.ApplicatonProcess.May2020.Data;
using Hahn.ApplicatonProcess.May2020.Domain.Applicants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hahn.ApplicatonProcess.May2020.Tests
{
    [TestClass]
    public class ControllerIntegrationTests
    {
        private readonly WebApplicationFactory<Startup> _factory;

        public ControllerIntegrationTests()
        {
            _factory = new WebApplicationFactory<Startup>();
        }
        [TestMethod]
        public async Task ApplicantController_CheckForRetunType_of_GetAll()
        {

            var inMemoryDataContextOptions = new DbContextOptionsBuilder<ApplicantDBContext>()
        .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
        .Options;

            var mockLogger = new Mock<ILoggerFactory>();
            ILoggerFactory logger = mockLogger.Object;

            var mockHttpContextAccesor = new Mock<IHttpContextAccessor>();
            IHttpContextAccessor httpContextAccessor = mockHttpContextAccesor.Object;



            var applicantDBContext = new ApplicantDBContext(inMemoryDataContextOptions);
            var controller = new ApplicantController(applicantDBContext, logger, httpContextAccessor);


            Assert.IsInstanceOfType(await controller.GetAll(), typeof(IEnumerable<Applicant>));


        }

        [TestMethod]
        public async Task ApplicantController_Post_And_GetAll()
        {

            var inMemoryDataContextOptions = new DbContextOptionsBuilder<ApplicantDBContext>()
        .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
        .Options;

            var mockLogger = new Mock<ILoggerFactory>();
            ILoggerFactory logger = mockLogger.Object;



            var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            var context = new DefaultHttpContext();



            mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(context);
            //Mock HeaderConfiguration
            IHttpContextAccessor httpContextAccessor = mockHttpContextAccessor.Object;

            var controllerContext = new ControllerContext()
            {
                HttpContext = context,
            };
            var applicantDBContext = new ApplicantDBContext(inMemoryDataContextOptions);
            var controller = new ApplicantController(applicantDBContext, logger, httpContextAccessor)
            {
                ControllerContext = controllerContext
            };

            Assert.IsInstanceOfType(await controller.Post(new Applicant()
            {
                Address = "Test",
                Age = 24,
                CountryOfOrgin = "Uk",
                Email = "contoso@microsoft.com",
                Family = "contoso",
                IsHired = true,
                Name = "Anoop"

            }), typeof(Tuple<Applicant, Link>));

            var applicantlist = await controller.GetAll();
            Assert.AreEqual(applicantlist.Count(), 1);


        }

        [TestMethod]
        public async Task ApplicantController_Update_And_GetAll()
        {

            var inMemoryDataContextOptions = new DbContextOptionsBuilder<ApplicantDBContext>()
        .UseInMemoryDatabase(databaseName: "Test_With_In_Memory_Database")
        .Options;

            var mockLogger = new Mock<ILoggerFactory>();
            ILoggerFactory logger = mockLogger.Object;



            var mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            var context = new DefaultHttpContext();



            mockHttpContextAccessor.Setup(_ => _.HttpContext).Returns(context);
            //Mock HeaderConfiguration
            IHttpContextAccessor httpContextAccessor = mockHttpContextAccessor.Object;

            var controllerContext = new ControllerContext()
            {
                HttpContext = context,
            };
            var applicantDBContext = new ApplicantDBContext(inMemoryDataContextOptions);
            var controller = new ApplicantController(applicantDBContext, logger, httpContextAccessor)
            {
                ControllerContext = controllerContext
            };
            var newApplicant = new Applicant()
            {
                Address = "Test",
                Age = 24,
                CountryOfOrgin = "Uk",
                Email = "contoso@microsoft.com",
                Family = "contoso",
                IsHired = true,
                Name = "Anoop"

            };

            var applicant = await controller.Post(newApplicant);
            Assert.IsInstanceOfType(applicant, typeof(Tuple<Applicant, Link>));


            newApplicant.Age = 30;

            await controller.Put(newApplicant.ID, newApplicant);


            var applicantlist = await controller.Get(newApplicant.ID);
            Assert.AreEqual(applicantlist.Age, 30);


        }

      
     

    }
}
