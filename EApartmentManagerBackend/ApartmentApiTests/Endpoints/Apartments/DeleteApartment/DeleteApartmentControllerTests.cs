using ApartmentApi.Endpoints.Apartments.DeleteApartments;
using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Services;
using ApartmentApiTests.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace ApartmentApiTests.Endpoints.Apartments.DeleteApartment
{
    [TestFixture]
    internal class DeleteApartmentControllerTests : ControlllerTestTemplate<DeleteApartmentController>
    {
        protected override DeleteApartmentController CreateController()
        {
            return new DeleteApartmentController(
                mockService.Object,
                mockMapper.Object);
        }
        [Test]
        public async Task DeleteApartmentById_ValidData_ServiceInvokes1Time()
        {
            // Arrange
            var controller = CreateController();
            var id = "1";
            CancellationToken cancellationToken = default(global::System.Threading.CancellationToken);
            // Act
            var result = await controller.DeleteApartmentById(id, cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.IsInstanceOf<OkResult>(result);
            mockService.Verify(x => x.DeleteApartmentById(id, cancellationToken), Times.Exactly(1));
        }
    }
}