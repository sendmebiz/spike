using Nethereum.Web3;
using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using SendmeDemo;
using SendmeDemo.Contracts.Functions;
using BigInteger = System.Numerics.BigInteger;


public class ERC20 : IERC20
{
    private readonly ContractSettings _settings;

    public ERC20(ContractSettings settings)
    {
        _settings = settings;
    }

    public async Task<int> GetTotalSupplyAsync()
    {
        var web3 = new Web3(_settings.ConnectionString);
        var totalSupply = await web3.Eth.ERC20.GetContractService(_settings.Address).TotalSupplyQueryAsync();
        return (int) (totalSupply / new BigInteger(Math.Pow(10, 18)));
    }
    
    public async Task<int> GetBalanceAsync(string address)
    {
        var web3 = new Web3(_settings.ConnectionString);
        var totalSupply = await web3.Eth.ERC20.GetContractService(_settings.Address).BalanceOfQueryAsync(address);
        return (int) (totalSupply / new BigInteger(Math.Pow(10, 18)));
    }

    public async Task<string> TransferAsync(Wallet from, string to, int value)
    {
        var transactionMessage = new TransferFunction()
        {
            FromAddress = from.PublicKey,
            To = to,
            Value = value * new BigInteger(Math.Pow(10,18)),
        };
        return await SendRequestInternalAsync(transactionMessage, from);
    }

    private async Task<string> SendRequestInternalAsync<T>(T message,Wallet from) where T : FunctionMessage, new()
    {
        const int chain = 421614;
        var web3 = new Web3(new Account(from.PrivateKey, chain), _settings.ConnectionString);

        var gasLimit = new HexBigInteger(500000); // Adjust as needed
        var gasPrice = new HexBigInteger(Web3.Convert.ToWei(10, UnitConversion.EthUnit.Gwei)); // Adjust as needed

        message.GasPrice = gasPrice;
        message.Gas = gasLimit;
        
        var transferHandler = web3.Eth.GetContractTransactionHandler<T>();

        var transactionHash =
            await transferHandler.SendRequestAndWaitForReceiptAsync(_settings.Address, message);

        return transactionHash.TransactionHash;
    }

    public async Task SetPeriodAsync(Wallet wallet, int period)
    {
        var message = new SetPeriodFunction
        {
            Period = period * new BigInteger(Math.Pow(10,18))
        };
        
        await SendRequestInternalAsync(message, wallet);
    }

    public async Task SetLimitAsync(Wallet wallet, int limit)
    {
        var message = new SetLimitFunction
        {
            Limit = limit * new BigInteger(Math.Pow(10,18))
        };
        
        await SendRequestInternalAsync(message, wallet);
    }

    public async Task<string> MintAsync(Wallet issuer, string to, int value)
    {
        var message = new MintFunction()
        {
            FromAddress = issuer.PublicKey,
            To = to,
            Value = value * new BigInteger(Math.Pow(10,18)),
        };
        return await SendRequestInternalAsync(message, issuer);
    }

    public async Task<string> BurnAsync(Wallet issuer, int value)
    {
        var message = new BurnFunction
        {
            FromAddress = issuer.PublicKey,
            Value = value * new BigInteger(Math.Pow(10,18)),
        };
        return await SendRequestInternalAsync(message, issuer);
    }
}