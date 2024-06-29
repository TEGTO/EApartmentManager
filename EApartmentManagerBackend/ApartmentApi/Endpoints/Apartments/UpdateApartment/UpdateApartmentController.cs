using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Models;
using ApartmentApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApartmentApi.Endpoints.Apartments.UpdateApartment
{
    [Route("api/apartments")]
    [ApiController]
    public class UpdateApartmentController(IApartmentService apartmentService, IMapper mapper) : ApartmentEndpointTemplate(apartmentService, mapper)
    {
        [SwaggerOperation(Tags = new[] { "Apartment" })]
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateApartment(string id, [FromBody] UpdateApartmentRequest request, CancellationToken cancellationToken)
        {
            var apartment = mapper.Map<Apartment>(request);
            await apartmentService.UpdateApartmentByIdAsync(id, apartment, cancellationToken);
            return Ok();
        }
    }
}
