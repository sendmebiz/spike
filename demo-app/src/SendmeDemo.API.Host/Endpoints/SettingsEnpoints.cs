namespace SendmeDemo.Endpoints;

public static class SettingsEnpoints
{
    public static void InitSettingsEndpoints(this WebApplication? app, Configuration configs)
    {
        app.MapGet("/settings", async () => configs.Settings).WithName("GetSettings")
            .WithTags("Settings")
            .WithOpenApi();
    }
}