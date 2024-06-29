using ApartmentApi;
using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Endpoints.Apartments.GetApartments;
using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Models;
using AutoMapper;

namespace ApartmentApiTests
{
    [TestFixture]
    internal class AutoMapperProfileTests
    {
        private IMapper mapper;

        [SetUp]
        public void Setup()
        {
            var configuration = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<AutoMapperProfile>();
            });
            mapper = configuration.CreateMapper();
        }

        [Test]
        public void ApartmentToGetApartmentsResponse_ValidData_ValidResult()
        {
            // Arrange
            var apartment = new Apartment { Id = "1", Description = "Desc", Name = "Name", Price = 1, Rooms = 1 };
            // Act
            var getApartmentsResponse = mapper.Map<GetApartmentResponse>(apartment);
            // Assert
            Assert.That(getApartmentsResponse.Id, Is.EqualTo(apartment.Id));
            Assert.That(getApartmentsResponse.Description, Is.EqualTo(apartment.Description));
            Assert.That(getApartmentsResponse.Name, Is.EqualTo(apartment.Name));
            Assert.That(getApartmentsResponse.Price, Is.EqualTo(apartment.Price));
            Assert.That(getApartmentsResponse.Rooms, Is.EqualTo(apartment.Rooms));
        }
        [Test]
        public void ApartmentToGetApartmentsResponse_NullData_NullResult()
        {
            // Arrange
            Apartment apartment = null;
            // Act
            var getApartmentsResponse = mapper.Map<GetApartmentResponse>(apartment);
            // Assert
            Assert.That(getApartmentsResponse, Is.Null);
        }
        [Test]
        public void CreateApartmentRequestToApartment_ValidData_ValidResult()
        {
            // Arrange
            var createApartmentRequest = new CreateApartmentRequest { Description = "Desc", Name = "Name", Price = 1, Rooms = 1 };
            // Act
            var apartment = mapper.Map<Apartment>(createApartmentRequest);
            // Assert
            Assert.That(apartment.Id, Is.EqualTo(null));
            Assert.That(apartment.Description, Is.EqualTo(createApartmentRequest.Description));
            Assert.That(apartment.Name, Is.EqualTo(createApartmentRequest.Name));
            Assert.That(apartment.Price, Is.EqualTo(createApartmentRequest.Price));
            Assert.That(apartment.Rooms, Is.EqualTo(createApartmentRequest.Rooms));
        }
        [Test]
        public void CreateApartmentRequestToApartment_NullData_NullResult()
        {
            // Arrange
            CreateApartmentRequest createApartmentRequest = null;
            // Act
            var apartment = mapper.Map<Apartment>(createApartmentRequest);
            // Assert
            Assert.That(apartment, Is.Null);
        }
        [Test]
        public void ApartmentToCreateApartmentResponse_ValidData_ValidResult()
        {
            // Arrange
            var apartment = new Apartment { Id = "1", Description = "Desc", Name = "Name", Price = 1, Rooms = 1 };
            // Act
            var createApartmentResponse = mapper.Map<CreateApartmentResponse>(apartment);
            // Assert
            Assert.That(createApartmentResponse.Id, Is.EqualTo(apartment.Id));
            Assert.That(createApartmentResponse.Description, Is.EqualTo(apartment.Description));
            Assert.That(createApartmentResponse.Name, Is.EqualTo(apartment.Name));
            Assert.That(createApartmentResponse.Price, Is.EqualTo(apartment.Price));
            Assert.That(createApartmentResponse.Rooms, Is.EqualTo(apartment.Rooms));
        }
        [Test]
        public void ApartmentToCreateApartmentResponse_NullData_NullResult()
        {
            // Arrange
            Apartment apartment = null;
            // Act
            var createApartmentResponse = mapper.Map<CreateApartmentResponse>(apartment);
            // Assert
            Assert.That(createApartmentResponse, Is.Null);
        }
        [Test]
        public void UpdateApartmentRequestToApartment_ValidData_ValidResult()
        {
            // Arrange
            var updateApartmentRequest = new UpdateApartmentRequest { Description = "Desc", Name = "Name", Price = 1, Rooms = 1 };
            // Act
            var apartment = mapper.Map<Apartment>(updateApartmentRequest);
            // Assert
            Assert.That(apartment.Id, Is.EqualTo(null));
            Assert.That(apartment.Description, Is.EqualTo(updateApartmentRequest.Description));
            Assert.That(apartment.Name, Is.EqualTo(updateApartmentRequest.Name));
            Assert.That(apartment.Price, Is.EqualTo(updateApartmentRequest.Price));
            Assert.That(apartment.Rooms, Is.EqualTo(updateApartmentRequest.Rooms));
        }
        [Test]
        public void pdateApartmentRequestToApartment_NullData_NullResult()
        {
            // Arrange
            UpdateApartmentRequest updateApartmentRequest = null;
            // Act
            var apartment = mapper.Map<Apartment>(updateApartmentRequest);
            // Assert
            Assert.That(apartment, Is.Null);
        }
    }
}