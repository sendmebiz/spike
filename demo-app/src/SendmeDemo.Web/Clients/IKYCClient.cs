namespace SendmeDemo.Web.Clients;

using Refit;

public interface IKYCClient
{
    [Post("/kyc/mint")]
    Task<string> MintAsync(string to);
    [Post("/kyc/burn")]
    Task<string> BurnAsync(int id);
}