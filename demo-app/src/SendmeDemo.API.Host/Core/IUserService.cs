
using SendmeDemo.Configuration;

namespace SendmeDemo.Core;

public interface IUserService
{
    public Task<IReadOnlyCollection<IUserModel>> GetUserListAsync(Configs config);
    Task<IUserModel> GetUserDetailsAsync(Configs config, string name);
}