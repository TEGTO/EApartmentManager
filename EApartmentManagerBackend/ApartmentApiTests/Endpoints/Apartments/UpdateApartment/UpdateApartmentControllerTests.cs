using ApartmentApi.Endpoints.Apartments.GetApartments;
using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Models;
using ApartmentApi.Services;
using ApartmentApiTests.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace ApartmentApiTests.Endpoints.Apartments.UpdateApartment
{
    [TestFixture]
    internal class UpdateApartmentControllerTests : ControlllerTestTemplate<UpdateApartmentController>
    {
        protected override UpdateApartmentController CreateController()
        {
            return new UpdateApartmentController(
                mockService.Object,
                mockMapper.Object);
        }
        [Test]
        public async Task UpdateApartment_ValidData_ServiceInvokes1Time()
        {
            // Arrange
            var controller = CreateController();
            var id = "1";
            var updateApartment = new UpdateApartmentRequest();
            CancellationToken cancellationToken = default(global::System.Threading.CancellationToken);
            // Act
            var result = await controller.UpdateApartment(id, updateApartment, cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.IsInstanceOf<OkResult>(result);
            mockMapper.Verify(x => x.Map<Apartment>(It.IsAny<UpdateApartmentRequest>()), Times.Exactly(1));
            mockService.Verify(x => x.UpdateApartmentByIdAsync(id, It.IsAny<Apartment>(), cancellationToken), Times.Exactly(1));
        }
    }
}