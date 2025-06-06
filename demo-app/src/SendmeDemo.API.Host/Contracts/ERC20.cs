using Nethereum.Web3;
using Nethereum.Contracts;
using Nethereum.Contracts.Services;
using Nethereum.Contracts.Standards.ERC20.ContractDefinition;
using Nethereum.Hex.HexTypes;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Util;
using Nethereum.Web3.Accounts;
using SendmeDemo;
using SendmeDemo.Contracts.Dtos;
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

    public async Task<PolicyState> GetPolicyState(Wallet issuer)
    {
        var web3 = new Web3(_settings.ConnectionString);
        var policyState = await web3.Eth.GetContractQueryHandler<PolicyStateFunction>()
            .QueryDeserializingToObjectAsync<GetPolicyStateDto>(new PolicyStateFunction(), _settings.Address);

        return new PolicyState
        {
            KycEnabled = policyState.KycEnabled,
            Limit = (decimal)policyState.Limit / (decimal)Math.Pow(10, 18),
            Period = (int)policyState.Period
        };
    }

    public async Task<decimal> GetBalanceAsync(string address)
    {
        var web3 = new Web3(_settings.ConnectionString);
        BigInteger balance = await web3.Eth.ERC20.GetContractService(_settings.Address).BalanceOfQueryAsync(address);
        return (decimal)balance / (decimal)Math.Pow(10, 18);
    }

    public Task<string> SetKycAsync(Wallet issuer, bool kycEnabled)
    {
        var message = new SetKycFunction
        {
            Enabled = kycEnabled
        };

        return SendRequestInternalAsync(message, issuer);
    }

    public Task<string> TransferAsync(Wallet from, string to, decimal value)
    {
        var transactionMessage = new TransferFunction()
        {
            FromAddress = from.PublicKey,
            To = to,
            Value = new BigInteger(value * (decimal)Math.Pow(10, 18)),
        };
        return SendRequestInternalAsync(transactionMessage, from);
    }

    public Task<string> SetPeriodAsync(Wallet wallet, int period)
    {
        var message = new SetPeriodFunction
        {
            Period = period
        };

        return SendRequestInternalAsync(message, wallet);
    }

    public Task<string> SetLimitAsync(Wallet wallet, int limit)
    {
        var message = new SetLimitFunction
        {
            Limit = limit * new BigInteger(Math.Pow(10, 18))
        };

        return SendRequestInternalAsync(message, wallet);
    }

    public Task<string> MintAsync(Wallet issuer, string to, decimal value)
    {
        var message = new MintFunction()
        {
            FromAddress = issuer.PublicKey,
            To = to,
            Value = new BigInteger(value * (decimal)Math.Pow(10, 18)),
        };
        return SendRequestInternalAsync(message, issuer);
    }

    public Task<string> BurnAsync(Wallet issuer, decimal value)
    {
        var message = new BurnFunction
        {
            FromAddress = issuer.PublicKey,
            Value = new BigInteger(value * (decimal)Math.Pow(10, 18)),
        };
        return SendRequestInternalAsync(message, issuer);
    }

    private async Task<string> SendRequestInternalAsync<T>(T message, Wallet from) where T : FunctionMessage, new()
    {
        const int chain = 421614;
        var web3 = new Web3(new Account(from.PrivateKey, chain), _settings.ConnectionString);

        var gasEstimationHandler = web3.Eth.GetContractTransactionHandler<T>();
        var gasEstimate = await gasEstimationHandler.EstimateGasAsync(_settings.Address, message);
        var gasLimit = new HexBigInteger(gasEstimate.Value + (gasEstimate.Value / 10)); // 10% buffer

        var latestBlock = await web3.Eth.Blocks.GetBlockWithTransactionsHashesByNumber.SendRequestAsync(BlockParameter.CreateLatest());
        
        var maxPriorityFeePerGas = new HexBigInteger(Web3.Convert.ToWei(25, UnitConversion.EthUnit.Gwei)); // minimum 25 gwei as per error message
        
        var baseFee = latestBlock.BaseFeePerGas ?? new HexBigInteger(Web3.Convert.ToWei(1, UnitConversion.EthUnit.Gwei));
        var maxFeePerGas = new HexBigInteger(baseFee.Value + (maxPriorityFeePerGas.Value * 2)); // 2x priority fee for buffer
        
        message.MaxPriorityFeePerGas = maxPriorityFeePerGas;
        message.MaxFeePerGas = maxFeePerGas;
        message.Gas = gasLimit;

        var transferHandler = web3.Eth.GetContractTransactionHandler<T>();
        
        TransactionReceipt? transaction =
            await transferHandler.SendRequestAndWaitForReceiptAsync(_settings.Address, message);

        if (transaction.Status == new HexBigInteger(new BigInteger(0)))
        {
            throw new SendmeCoreException($"Transaction is failed: {transaction?.TransactionHash}");
        }

        return transaction.TransactionHash;
    }
}