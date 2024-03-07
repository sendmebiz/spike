using Newtonsoft.Json;

namespace SendmeDemo;

public interface ISettings
{
    string Etherscan { get; set; }
    string Token { get; set; }
}

public class Settings : ISettings
{
    public string Etherscan { get; set; }
    [JsonIgnore]
    public string Token { get; set; }
}