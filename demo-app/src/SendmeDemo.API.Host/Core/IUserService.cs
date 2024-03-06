
using SendmeDemo.Configuration;

namespace SendmeDemo.Core;

public interface IUserService
{
    public Task<IReadOnlyCollection<UserModel>> GetUserListAsync(Configs config);
    Task<UserModel> GetUserDetailsAsync(Configs config, string name);
}