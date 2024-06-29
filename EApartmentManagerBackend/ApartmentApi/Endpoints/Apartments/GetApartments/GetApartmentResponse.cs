namespace ApartmentApi.Endpoints.Apartments.GetApartments
{
    public class GetApartmentResponse
    {
        public string Id { get; set; }
        public int Rooms { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string? Description { get; set; }
    }
}
