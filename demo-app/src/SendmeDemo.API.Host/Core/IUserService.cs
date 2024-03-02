
namespace SendmeDemo.Core;

public interface IUserService
{
    public Task<IReadOnlyCollection<UserModel>> GetUserListAsync(Configuration config);
    Task<UserModel> GetUserDetailsAsync(Configuration config, string name);
}