using Org.BouncyCastle.Asn1.X509;
using SendmeDemo.Configuration;

namespace SendmeDemo.Endpoints;

public static class Erc20Endpoints
{
    public static void InitErc20Endpoints(this WebApplication? app, Configs configs)
    {
        app.MapPost("/api/cbdc/setLimit/", async (int limit) =>
            {
                var erc20Service = app.Services.GetService<IERC20>();
                string tx = await erc20Service.SetLimitAsync(configs.Issuer, limit);
                return tx;
            })
            .WithName("SetLimit")
            .WithTags("CBDC")
            .WithOpenApi();

        app.MapPost("/api/cbdc/setPeriod/", async (int time) =>
            {
                time = time == 0 ? 300 : time;

                var erc20Service = app.Services.GetService<IERC20>();
                string tx = await erc20Service.SetPeriodAsync(configs.Issuer, time);
                return tx;
            }).WithName("SetPeriod")
            .WithTags("CBDC")
            .WithOpenApi();

        app.MapPost("/api/cbdc/mint", async (decimal value) =>
            {
                var erc20Service = app.Services.GetService<IERC20>();
                var result = await erc20Service.MintAsync(
                    configs.Issuer,
                    configs.Issuer.PublicKey, value);
                Console.WriteLine(result);

                return result;
            }).WithName("Mint")
            .WithTags("CBDC")
            .WithOpenApi();

        app.MapPost("/api/cbdc/burn", async (decimal value) =>
            {
                var erc20Service = app.Services.GetService<IERC20>();
                var result = await erc20Service.BurnAsync(
                    configs.Issuer, value);
                Console.WriteLine(result);

                return result;
            }).WithName("Burn")
            .WithTags("CBDC")
            .WithOpenApi();


        app.MapPost("/api/cbdc/transfer", async (string from, string to, decimal value) =>
            {
                Wallet fromWallet = from switch
                {
                    Participants.ALICE => configs.Alice,
                    Participants.BOB => configs.Bob,
                    Participants.ISSUER => configs.Issuer,
                    _ => configs.Issuer 
                }; 
                
                string toWallet = to switch
                {
                    Participants.ALICE => configs.Alice.PublicKey,
                    Participants.BOB => configs.Bob.PublicKey,
                    Participants.ISSUER => configs.Issuer.PublicKey,
                    _ => to
                };

                var erc20Service = app.Services.GetService<IERC20>();
                var result = await erc20Service.TransferAsync(
                    fromWallet,
                    toWallet, value);
                Console.WriteLine(result);

                return result;
            }).WithName("Transfer")
            .WithTags("CBDC")
            .WithOpenApi();

        app.MapGet("/api/cbdc/totalSupply", async () =>
        {
            var erc20Service = app.Services.GetService<IERC20>();
            decimal totalSupply = await erc20Service.GetTotalSupplyAsync();
            
            return totalSupply.ToString();
        }).WithName("GetTotalSupply")
        .WithTags("CBDC")
        .WithOpenApi();

        app.MapGet("/api/cbdc/balance/{address}", async (string address) =>
            {
                string wallet = address switch
                {
                    Participants.ALICE => configs.Alice.PublicKey,
                    Participants.BOB => configs.Bob.PublicKey,
                    Participants.ISSUER => configs.Issuer.PublicKey,
                    _ => address
                };
                
                var erc20Service = app.Services.GetService<IERC20>();
                decimal balance = await erc20Service.GetBalanceAsync(wallet);
            
                return balance.ToString();
            }).WithName("GetBalance")
            .WithTags("CBDC")
            .WithOpenApi();
    }
}

