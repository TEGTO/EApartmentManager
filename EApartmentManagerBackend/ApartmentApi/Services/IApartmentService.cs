using ApartmentApi.Models;

namespace ApartmentApi.Services
{
    public interface IApartmentService
    {
        public Task<IEnumerable<Apartment>> GetApartmentsAsync(string sorting, int rooms, CancellationToken cancellationToken);
        public Task<Apartment> GetApartmentByIdAsync(string id, CancellationToken cancellationToken);
        public Task<Apartment> CreateApartmentAsync(Apartment apartment, CancellationToken cancellationToken);
        public Task DeleteApartmentById(string id, CancellationToken cancellationToken);
        public Task UpdateApartmentByIdAsync(string id, Apartment apartment, CancellationToken cancellationToken);
    }
}