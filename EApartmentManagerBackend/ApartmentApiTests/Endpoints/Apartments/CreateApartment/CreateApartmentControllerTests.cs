using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Models;
using ApartmentApi.Services;
using ApartmentApiTests.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace ApartmentApiTests.Endpoints.Apartments.CreateApartment
{
    [TestFixture]
    internal class CreateApartmentControllerTests : ControlllerTestTemplate<CreateApartmentController>
    {
        protected override CreateApartmentController CreateController()
        {
            return new CreateApartmentController(
                mockService.Object,
                mockMapper.Object);
        }
        [Test]
        public async Task CreateApartment_ValidData_ServiceInvokes1Time()
        {
            // Arrange
            var controller = CreateController();
            var createApartmentRequest = new CreateApartmentRequest();
            CancellationToken cancellationToken = default(global::System.Threading.CancellationToken);
            // Act
            var result = await controller.CreateApartment(createApartmentRequest, cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.Value, Is.Not.Null);
            mockMapper.Verify(x => x.Map<Apartment>(It.IsAny<CreateApartmentRequest>()), Times.Exactly(1));
            mockService.Verify(x => x.CreateApartmentAsync(It.IsAny<Apartment>(), cancellationToken), Times.Exactly(1));
            mockMapper.Verify(x => x.Map<CreateApartmentResponse>(It.IsAny<Apartment>()), Times.Exactly(1));
        }
    }
}
