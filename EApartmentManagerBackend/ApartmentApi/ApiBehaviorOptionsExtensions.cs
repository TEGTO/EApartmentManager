using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ApartmentApi
{
    public static class ApiBehaviorOptionsExtensions
    {
        public static IServiceCollection ConfigureCustomInvalidModelStateResponseControllers(this IServiceCollection services)
        {
            services.AddControllers().ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState
                        .Where(x => x.Value.ValidationState == ModelValidationState.Invalid)
                        .SelectMany(x => x.Value.Errors.Select(e => new ValidationFailure(x.Key, e.ErrorMessage)))
                        .ToList();
                    throw new ValidationException(errors);
                };
            });
            return services;
        }
    }
}