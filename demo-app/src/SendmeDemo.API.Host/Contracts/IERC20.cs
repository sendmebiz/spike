using SendmeDemo;

public interface IERC20
{
    Task<int> GetTotalSupplyAsync();
    Task<string> TransferAsync(Wallet from, string to, int value);
    Task SetPeriodAsync(Wallet wallet, int period);
    Task SetLimitAsync(Wallet wallet, int limit);
    Task<string> MintAsync(Wallet issuer, string to, int value);
    Task<string> BurnAsync(Wallet issuer, int value);
    Task<int> GetBalanceAsync(string address);
}