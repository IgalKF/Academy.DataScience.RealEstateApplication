using Academy.DataScience.HouseLauncherGateway.Dashboards;
using Academy.DataScience.HouseLauncherGateway.Database;
using Academy.DataScience.HouseLauncherGateway.Messages;
using Academy.DataScience.HouseLauncherGateway.Scraping;
using Hangfire;
using Hangfire.SqlServer;
using MassTransit;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<DatabaseHelper>();
builder.Services.AddSingleton<JobProcessor>();
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("HangfireConnection"), new SqlServerStorageOptions
    {
        CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
        SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
        QueuePollInterval = TimeSpan.Zero,
        UseRecommendedIsolationLevel = true,
        DisableGlobalLocks = true
    }));
builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<SayHelloConsumer>();
    EndpointConvention.Map<SayHello>(new Uri("queue:queue-name"));


    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("rabbitmq", "/");
        cfg.ReceiveEndpoint("queue-name", e =>
        {
            e.ConfigureConsumer<SayHelloConsumer>(context);
        });

        cfg.ConfigureEndpoints(context);
    });
});

builder.Services.AddHangfireServer();

var app = builder.Build();

DatabaseHelper databaseHelper = app.Services.GetRequiredService<DatabaseHelper>();
JobProcessor jobProcessor = app.Services.GetRequiredService<JobProcessor>();

await databaseHelper.CreateNonexsistingDatabase("Hangfire");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHangfireDashboard("/hangfire", new DashboardOptions()
{
    Authorization = new[] { new FreePassAuthorizationFilter() }
});

app.MapHangfireDashboard();

RecurringJob.AddOrUpdate(() => jobProcessor.ExecuteScrapingRequest(), Cron.Minutely);

app.UseHttpsRedirection();

app.MapGet("/", async res => await Task.Run(() => res.Response.Redirect("/hangfire")));

app.Run();
