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
    public UserModel(string name, string address, List<string> properties, decimal balance, decimal totalSupply)
    : this(name, address, properties, balance)
    {
       TotalSupply = totalSupply;
    }

    public string Name { get; set; }
    public string Address { get; set; }
    public List<string> Properties { get; set; }
    public decimal Balance { get; set; }
    public decimal TotalSupply { get; set; }

}