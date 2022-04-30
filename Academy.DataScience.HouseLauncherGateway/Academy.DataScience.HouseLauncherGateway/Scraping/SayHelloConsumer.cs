namespace Academy.DataScience.HouseLauncherGateway.Scraping;

using Academy.DataScience.HouseLauncherGateway.Messages;
using MassTransit;

public class SayHelloConsumer :
        IConsumer<SayHello>
{
    readonly ILogger<SayHelloConsumer> logger;

    public SayHelloConsumer(ILogger<SayHelloConsumer> logger)
    {
        this.logger = logger;
    }

    public async Task Consume(ConsumeContext<SayHello> context)
    {
        this.logger.LogInformation("Hello!!!");

        await Task.CompletedTask;
    }
}
