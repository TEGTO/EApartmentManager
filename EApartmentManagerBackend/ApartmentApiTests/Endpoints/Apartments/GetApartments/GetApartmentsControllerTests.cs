using ApartmentApi.Endpoints.Apartments.GetApartments;
using ApartmentApi.Models;
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
    internal class GetApartmentsControllerTests : ControlllerTestTemplate<GetApartmentsController>
    {
        protected override GetApartmentsController CreateController()
        {
            return new GetApartmentsController(
                mockService.Object,
                mockMapper.Object);
        }
        [Test]
        public async Task GetApartments_ValidQuery_ServicesInvokes1Time()
        {
            // Arrange
            var controller = CreateController();
            string sorting = "asc";
            int rooms = -1;
            CancellationToken cancellationToken = default(global::System.Threading.CancellationToken);
            // Act
            var result = await controller.GetApartments(
                sorting,
                rooms,
                cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.IsInstanceOf<OkObjectResult>(result.Result);
            var okResult = result.Result as OkObjectResult;
            Assert.That(okResult, Is.Not.Null);
            Assert.That(okResult.Value, Is.Not.Null);
            mockService.Verify(x => x.GetApartmentsAsync(sorting, rooms, cancellationToken), Times.Exactly(1));
        }
    }
}