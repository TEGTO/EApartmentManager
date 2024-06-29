using ApartmentApi.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace ApartmentApi.Endpoints.Apartments
{
    public abstract class ApartmentEndpointTemplate : ControllerBase
    {
        protected readonly IApartmentService apartmentService;
        protected readonly IMapper mapper;

        public ApartmentEndpointTemplate(IApartmentService apartmentService, IMapper mapper)
        {
            this.apartmentService = apartmentService;
            this.mapper = mapper;
        }
    }
}