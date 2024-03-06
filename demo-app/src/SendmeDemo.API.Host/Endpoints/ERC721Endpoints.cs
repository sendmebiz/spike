using SendmeDemo.Configuration;
using SendmeDemo.Contracts;

namespace SendmeDemo.Endpoints;

public static class ERC721Endpoints
{
    public static void InitErc721Endpoints(this WebApplication? app, Configs configs)
    {
        app.MapPost("/api/kyc/mint", async (string address) =>
            {
                string wallet = address switch
                {
                    Participants.ALICE => configs.Alice.PublicKey,
                    Participants.BOB => configs.Bob.PublicKey,
                    Participants.ISSUER => configs.Issuer.PublicKey,
                    _ => address
                };
                
                var erc721Service = app.Services.GetService<IERC721>();
                var result = await erc721Service.MintAsync(
                    configs.Issuer, wallet);
                Console.WriteLine(result);

                return result;
            }).WithName("KYCMint")
            .WithTags("KYC")
            .WithOpenApi();
        
        app.MapPost("/api/kyc/burn", async (int tokenId) =>
            {
                var erc721Service = app.Services.GetService<IERC721>();
                var result = await erc721Service.BurnAsync(
                    configs.Issuer, tokenId);
                Console.WriteLine(result);

                return result;
            }).WithName("KYCBurn")
            .WithTags("KYC")
            .WithOpenApi();
    }
}