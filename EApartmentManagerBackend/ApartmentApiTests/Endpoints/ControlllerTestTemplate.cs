using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Endpoints.Apartments.GetApartments;
using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Models;
using ApartmentApi.Services;
using ApartmentApi.Validators;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace ApartmentApiTests.Controllers
{
    internal abstract class ControlllerTestTemplate<T> where T : ControllerBase
    {
        protected MockRepository mockRepository;
        protected Mock<IMapper> mockMapper;
        protected Mock<IApartmentService> mockService;

        [SetUp]
        public virtual void SetUp()
        {
            mockRepository = new MockRepository(MockBehavior.Default);
            mockMapper = CreateMockMapper();
            mockService = CreateMockService();
        }
        private Mock<IApartmentService> CreateMockService()
        {
            var mockService = mockRepository.Create<IApartmentService>();
            mockService.Setup(x => x.GetApartmentsAsync(It.IsAny<string>(), It.IsAny<int>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(() => new List<Apartment>());
            mockService.Setup(x => x.GetApartmentByIdAsync(It.IsAny<string>(), It.IsAny<CancellationToken>()))
                .ReturnsAsync(() => new Apartment());
            mockService.Setup(x => x.UpdateApartmentByIdAsync(It.IsAny<string>(), It.IsAny<Apartment>(), It.IsAny<CancellationToken>()));
            mockService.Setup(x => x.DeleteApartmentById(It.IsAny<string>(), It.IsAny<CancellationToken>()));
            mockService.Setup(x => x.CreateApartmentAsync(It.IsAny<Apartment>(), It.IsAny<CancellationToken>()));
            return mockService;
        }
        private Mock<IMapper> CreateMockMapper()
        {
            mockMapper = mockRepository.Create<IMapper>();
            mockMapper.Setup(x =>
            x.Map<GetApartmentResponse>(It.IsAny<Apartment>()))
            .Returns<Apartment>((x) =>
            {
                return new GetApartmentResponse();
            });
            mockMapper.Setup(x =>
            x.Map<Apartment>(It.IsAny<UpdateApartmentRequest>()))
            .Returns<UpdateApartmentRequest>((x) =>
            {
                return new Apartment();
            });
            mockMapper.Setup(x =>
            x.Map<Apartment>(It.IsAny<CreateApartmentRequest>()))
            .Returns<CreateApartmentRequest>((x) =>
            {
                return new Apartment();
            });
            mockMapper.Setup(x =>
            x.Map<CreateApartmentResponse>(It.IsAny<Apartment>()))
            .Returns<Apartment>((x) =>
            {
                return new CreateApartmentResponse();
            });
            return mockMapper;
        }
        protected abstract T CreateController();
    }
}