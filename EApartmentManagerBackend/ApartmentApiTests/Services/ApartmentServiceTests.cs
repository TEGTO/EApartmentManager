using ApartmentApi.Models;
using ApartmentApi.Services;
using System.Reflection;

namespace ApartmentApiTests.Services
{
    [TestFixture]
    internal class ApartmentServiceTests : ServiceTestTemplate<ApartmentService>
    {
        protected override ApartmentService CreateService()
        {
            return new ApartmentService(
                mockDbContextFactory.Object);
        }
        [Test]
        public async Task GetApartmentsAsync_ValidData_ValidResultWithApartmentsSortedByAsc()
        {
            // Arrange
            var service = CreateService();
            string sorting = "asc";
            int rooms = -1;
            CancellationToken cancellationToken = default;
            // Act
            var result = await service.GetApartmentsAsync(sorting, rooms, cancellationToken);
            // Assert
            Assert.IsNotNull(result);
            var apartmentsList = result.ToList();
            Assert.That(apartmentsList.Count, Is.EqualTo(2));
            Assert.That(apartmentsList[0].Id, Is.EqualTo("1"));
            Assert.That(apartmentsList[1].Id, Is.EqualTo("2"));
        }
        [Test]
        public async Task GetApartmentsAsync_ValidData_ValidResultWithApartmentsSortedByDesc()
        {
            // Arrange
            var service = CreateService();
            string sorting = "desc";
            int rooms = -1;
            CancellationToken cancellationToken = default;
            // Act
            var result = await service.GetApartmentsAsync(sorting, rooms, cancellationToken);
            // Assert
            Assert.IsNotNull(result);
            var apartmentsList = result.ToList();
            Assert.That(apartmentsList.Count, Is.EqualTo(2));
            Assert.That(apartmentsList[0].Id, Is.EqualTo("2"));
            Assert.That(apartmentsList[1].Id, Is.EqualTo("1"));
        }
        [Test]
        public async Task GetApartmentsAsync_FilterByRooms_ValidResultApartmentsWithOneRoom()
        {
            // Arrange
            var service = CreateService();
            string sorting = "asc";
            int rooms = 1;
            CancellationToken cancellationToken = default;
            // Act
            var result = await service.GetApartmentsAsync(sorting, rooms, cancellationToken);
            // Assert
            Assert.IsNotNull(result);
            var apartmentsList = result.ToList();
            Assert.That(apartmentsList.Count, Is.EqualTo(1));
            Assert.That(apartmentsList[0].Id, Is.EqualTo("1"));
        }
        [Test]
        public void GetApartmentsAsync_InvalidRoomAmount_ThrowsException()
        {
            // Arrange
            var service = CreateService();
            string sorting = "asc";
            int rooms = -2;
            CancellationToken cancellationToken = default;
            // Act & Assert
            Assert.ThrowsAsync<InvalidDataException>(async () =>
                await service.GetApartmentsAsync(sorting, rooms, cancellationToken));
        }
        [Test]
        public void GetApartmentsAsync_InvalidSorting_ThrowsException()
        {
            // Arrange
            var service = CreateService();
            string sorting = "invalid";
            int rooms = -1;
            CancellationToken cancellationToken = default;
            // Act & Assert
            Assert.ThrowsAsync<InvalidDataException>(async () =>
                await service.GetApartmentsAsync(sorting, rooms, cancellationToken));
        }
        [Test]
        public async Task GetApartmentByIdAsync_ValidId_ReturnsMatchingApartment()
        {
            // Arrange
            var service = CreateService();
            string id = "1";
            CancellationToken cancellationToken = default;
            // Act
            var result = await service.GetApartmentByIdAsync(id, cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(id));
        }
        [Test]
        public void GetApartmentByIdAsync_InvalidId_ThrowsInvalidOperationException()
        {
            // Arrange
            var service = CreateService();
            string id = "invalid_id";
            CancellationToken cancellationToken = default;
            // Act & Assert
            Assert.ThrowsAsync<TargetInvocationException>(async () =>
               await service.GetApartmentByIdAsync(id, cancellationToken));
        }
        [Test]
        public async Task CreateApartmentAsync_ValidApartment_ReturnsCreatedApartment()
        {
            // Arrange
            var service = CreateService();
            var newApartment = new Apartment { Id = "3", Name = "New Apartment", Price = 2000, Rooms = 2 };
            CancellationToken cancellationToken = default;
            // Act
            var result = await service.CreateApartmentAsync(newApartment, cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(newApartment.Id));
            Assert.That(testApartments.Count(), Is.EqualTo(3));
        }
        [Test]
        public async Task UpdateApartmentByIdAsync_ValidIdAndApartment_UpdatesExistingApartment()
        {
            // Arrange
            var service = CreateService();
            string id = "1";
            var updatedApartment = new Apartment { Id = id, Name = "Updated Apartment", Price = 2500, Rooms = 3 };
            CancellationToken cancellationToken = default;
            // Act
            await service.UpdateApartmentByIdAsync(id, updatedApartment, cancellationToken);
            var result = await service.GetApartmentByIdAsync(id, cancellationToken);
            // Assert
            Assert.That(result, Is.Not.Null);
            Assert.That(result.Id, Is.EqualTo(updatedApartment.Id));
            Assert.That(result.Name, Is.EqualTo(updatedApartment.Name));
            Assert.That(result.Price, Is.EqualTo(updatedApartment.Price));
            Assert.That(result.Rooms, Is.EqualTo(updatedApartment.Rooms));
        }
        [Test]
        public async Task DeleteApartmentById_ValidId_DeletesExistingApartment()
        {
            // Arrange
            var service = CreateService();
            string id = "1";
            CancellationToken cancellationToken = default;
            // Act
            await service.DeleteApartmentById(id, cancellationToken);
            // Assert
            Assert.That(testApartments.Count(), Is.EqualTo(1));
            Assert.That(testApartments.FirstOrDefault(x=>x.Id == id), Is.Null);
        }
    }
}