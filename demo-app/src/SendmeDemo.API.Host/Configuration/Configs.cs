namespace SendmeDemo.Configuration;

public class Configs
{
    public ContractSettings ERC20 { get; set; } = new();
    public ContractSettings ERC721 { get; set; } = new();
    public Wallet Issuer { get; set; } = new();
    public Wallet Alice { get; set; } = new();
    public Wallet Bob { get; set; } = new();
    public Settings Settings { get; set; } = new();
}