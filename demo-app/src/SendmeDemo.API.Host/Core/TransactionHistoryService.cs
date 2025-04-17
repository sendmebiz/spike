using SendmeDemo.Clients;

namespace SendmeDemo.Core;

public class TransactionHistoryService : ITransactionHistoryService
{
    private readonly IEtherscanClient _client;
    private readonly Settings _settings;

    public TransactionHistoryService(IEtherscanClient client, Settings settings)
    {
        _client = client;
        _settings = settings;
    }
    
    public async Task<IReadOnlyCollection<Transaction>> GetTransactionsAsync(string contractAddress, string wallet)
    {
        var response = await _client.GetTransactionsAsync(contractAddress, wallet, _settings.Token);
        
        var result = response.result.Select(t =>
            new Transaction(t.hash, t.from, t.to, t.timeStamp, decimal.Parse(t.value) / (decimal) Math.Pow(10, 18)));
        
        return result.ToList();
    }

    public async Task<IReadOnlyCollection<Transaction>> GetTokenTransactionsAsync(string contractAddress)
    {
        var response = await _client.GetTokenTransactionsAsync(contractAddress, _settings.Token);
        
        var result = response.result.Select(t =>
            new Transaction(t.hash, t.from, t.to, t.timeStamp, decimal.Parse(t.value) / (decimal) Math.Pow(10, 18)));
        
        return result.ToList();
    }
}