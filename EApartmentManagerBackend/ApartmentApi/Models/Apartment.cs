using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApartmentApi.Models
{
    public class Apartment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; } = null!;
        public int Rooms { get; set; }
        [MaxLength(99)]
        public string Name { get; set; } = null!;
        public decimal Price { get; set; }
        [MaxLength(999)]
        public string? Description { get; set; }

        public void Copy(Apartment other)
        {
            this.Rooms = other.Rooms;
            this.Name = other.Name;
            this.Price = other.Price;
            this.Description = other.Description;
        }
    }
}