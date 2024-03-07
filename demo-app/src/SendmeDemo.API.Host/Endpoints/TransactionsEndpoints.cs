using SendmeDemo.Configuration;
using SendmeDemo.Core;

namespace SendmeDemo.Endpoints;

public static class TransactionsEndpoints
{
    public static void InitTransactionsEndpoints(this WebApplication? app, Configs configs)
    {
        app.MapGet("/api/users/{name}/transactions/", async (string name) =>
            {
                string wallet = name switch
                {
                    Participants.ALICE => configs.Alice.PublicKey,
                    Participants.BOB => configs.Bob.PublicKey,
                    Participants.ISSUER => configs.Issuer.PublicKey,
                    _ => name
                };

                var transactionHistoryService = app.Services.GetService<ITransactionHistoryService>();

                var transactions = await transactionHistoryService.GetTransactionsAsync(configs.ERC20.Address, wallet);

                var result = transactions.Select(t => new Transaction
                {
                    Id = t.Id,
                    TimeStamp = t.TimeStamp,
                    Value = t.Value,
                    From = MapWallet(configs, t.From),
                    To = MapWallet(configs, t.To)
                }).ToList();

                return result;
            }).WithName("GetUserTransactions")
            .WithTags("Users")
            .WithOpenApi();
        ;
    }

    private static string MapWallet(Configs configs, string wallet)
    {
        if (string.Equals(wallet, configs.Alice.PublicKey, StringComparison.OrdinalIgnoreCase))
        {
            return "Alice";
        }
        if (string.Equals(wallet, configs.Bob.PublicKey, StringComparison.OrdinalIgnoreCase))
        {
            return "Bob";
        }
        if (string.Equals(wallet, configs.Issuer.PublicKey, StringComparison.OrdinalIgnoreCase))
        {
            return "Issuer";
        }

        return wallet;
    }
}