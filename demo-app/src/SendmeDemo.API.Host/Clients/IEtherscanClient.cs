using Refit;

namespace SendmeDemo.Clients;

public interface IEtherscanClient
{
    [Get("/api?module=account&action=tokentx&contractaddress={contractAddress}&address={address}&page=1&offset=20&startblock=0&endblock=99999999&sort=desc&apikey={accessToken}")]
    public Task<EtherscanResponse> GetTransactionsAsync(string contractAddress, string address, string accessToken);
    
    [Get("/api?module=account&action=tokentx&contractaddress={contractAddress}&page=1&offset=20&startblock=0&endblock=99999999&sort=desc&apikey={accessToken}")]
    public Task<EtherscanResponse> GetTokenTransactionsAsync(string contractAddress, string accessToken);
}