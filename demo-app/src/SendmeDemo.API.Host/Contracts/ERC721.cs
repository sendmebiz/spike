using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
using Nethereum.RPC.Eth.DTOs;
using Nethereum.Util;
using Nethereum.Web3;
using SendmeDemo.Contracts.Functions;
using Account = Nethereum.Web3.Accounts.Account;

namespace SendmeDemo.Contracts;

public class ERC721 : IERC721
{
    private readonly ContractSettings _settings;

    public ERC721(ContractSettings settings)
    {
        _settings = settings;
    }
    
    public Task<string> MintAsync(Wallet issuer, string to)
    {
        var message = new MintNFTFunction
        {
            FromAddress = issuer.PublicKey,
            To = to,
        };
        
        return TransferInternalAsync(message, issuer);
    }

    public Task<string> BurnAsync(Wallet issuer, int id)
    {
        var message = new BurnNFTFunction
        {
            FromAddress = issuer.PublicKey,
            TokenId = id
        };

        return TransferInternalAsync(message, issuer);
    }

    public async Task<bool> IsOwned(string owner)
    {
        var balance = await GetBalanceAsync(owner);
        return balance == 1;
    }
    
    private async Task<int> GetBalanceAsync(string address)
    {
        var web3 = new Web3(_settings.ConnectionString);
        var balance = await web3.Eth.ERC721.GetContractService(_settings.Address).BalanceOfQueryAsync(address);
        return (int) balance;
    }

    private async Task<string> TransferInternalAsync<T>(T message,Wallet from) where T : FunctionMessage, new()
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

        var transactionHash =
            await transferHandler.SendRequestAndWaitForReceiptAsync(_settings.Address, message);

        return transactionHash.TransactionHash;
    }
}