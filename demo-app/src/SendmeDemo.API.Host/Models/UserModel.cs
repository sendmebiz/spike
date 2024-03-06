namespace SendmeDemo;

public class UserModel
{
    public UserModel()
    { }
    
    public UserModel(string name, string address, List<string> properties, decimal balance)
    {
        Name = name;
        Address = address;
        Properties = properties;
        Balance = balance;
    }

    public string Name { get; set; }
    public string Address { get; set; }
    public List<string> Properties { get; set; }
    public decimal Balance { get; set; }
}

public class IssuerModel : UserModel
{
    public IssuerModel(UserModel model, decimal totalSupply)
    {
        Name = model.Name;
        Address = model.Address;
        Properties = model.Properties;
        Balance = model.Balance;
        TotalSupply = totalSupply;
    }
    public decimal TotalSupply { get; set; }
}