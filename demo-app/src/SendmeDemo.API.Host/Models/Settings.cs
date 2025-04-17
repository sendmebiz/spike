using Newtonsoft.Json;

namespace SendmeDemo;

public class Settings
{
    public string Etherscan { get; set; }
    public string EtherscanApi { get; set; }
    [JsonIgnore]
    public string Token { get; set; }
}