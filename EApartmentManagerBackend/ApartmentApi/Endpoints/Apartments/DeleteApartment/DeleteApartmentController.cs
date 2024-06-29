using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Models;
using ApartmentApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace ApartmentApi.Endpoints.Apartments.DeleteApartments
{
    [Route("api/apartments")]
    [ApiController]
    public class DeleteApartmentController(IApartmentService apartmentService, IMapper mapper) : ApartmentEndpointTemplate(apartmentService, mapper)
    {
        [SwaggerOperation(Tags = new[] { "Apartment" })]
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteApartmentById(string id, CancellationToken cancellationToken)
        {
            await apartmentService.DeleteApartmentById(id, cancellationToken);
            return Ok();
        }
    }
}