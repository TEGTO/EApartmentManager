using ApartmentApi.Endpoints.Apartments.UpdateApartment;
using ApartmentApi.Validators;
using FluentValidation.TestHelper;

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
        public void Validate_RoomsIsZero_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Rooms = 0 };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Rooms);
        }
        [Test]
        public void Validate_NameIsNull_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Name = null };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_NameIsEmpty_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Name = "" };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_NameExceedsMaximumLength_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Name = new string('A', 100) };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Name);
        }
        [Test]
        public void Validate_PriceIsZero_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Price = 0 };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Price);
        }
        [Test]
        public void Validate_DescriptionExceedsMaximumLength_ShouldHaveValidationError()
        {
            // Arrange
            var request = new UpdateApartmentRequest { Description = new string('A', 1000) };
            // Act
            var result = validator.TestValidate(request);
            // Assert
            result.ShouldHaveValidationErrorFor(x => x.Description);
        }
        [Test]
        public void Validate_RoomsAtMaximumValue_ShouldNotHaveValidationError()
        {
            var request = new UpdateApartmentRequest { Rooms = int.MaxValue };
            var result = validator.TestValidate(request);
            result.ShouldNotHaveValidationErrorFor(x => x.Rooms);
        }
        [Test]
        public void Validate_PriceAtMaximumValue_ShouldNotHaveValidationError()
        {
            var request = new UpdateApartmentRequest { Price = decimal.MaxValue };
            var result = validator.TestValidate(request);
            result.ShouldNotHaveValidationErrorFor(x => x.Price);
        }
        [Test]
        public void Validate_RequestIsValid_ShouldNotHaveValidationErrors()
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