using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;
using Nethereum.Contracts;

namespace SendmeDemo.Contracts.Functions;

[Function("burn", "string")]
public class BurnFunction : FunctionMessage
{
    [Parameter("uint256", "_value", 1)] public BigInteger Value { get; set; }
}

[Function("burn", "string")]
public class BurnNFTFunction : FunctionMessage
{
    [Parameter("uint256", "_tokenId", 1)] public BigInteger TokenId { get; set; }
}