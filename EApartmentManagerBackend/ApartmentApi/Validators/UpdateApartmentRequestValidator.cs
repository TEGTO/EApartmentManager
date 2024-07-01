using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using FluentValidation;

namespace ApartmentApi.Validators
{
    public class UpdateApartmentRequestValidator : AbstractValidator<UpdateApartmentRequest>
    {
        public UpdateApartmentRequestValidator()
        {
            RuleFor(x => x.Rooms).GreaterThan(0);
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(99);
            RuleFor(x => x.Price).GreaterThan(0);
            RuleFor(x => x.Description).MaximumLength(999);
            RuleFor(x => x.Price).LessThanOrEqualTo(decimal.MaxValue);
            RuleFor(x => x.Rooms).LessThanOrEqualTo(int.MaxValue);
        }
    }
}
