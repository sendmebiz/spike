using SendmeDemo.Core;

namespace SendmeDemo.Endpoints;

public static class UserEndpoints
{
    public static void InitUserEndpoints(this WebApplication? app, Configuration configs)
    {
        app.MapGet("/users/", async () =>
            {
                var userService = app.Services.GetService<IUserService>();
                var users = await userService.GetUserList(configs);
            
                return users;
            }).WithName("GetUserList")
            .WithTags("Users")
            .WithOpenApi();
    }
}