using ApartmentApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApartmentApi.Endpoints.Apartments.GetApartments
{
    [Route("api/apartments")]
    [ApiController]
    public class GetApartmentsController(IApartmentService apartmentService, IMapper mapper) : ApartmentEndpointTemplate(apartmentService, mapper)
    {
        [SwaggerOperation(Tags = new[] { "Apartment" })]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetApartmentResponse>>> GetApartments(
            [FromQuery] string sorting = "asc", [FromQuery] int rooms = -1, CancellationToken cancellationToken = default)
        {
            var apartments = await apartmentService.GetApartmentsAsync(sorting, rooms, cancellationToken);
            return Ok(apartments.Select(mapper.Map<GetApartmentResponse>));
        }
    }
}
