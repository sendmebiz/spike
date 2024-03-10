using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace SendmeDemo.Contracts.Functions;

[Function("setKyc", "string")]
public class SetKycFunction : FunctionMessage
{
    [Parameter("bool", "_enabled", 1)] public bool Enabled { get; set; }
}