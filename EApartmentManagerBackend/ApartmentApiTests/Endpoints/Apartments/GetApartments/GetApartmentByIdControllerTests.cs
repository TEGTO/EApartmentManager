using ApartmentApi.Endpoints.Apartments.GetApartments;
using ApartmentApi.Services;
using ApartmentApiTests.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace ApartmentApiTests.Endpoints.Apartments.GetApartments
{
    [TestFixture]
    internal class GetApartmentByIdControllerTests : ControlllerTestTemplate<GetApartmentByIdController>
    {
        protected override GetApartmentByIdController CreateController()
        {
            return new GetApartmentByIdController(
                mockService.Object,
                mockMapper.Object);
        }
        [Test]
        public async Task GetApartmentById_ValidQuery_ServiceInvokes1Time()
        {
            // Arrange
            var controller  = CreateController();
            var id = "1";
            CancellationToken cancellationToken = default(global::System.Threading.CancellationToken);
            // Act
            var result = await controller.GetApartmentById(id,cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.Value, Is.Not.Null);
            mockService.Verify(x => x.GetApartmentByIdAsync(id, cancellationToken), Times.Exactly(1));
        }
    }
}