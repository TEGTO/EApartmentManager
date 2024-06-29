using ApartmentApi.Data;
using ApartmentApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ApartmentApi.Services
{
    public class ApartmentService : ServiceDbBase<AparmentDbContext>, IApartmentService
    {
        public ApartmentService(IDbContextFactory<AparmentDbContext> contextFactory) : base(contextFactory)
        {
        }

        public async Task<IEnumerable<Apartment>> GetApartmentsAsync(string sorting, int rooms, CancellationToken cancellationToken)
        {
            if (rooms < 0 && rooms != -1)
                throw new InvalidDataException("Invalid room amount!");
            using (var dbContext = await CreateDbContextAsync(cancellationToken))
            {
                IQueryable<Apartment> query = dbContext.Apartments.AsNoTracking();
                if (rooms != -1)
                {
                    query = query.Where(x => x.Rooms == rooms).AsNoTracking();
                }
                query = sorting switch
                {
                    "asc" => query.OrderBy(x => x.Price),
                    "desc" => query.OrderByDescending(x => x.Price),
                    _ => throw new InvalidDataException("Invalid sorting mode!"),
                };
                return await query.ToListAsync(cancellationToken);
            }
        }
        public async Task<Apartment> GetApartmentByIdAsync(string id, CancellationToken cancellationToken)
        {
            using (var dbContext = await CreateDbContextAsync(cancellationToken))
            {
                return await dbContext.Apartments.AsNoTracking().FirstAsync(x => x.Id == id, cancellationToken);
            }
        }
        public async Task<Apartment> CreateApartmentAsync(Apartment apartment, CancellationToken cancellationToken)
        {
            using (var dbContext = await CreateDbContextAsync(cancellationToken))
            {
                await dbContext.Apartments.AddAsync(apartment, cancellationToken);
                await dbContext.SaveChangesAsync(cancellationToken);
            }
            return apartment;
        }
        public async Task DeleteApartmentById(string id, CancellationToken cancellationToken)
        {
            using (var dbContext = await CreateDbContextAsync(cancellationToken))
            {
                var apartmentToDelete = await dbContext.Apartments.FirstAsync(x => x.Id == id, cancellationToken);
                dbContext.Apartments.Remove(apartmentToDelete);
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }
        public async Task UpdateApartmentByIdAsync(string id, Apartment apartment, CancellationToken cancellationToken)
        {
            using (var dbContext = await CreateDbContextAsync(cancellationToken))
            {
                var existingApartment = await dbContext.Apartments.FirstAsync(x => x.Id == id, cancellationToken);
                existingApartment.Copy(apartment);
                await dbContext.SaveChangesAsync(cancellationToken);
            }
        }
    }
}