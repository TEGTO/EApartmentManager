using ApartmentApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApartmentApi.Endpoints.Apartments.GetApartments
{
    [Route("api/apartments")]
    [ApiController]
    public class GetApartmentByIdController(IApartmentService apartmentService, IMapper mapper) : ApartmentEndpointTemplate(apartmentService, mapper)
    {
        [SwaggerOperation(Tags = new[] { "Apartment" })]
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<GetApartmentResponse>> GetApartmentById(string id, CancellationToken cancellationToken)
        {
            var apartment = await apartmentService.GetApartmentByIdAsync(id, cancellationToken);
            var response = mapper.Map<GetApartmentResponse>(apartment);
            return Ok(response);
        }
    }
}
