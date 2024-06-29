using ApartmentApi.Models;
using ApartmentApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApartmentApi.Endpoints.Apartments.CreateApartment
{
    [Route("api/apartments")]
    [ApiController]
    public class CreateApartmentController(IApartmentService apartmentService, IMapper mapper) : ApartmentEndpointTemplate(apartmentService, mapper)
    {
        [SwaggerOperation(Tags = new[] { "Apartment" })]
        [HttpPost]
        public async Task<ActionResult<CreateApartmentResponse>> CreateApartment([FromBody] CreateApartmentRequest request, CancellationToken cancellationToken)
        {
            var apartment = mapper.Map<Apartment>(request);
            var createdApartment = await apartmentService.CreateApartmentAsync(apartment, cancellationToken);
            var response = mapper.Map<CreateApartmentResponse>(createdApartment);
            return Ok(response);
        }
    }
}
