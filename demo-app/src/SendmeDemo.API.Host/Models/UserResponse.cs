namespace SendmeDemo;

public class UserResponse
{
    public UserResponse()
    { }
    
    public UserResponse(string name, string address, List<string> properties, int balance)
    {
        Name = name;
        Address = address;
        Properties = properties;
        Balance = balance;
    }

    public string Name { get; set; }
    public string Address { get; set; }
    public List<string> Properties { get; set; }
    public int Balance { get; set; }
}