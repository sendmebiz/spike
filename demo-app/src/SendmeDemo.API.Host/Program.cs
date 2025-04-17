using Refit;
using SendmeDemo;
using SendmeDemo.Clients;
using SendmeDemo.Configuration;
using SendmeDemo.Contracts;
using SendmeDemo.Core;
using SendmeDemo.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<Configs>(builder.Configuration);

var configs = builder.Configuration.Get<Configs>();

builder.Services.AddSingleton(configs.Settings);
builder.Services.AddTransient<IERC20, ERC20>(_ => new ERC20(configs.ERC20));
builder.Services.AddTransient<IERC721, ERC721>(_ => new ERC721(configs.ERC721));
builder.Services.AddTransient<IUserService, UserService>();
builder.Services.AddTransient<ITransactionHistoryService, TransactionHistoryService>();
builder.Services.AddRefitClient<IEtherscanClient>()
    .ConfigureHttpClient(c =>
    {
        c.BaseAddress = new Uri(configs.Settings.EtherscanApi);
    });

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(t =>
{
    t.AllowAnyOrigin();
    t.AllowAnyHeader();
    t.AllowAnyMethod();
});

app.UseMiddleware<ExceptionHandlingMiddleware>(
    new ExceptionHandlingMiddlewareOptions { DiagnosticsEnabled = false, TracingUrl = string.Empty });

app.InitCBDCEndpoints(configs);
app.InitKYCEndpoints(configs);
app.InitSettingsEndpoints(configs);
app.InitUserEndpoints(configs);
app.InitTransactionsEndpoints(configs);

app.Run();