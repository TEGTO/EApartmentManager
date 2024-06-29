using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ApartmentApi.Endpoints.Apartments.CreateApartment
{
    public class CreateApartmentRequest
    {
        public int Rooms { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
    }
}
