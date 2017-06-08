using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AccessiblityWebComponent.Startup))]
namespace AccessiblityWebComponent
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
