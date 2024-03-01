namespace SendmeDemo.Web.Utils;

public static class SafeExecution
{
    public static async Task<string> ExecuteSafeAsync(Func<Task> func)
    {
        try
        {
            await func();
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            return "Internal server error.";
        }

        return null;
    }
}