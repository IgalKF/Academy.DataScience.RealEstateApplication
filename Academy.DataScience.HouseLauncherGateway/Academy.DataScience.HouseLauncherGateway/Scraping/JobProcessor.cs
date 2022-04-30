namespace Academy.DataScience.HouseLauncherGateway.Scraping;

using System.Text;
using Academy.DataScience.HouseLauncherGateway.Messages;
using MassTransit;
using MassTransit.Transports;

public class JobProcessor
{
    private readonly IBus bus;
    public JobProcessor(IBus bus)
    {
        this.bus = bus;
    }

    public async Task ExecuteScrapingRequest()
    {
        await bus.Send(new SayHello());
    }
}

