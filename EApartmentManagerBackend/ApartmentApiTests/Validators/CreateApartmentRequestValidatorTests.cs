using ApartmentApi.Endpoints.Apartments.CreateApartment;
using ApartmentApi.Validators;
using FluentValidation.TestHelper;

namespace ApartmentApiTests.Validators
{
    internal class CreateApartmentRequestValidatorTests
    {
        private CreateApartmentRequestValidator validator;

        [SetUp]
        public void Setup()
        {
            validator = new CreateApartmentRequestValidator();
        }
        [Test]
        public void Validate_RoomsIsZero_ShouldHaveValidationError()
        {
            // Arrange
            var request = new CreateApartmentRequest { Rooms = 0 };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Rooms);
        }
        [Test]
        public void Validate_NameIsNull_ShouldHaveValidationError()
        {
            // Arrange
            var request = new CreateApartmentRequest { Name = null };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_NameIsEmpty_ShouldHaveValidationError()
        {
            // Arrange
            var request = new CreateApartmentRequest { Name = "" };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_NameExceedsMaximumLength_ShouldHaveValidationError()
        {
            // Arrange
            var request = new CreateApartmentRequest { Name = new string('A', 100) };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_PriceIsZero_ShouldHaveValidationError()
        {
            // Arrange
            var request = new CreateApartmentRequest { Price = 0 };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Price);
        }
        [Test]
        public void Validate_DescriptionExceedsMaximumLength_ShouldHaveValidationError()
        {
            // Arrange
            var request = new CreateApartmentRequest { Description = new string('A', 1000) };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Description);
        }
        [Test]
        public void Validate_RequestIsValid_ShouldNotHaveValidationErrors()
        {
            // Arrange
            var request = new CreateApartmentRequest
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