using Nethereum.Web3;
using Nethereum.Contracts;
using Nethereum.Contracts.Services;
using Nethereum.Hex.HexTypes;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using SendmeDemo;
using SendmeDemo.Contracts.Functions;
using SendmeDemo.Core.Exceptions;
using BigInteger = System.Numerics.BigInteger;


public class ERC20 : IERC20
{
    private readonly ContractSettings _settings;

    public ERC20(ContractSettings settings)
    {
        _settings = settings;
    }

    public async Task<decimal> GetTotalSupplyAsync()
    {
        var web3 = new Web3(_settings.ConnectionString);
        var totalSupply = await web3.Eth.ERC20.GetContractService(_settings.Address).TotalSupplyQueryAsync();
        return (decimal)totalSupply / (decimal)Math.Pow(10, 18);
    }

    public async Task<decimal> GetBalanceAsync(string address)
    {
        var web3 = new Web3(_settings.ConnectionString);
        BigInteger balance = await web3.Eth.ERC20.GetContractService(_settings.Address).BalanceOfQueryAsync(address);
        return (decimal)balance / (decimal) Math.Pow(10, 18);
    }

    public async Task<string> TransferAsync(Wallet from, string to, decimal value)
    {
        var transactionMessage = new TransferFunction()
        {
            FromAddress = from.PublicKey,
            To = to,
            Value = new BigInteger(value * (decimal) Math.Pow(10, 18)),
        };
        return await SendRequestInternalAsync(transactionMessage, from);
    }

    public async Task SetPeriodAsync(Wallet wallet, int period)
    {
        var message = new SetPeriodFunction
        {
            Period = period
        };

        await SendRequestInternalAsync(message, wallet);
    }

    public async Task SetLimitAsync(Wallet wallet, int limit)
    {
        var message = new SetLimitFunction
        {
            Limit = limit * new BigInteger(Math.Pow(10, 18))
        };

        await SendRequestInternalAsync(message, wallet);
    }

    public async Task<string> MintAsync(Wallet issuer, string to, decimal value)
    {
        var message = new MintFunction()
        {
            FromAddress = issuer.PublicKey,
            To = to,
            Value = new BigInteger(value * (decimal) Math.Pow(10, 18)),
        };
        return await SendRequestInternalAsync(message, issuer);
    }

    public async Task<string> BurnAsync(Wallet issuer, decimal value)
    {
        var message = new BurnFunction
        {
            FromAddress = issuer.PublicKey,
            Value = new BigInteger(value * (decimal) Math.Pow(10, 18)),
        };
        return await SendRequestInternalAsync(message, issuer);
    }

    private async Task<string> SendRequestInternalAsync<T>(T message, Wallet from) where T : FunctionMessage, new()
    {
        const int chain = 421614;
        var web3 = new Web3(new Account(from.PrivateKey, chain), _settings.ConnectionString);

        var gasLimit = new HexBigInteger(500000); // Adjust as needed
        var gasPrice = new HexBigInteger(Web3.Convert.ToWei(10, UnitConversion.EthUnit.Gwei)); // Adjust as needed

        message.GasPrice = gasPrice;
        message.Gas = gasLimit;

        var transferHandler = web3.Eth.GetContractTransactionHandler<T>();

        var transaction =
            await transferHandler.SendRequestAndWaitForReceiptAsync(_settings.Address, message);

        if (transaction.Status == new HexBigInteger(new BigInteger(0)))
        {
            throw new SendmeCoreException($@"Transaction is failed: {transaction?.TransactionHash}");
        }

        return transaction.TransactionHash;
    }
}