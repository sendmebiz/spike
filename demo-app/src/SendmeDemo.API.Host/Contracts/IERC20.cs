using SendmeDemo;

public interface IERC20
{
    Task<decimal> GetTotalSupplyAsync();
    Task<string> TransferAsync(Wallet from, string to, decimal value);
    Task<string> SetPeriodAsync(Wallet wallet, int period);
    Task<string> SetLimitAsync(Wallet wallet, int limit);
    Task<string> MintAsync(Wallet issuer, string to, decimal value);
    Task<string> BurnAsync(Wallet issuer, decimal value);
    Task<decimal> GetBalanceAsync(string address);
}