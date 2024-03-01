using Nethereum.Contracts;
using Nethereum.Hex.HexTypes;
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
    
    public async Task<string> MintAsync(Wallet issuer, string to)
    {
        var message = new MintNFTFunction
        {
            FromAddress = issuer.PublicKey,
            To = to,
        };
        
        return await TransferInternalAsync(message, issuer);
    }

    public async Task<string> BurnAsync(Wallet issuer, int id)
    {
        var message = new BurnNFTFunction
        {
            FromAddress = issuer.PublicKey,
            TokenId = id
        };

        return await TransferInternalAsync(message, issuer);
    }
    
    private async Task<string> TransferInternalAsync<T>(T message,Wallet from) where T : FunctionMessage, new()
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
}