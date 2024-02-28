namespace SendmeDemo;

public class Configuration
{
    public ContractSettings ERC20 { get; set; } = new();
    public ContractSettings ERC721 { get; set; } = new();
    public Wallet Issuer { get; set; } = new();
    public Wallet Alice { get; set; } = new();
    public Wallet Bob { get; set; } = new();
}