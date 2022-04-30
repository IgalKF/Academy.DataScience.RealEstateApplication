namespace Academy.DataScience.HouseLauncherGateway.Database;

using System.Data.SqlClient;

public class DatabaseHelper
{
    private readonly ILogger<DatabaseHelper> logger;
    private readonly IConfiguration configuration;

    public DatabaseHelper(ILogger<DatabaseHelper> logger, IConfiguration configuration)
    {
        this.logger = logger;
        this.configuration = configuration;
    }

    public async Task<bool> CreateNonexsistingDatabase(string databaseName)
    {
        try
        {
            string dbDefaultConnectionString = this.configuration.GetConnectionString($"{databaseName}Connection");
            SqlConnectionStringBuilder connectionStringBuilder = new(dbDefaultConnectionString);

            if (CheckIfDatabaseExists(connectionStringBuilder))
            {
                return true;
            }
            else
            {
                this.logger.LogInformation("Database instance wasn't found. Attempting database creation..");
            }

            connectionStringBuilder.InitialCatalog = "master";

            using SqlConnection sqlConnection = new(connectionStringBuilder.ConnectionString);

            sqlConnection.Open();

            using SqlCommand sqlCommand = new($"CREATE DATABASE [{databaseName}]", sqlConnection);

            await sqlCommand.ExecuteNonQueryAsync();

            sqlConnection.Close();

            return true;
        }
        catch (Exception ex)
        {
            this.logger.LogError(ex, "Database {dbName} wasn't able to be created!", databaseName);
            throw;
        }
    }

    private static bool CheckIfDatabaseExists(SqlConnectionStringBuilder connectionStringBuilder)
    {
        string sqlCreateDBQuery;
        bool result = false;

        try
        {
            sqlCreateDBQuery = $"SELECT database_id FROM sys.databases WHERE Name = '{connectionStringBuilder.InitialCatalog}'";
            connectionStringBuilder.InitialCatalog = "master";

            using SqlConnection tmpConn = new(connectionStringBuilder.ConnectionString);

            using (tmpConn)
            {
                using SqlCommand sqlCmd = new(sqlCreateDBQuery, tmpConn);
                tmpConn.Open();

                object resultObj = sqlCmd.ExecuteScalar();

                int databaseID = 0;

                if (resultObj != null)
                {
                    _ = int.TryParse(resultObj.ToString(), out databaseID);
                }

                tmpConn.Close();

                result = (databaseID > 0);
            }
        }
        catch
        {
            result = false;
        }

        return result;
    }
}


