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
    
    public async Task<IReadOnlyCollection<UserModel>> GetUserList(Configuration config)
    {
        var users = new List<UserModel>();
        
        users.Add(new UserModel(Participants.ISSUER, config.Issuer.PublicKey, ["Issuer"], 1231230)); //TODO add balance
        users.Add(new UserModel(Participants.ALICE, config.Alice.PublicKey, ["KYC"], 1230)); //TODO add balance
        users.Add(new UserModel(Participants.BOB, config.Bob.PublicKey, ["Issuer"], 123123)); //TODO add balance
        
        return users;
    }
}