namespace SendmeDemo.Core;

public interface ITransactionHistoryService
{
    public Task<IReadOnlyCollection<Transaction>> GetTransactionsAsync(string contractAddress, string wallet);
    public Task<IReadOnlyCollection<Transaction>> GetTokenTransactionsAsync(string contractAddress);
}