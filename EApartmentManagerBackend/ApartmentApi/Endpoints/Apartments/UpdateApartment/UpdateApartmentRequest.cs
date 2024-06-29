namespace ApartmentApi.Endpoints.Apartments.UpdateApartment
{
    public class UpdateApartmentRequest
    {
        public int Rooms { get; set; }
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
    }
}