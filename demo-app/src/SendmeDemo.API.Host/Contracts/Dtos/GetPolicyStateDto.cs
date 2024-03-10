using System.Numerics;
using Nethereum.ABI.FunctionEncoding.Attributes;

namespace SendmeDemo.Contracts.Dtos;

[FunctionOutput]
public class GetPolicyStateDto : IFunctionOutputDTO
{
    [Parameter("uint256", "period", 1)] public BigInteger Period { get; set; }

    [Parameter("uint256", "limit", 2)] public BigInteger Limit { get; set; }

    [Parameter("bool", "kyc", 3)] public bool KycEnabled { get; set; }
}