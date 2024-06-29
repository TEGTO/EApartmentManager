using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Validators;
using FluentValidation.TestHelper;
using Moq;
using NUnit.Framework;

namespace ApartmentApiTests.Validators
{
    [TestFixture]
    internal class UpdateApartmentRequestValidatorTests
    {
        private UpdateApartmentRequestValidator validator;

        [SetUp]
        public void Setup()
        {
            validator = new UpdateApartmentRequestValidator();
        }
        [Test]
        public void Validate_WhenRoomsIsZero_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Rooms = 0 };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Rooms);
        }
        [Test]
        public void Validate_WhenNameIsNull_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Name = null };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_WhenNameIsEmpty_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Name = "" };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_WhenNameExceedsMaximumLength_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Name = new string('A', 100) };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_WhenPriceIsZero_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Price = 0 };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Price);
        }
        [Test]
        public void Validate_WhenDescriptionExceedsMaximumLength_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Description = new string('A', 1000) };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Description);
        }
        [Test]
        public void Validate_WhenRequestIsValid_ShouldNotHaveValidationErrors()
        {
            // Arrange
            var request = new UpdateApartmentRequest
            {
                Rooms = 2,
                Name = "Apartment A",
                Price = 1500,
                Description = "A cozy apartment near downtown."
            };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldNotHaveAnyValidationErrors();
        }
    }
}