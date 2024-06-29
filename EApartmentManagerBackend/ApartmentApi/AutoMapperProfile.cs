using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Endpoints.Apartments.GetApartments;
using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Models;
using AutoMapper;

namespace ApartmentApi
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Apartment, GetApartmentResponse>();
            CreateMap<CreateApartmentRequest, Apartment>();
            CreateMap<Apartment, CreateApartmentResponse>();
            CreateMap<UpdateApartmentRequest, Apartment>();
        }
    }
}