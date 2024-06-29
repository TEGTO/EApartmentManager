using ApartmentApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ApartmentApi.Data
{
    public class AparmentDbContext(DbContextOptions<AparmentDbContext> options) : DbContext(options)
    {
        public virtual DbSet<Apartment> Apartments { get; set; }
    }
}
