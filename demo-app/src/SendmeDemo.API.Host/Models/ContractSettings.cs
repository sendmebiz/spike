namespace SendmeDemo;

public class ContractSettings
{
    public ContractSettings()
    {
        
    }
    public ContractSettings(string connectionString, string address)
    {
        ConnectionString = connectionString;
        Address = address;
    }
    
    public string ConnectionString { get; set; }
    public string Address { get; set; }
}