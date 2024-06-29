using ApartmentApi;
using FluentValidation.Results;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Moq;
using System.ComponentModel.DataAnnotations;

namespace ApartmentApiTests
{
    [TestFixture]
    public class ApiBehaviorOptionsExtensionsTests
    {
        [Test]
        public void ConfigureCustomInvalidModelStateResponseContollers_ShouldThrowValidationException_ForInvalidModelState()
        {
            //// Arrange
            //var services = new ServiceCollection();
            //services.ConfigureCustomInvalidModelStateResponseContollers();
            //var serviceProvider = services.BuildServiceProvider();
            //var options = serviceProvider.GetRequiredService<IOptions<ApiBehaviorOptions>>().Value;
            //var modelState = new ModelStateDictionary();
            //modelState.AddModelError("Property1", "Error message 1");
            //modelState.AddModelError("Property2", "Error message 2");
            //var context = new ActionContext { ModelState = modelState };
            //// Act & Assert
            //var exception = Assert.Throws<ValidationException>(() => options.InvalidModelStateResponseFactory(context));
            //var expectedErrors = new List<ValidationFailure>
            //{
            //    new ValidationFailure("Property1", "Error message 1"),
            //    new ValidationFailure("Property2", "Error message 2")
            //};
            //Assert.AreEqual(expectedErrors.Count, exception.Message.Count());
            //foreach (var expectedError in expectedErrors)
            //{
            //    Assert.IsTrue(exception.Errors.Any(e => e.PropertyName == expectedError.PropertyName && e.ErrorMessage == expectedError.ErrorMessage));
            //}
            Assert.Fail();
        }
    }
}