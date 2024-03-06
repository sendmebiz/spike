using SendmeDemo.Configuration;
using SendmeDemo.Contracts;

namespace SendmeDemo.Core;

public class UserService : IUserService
{
    private readonly IERC20 _erc20;
    private readonly IERC721 _erc721;

    public UserService(IERC20 erc20, IERC721 erc721)
    {
        _erc20 = erc20;
        _erc721 = erc721;
    }

    public async Task<IReadOnlyCollection<UserModel>> GetUserListAsync(Configs config)
    {
        var alice = GetUserAsync(config, Participants.ALICE);
        var bob = GetUserAsync(config, Participants.BOB);
        var issuer = GetUserAsync(config, Participants.ISSUER);

        await Task.WhenAll(alice, bob, issuer);

        return [alice.Result, bob.Result, issuer.Result];
    }

    public Task<UserModel> GetUserDetailsAsync(Configs config, string name)
    {
        return GetUserAsync(config, name);
    }

    private async Task<UserModel> GetUserAsync(Configs config, string name)
    {
        if (name == Participants.ISSUER)
        {
            var bal = _erc20.GetBalanceAsync(config.Issuer.PublicKey);
            var totalSupply = _erc20.GetTotalSupplyAsync();
            await Task.WhenAll(bal, totalSupply);
            return new UserModel(name, config.Issuer.PublicKey, ["Issuer"], bal.Result, totalSupply.Result);
        }

        string address = name switch
        {
            Participants.ALICE => config.Alice.PublicKey,
            Participants.BOB => config.Bob.PublicKey,
            _ => name
        };

        var balance = _erc20.GetBalanceAsync(address);
        var isKyc = _erc721.IsOwned(address);

        await Task.WhenAll(balance, isKyc);
        string? kycStatus = isKyc.Result ? "KYC" : null;
        return new UserModel(name, address, [kycStatus], balance.Result);
    }
}