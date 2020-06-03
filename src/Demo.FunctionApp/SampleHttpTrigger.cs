using System;
using System.IO;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

namespace Demo.FunctionApp
{
    public static class SampleHttpTrigger
    {
        [FunctionName(nameof(SampleHttpTrigger.Run))]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "hello")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var message = new { message = "world!" };
            var result = new OkObjectResult(message);

            return await Task.FromResult(result).ConfigureAwait(false);
        }
    }
}
