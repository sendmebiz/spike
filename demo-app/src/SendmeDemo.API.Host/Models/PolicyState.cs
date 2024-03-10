namespace SendmeDemo;

public class PolicyState
{
    public PolicyState()
    {
        
    }
    
    public PolicyState(decimal limit, int period, bool kycEnabled)
    {
        Limit = limit;
        Period = period;
        KycEnabled = kycEnabled;
    }
    
    public decimal Limit { get; set; }
    public int Period { get; set; }
    public bool KycEnabled { get; set; }
}