namespace SendmeDemo.Core;

public interface IUserService
{
    public Task<IReadOnlyCollection<UserModel>> GetUserList(Configuration config);
}