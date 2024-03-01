namespace SendmeDemo.Contracts;

public interface IERC721
{
    Task<string> MintAsync(Wallet issuer, string to);
    Task<string> BurnAsync(Wallet issuer, int id);
}