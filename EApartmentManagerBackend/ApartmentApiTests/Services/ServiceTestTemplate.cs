using ApartmentApi.Data;
using ApartmentApi.Models;
using ApartmentApi.Services;
using Microsoft.EntityFrameworkCore;
using MockQueryable.Moq;
using Moq;

namespace ApartmentApiTests.Services
{
    [TestFixture]
    internal abstract class ServiceTestTemplate<T> where T : ServiceDbBase<AparmentDbContext>
    {
        protected List<Apartment> testApartments;

        protected MockRepository mockRepository;
        protected Mock<IDbContextFactory<AparmentDbContext>> mockDbContextFactory;
        protected Mock<AparmentDbContext> mockDbContext;

        [SetUp]
        public virtual void SetUp()
        {
            mockRepository = new MockRepository(MockBehavior.Default);
            mockDbContextFactory = mockRepository.Create<IDbContextFactory<AparmentDbContext>>();
            mockDbContext = CreateMockDbContext();
            mockDbContextFactory.Setup(m => m.CreateDbContextAsync(It.IsAny<CancellationToken>())).ReturnsAsync(mockDbContext.Object);
        }
        protected abstract T CreateService();
        private Mock<AparmentDbContext> CreateMockDbContext()
        {
            var options = new DbContextOptionsBuilder<AparmentDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            var mockDbContext = mockRepository.Create<AparmentDbContext>(options);
            mockDbContext.Setup(m => m.Apartments).Returns(GetTestApartmentsDbSet());
            mockDbContext.Setup(m => m.Apartments.AddAsync(It.IsAny<Apartment>(), It.IsAny<CancellationToken>()))
                .Callback<Apartment, CancellationToken>((apartment, cancellationToken) =>
                {
                    testApartments.Add(apartment);
                });
            mockDbContext.Setup(m => m.Apartments.Remove(It.IsAny<Apartment>()))
                .Callback<Apartment>((apartment) =>
                {
                    testApartments.Remove(apartment);
                });
            return mockDbContext;
        }
        private DbSet<Apartment> GetTestApartmentsDbSet()
        {
            var mockSet = GetTestApartments().AsQueryable().BuildMockDbSet();
            return mockSet.Object;
        }
        private List<Apartment> GetTestApartments()
        {
            return testApartments = new List<Apartment>
            {
               new Apartment { Id = "1", Description = "Desc", Name = "Name", Price = 1, Rooms = 1 },
               new Apartment { Id = "2", Description = "Desc2", Name = "Name2", Price = 2, Rooms = 2 },
            };
        }
    }
}