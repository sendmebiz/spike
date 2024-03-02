using SendmeDemo;
using SendmeDemo.Contracts;
using SendmeDemo.Core;
using SendmeDemo.Endpoints;

var builder = WebApplication.CreateBuilder(args);
builder.Services.Configure<Configuration>(builder.Configuration);

var configs = builder.Configuration.Get<Configuration>();

builder.Services.AddTransient<IERC20, ERC20>(_ => new ERC20(configs.ERC20));
builder.Services.AddTransient<IERC721, ERC721>(_ => new ERC721(configs.ERC721));
builder.Services.AddTransient<IUserService, UserService>();

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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


app.InitErc20Endpoints(configs);
app.InitErc721Endpoints(configs);
app.InitSettingsEndpoints(configs);
app.InitUserEndpoints(configs);


app.Run();