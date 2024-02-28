namespace SendmeDemo;

public class Wallet
{
    public Wallet()
    {
        
    }
    public Wallet(string publicKey, string privateKey)
    {
        PublicKey = publicKey;
        PrivateKey = privateKey;
    }

    public string PublicKey { get; set; }
    public string PrivateKey { get; set; }
}