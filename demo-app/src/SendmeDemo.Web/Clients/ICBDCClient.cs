using SendmeDemo.Web.Model;

namespace SendmeDemo.Web.Clients;
using Refit;

public interface ICBDCClient
{
    [Get("/cbdc/totalSupply")]
    Task<int> GetTotalSupplyAsync();
    [Get("/cbdc/balance/{address}")]
    Task<int> GetBalanceAsync(string address);
    [Post("/cbdc/transfer")]
    Task<string> TransferAsync(string from, string to, int value);
    [Post("/cbdc/setPeriod/")]
    Task SetPeriodAsync(int number, Periods period);
    [Post("/cbdc/setLimit/")]
    Task SetLimitAsync(int limit);
    [Post("/cbdc/mint")]
    Task<string> MintAsync(string to, int value);
    [Post("/cbdc/burn")]
    Task<string> BurnAsync(int value);
    
}