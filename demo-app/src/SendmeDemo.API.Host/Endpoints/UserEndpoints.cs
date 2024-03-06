using SendmeDemo.Configuration;
using SendmeDemo.Core;

namespace SendmeDemo.Endpoints;

public static class UserEndpoints
{
    public static void InitUserEndpoints(this WebApplication? app, Configs configs)
    {
        app.MapGet("/api/users/", async () =>
            {
                var userService = app.Services.GetService<IUserService>();
                var users = await userService.GetUserListAsync(configs);
            
                return users;
            }).WithName("GetUserList")
            .WithTags("Users")
            .WithOpenApi();
        
        app.MapGet("/api/users/{name}", async (string name) =>
            {
                var userService = app.Services.GetService<IUserService>();
                var usersDetails = await userService.GetUserDetailsAsync(configs, name);
            
                return usersDetails;
            }).WithName("GetUserDetails")
            .WithTags("Users")
            .WithOpenApi();
    }
}