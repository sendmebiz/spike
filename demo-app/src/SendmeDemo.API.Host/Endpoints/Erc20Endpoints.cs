using Org.BouncyCastle.Asn1.X509;

namespace SendmeDemo.Endpoints;

public static class Erc20Endpoints
{
    public static void InitErc20Endpoints(this WebApplication? app, Configuration configs)
    {
        app.MapPost("/cbdc/setLimit/", (int limit) =>
            {
                var erc20Service = app.Services.GetService<IERC20>();
                erc20Service.SetLimitAsync(configs.Issuer, limit);
            })
            .WithName("SetLimit")
            .WithTags("CBDC")
            .WithOpenApi();

        app.MapPost("/cbdc/setPeriod/", (int time, Periods period) =>
            {
                int per = time == 0 ? 300 : time;

                switch (period)
                {
                    case Periods.Minutes:
                        per = time * 60;
                        break;
                    case Periods.Hours:
                        per = time * 60 * 60;
                        break;
                }

                var erc20Service = app.Services.GetService<IERC20>();
                var result = erc20Service.SetPeriodAsync(configs.Issuer, per);
                Console.WriteLine(result);
            }).WithName("SetPeriod")
            .WithTags("CBDC")
            .WithOpenApi();

        app.MapPost("/cbdc/mint", async (int value) =>
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

        app.MapPost("/cbdc/burn", async (int value) =>
            {
                var erc20Service = app.Services.GetService<IERC20>();
                var result = await erc20Service.BurnAsync(
                    configs.Issuer, value);
                Console.WriteLine(result);

                return result;
            }).WithName("Burn")
            .WithTags("CBDC")
            .WithOpenApi();


        app.MapPost("/cbdc/transfer", async (string from, string to, int value) =>
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

        app.MapGet("/cbdc/totalSupply", async () =>
        {
            var erc20Service = app.Services.GetService<IERC20>();
            int totalSupply = await erc20Service.GetTotalSupplyAsync();
            
            return totalSupply;
        }).WithName("GetTotalSupply")
        .WithTags("CBDC")
        .WithOpenApi();

        app.MapGet("/cbdc/balance/{address}", async (string address) =>
            {
                string wallet = address switch
                {
                    Participants.ALICE => configs.Alice.PublicKey,
                    Participants.BOB => configs.Bob.PublicKey,
                    Participants.ISSUER => configs.Issuer.PublicKey,
                    _ => address
                };
                
                var erc20Service = app.Services.GetService<IERC20>();
                int totalSupply = await erc20Service.GetBalanceAsync(wallet);
            
                return totalSupply;
            }).WithName("GetBalance")
            .WithTags("CBDC")
            .WithOpenApi();
    }
}

