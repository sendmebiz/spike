using System.Text.Json.Serialization;

namespace SendmeDemo;

public class Transaction
{
    public Transaction()
    {
        
    }
    public Transaction(string hash, string from, string to, string timeStamp, decimal value)
    {
        From = from;
        To = to;
        TimeStamp = long.Parse(timeStamp);
        Id = hash;
        Value = value;
    }
    
    public string Id { get; set; }
    public string From { get; set; }
    public string To { get; set; }
    public long TimeStamp { get; set; }
    public decimal Value { get; set; }
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public TransactionType Type { get; set; }
}