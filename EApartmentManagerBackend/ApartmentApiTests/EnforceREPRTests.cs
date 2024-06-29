using ApartmentApi.Endpoints.Apartments;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;

namespace ApartmentApiTests
{
    internal class OnlyOnePublicMethodInControllerRule
    {
        public string Validate(Type type)
        {
            var publicMethods = type.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly);
            if (publicMethods.Length != 1)
            {
                return $"{type.Name} has {publicMethods.Length} public methods.";
            }
            return null;
        }
    }
    internal class EnforceREPRTests
    {
        [Test]
        public void Controllers_Should_Have_Only_One_Public_Method()
        {
            var controllerTypes = typeof(ApartmentEndpointTemplate).Assembly.GetTypes()
                .Where(t => t.IsClass && !t.IsAbstract && t.IsSubclassOf(typeof(ControllerBase)));
            var rule = new OnlyOnePublicMethodInControllerRule();
            var failures = controllerTypes.Select(rule.Validate).Where(result => result != null).ToList();
            Assert.IsTrue(failures.Count == 0, string.Join(Environment.NewLine, failures));
        }
    }
}
