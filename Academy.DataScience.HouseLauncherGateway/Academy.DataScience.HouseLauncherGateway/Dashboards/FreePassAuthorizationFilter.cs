using Hangfire.Dashboard;

namespace Academy.DataScience.HouseLauncherGateway.Dashboards;

public class FreePassAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context)
    {
        return true;
    }

    public static int Power(int b, int n)
    {
        for (int i = 1; i <= n; i++)
        {
            b *= b;
        }

        return b;
    }
}
