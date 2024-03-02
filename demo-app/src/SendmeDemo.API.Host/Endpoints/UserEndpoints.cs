using SendmeDemo.Core;

namespace SendmeDemo.Endpoints;

public static class UserEndpoints
{
    public static void InitUserEndpoints(this WebApplication? app, Configuration configs)
    {
        app.MapGet("/users/", async () =>
            {
                var userService = app.Services.GetService<IUserService>();
                var users = await userService.GetUserListAsync(configs);
            
                return users;
            }).WithName("GetUserList")
            .WithTags("Users")
            .WithOpenApi();
        
        app.MapGet("/users/{name}", async (string name) =>
            {
                var userService = app.Services.GetService<IUserService>();
                var usersDetails = await userService.GetUserDetailsAsync(configs, name);
            
                return usersDetails;
            }).WithName("GetUserDetails")
            .WithTags("Users")
            .WithOpenApi();
        
        app.MapGet("/users/issuer", async () =>
            {
                var userService = app.Services.GetService<IUserService>();
                var usersDetails = userService.GetUserDetailsAsync(configs, Participants.ISSUER);
                var erc20Service = app.Services.GetService<IERC20>();
                var totalSupply = erc20Service.GetTotalSupplyAsync();

                await Task.WhenAll(usersDetails, totalSupply);
            
                return new IssuerModel(usersDetails.Result, totalSupply.Result);
            }).WithName("GetIssuerDetails")
            .WithTags("Users")
            .WithOpenApi();
    }
}