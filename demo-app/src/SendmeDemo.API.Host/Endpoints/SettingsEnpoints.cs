using SendmeDemo.Configuration;

namespace SendmeDemo.Endpoints;

public static class SettingsEnpoints
{
    public static void InitSettingsEndpoints(this WebApplication? app, Configs configs)
    {
        app.MapGet("/api/settings", async () => configs.Settings).WithName("GetSettings")
            .WithTags("Settings")
            .WithOpenApi();
    }
}