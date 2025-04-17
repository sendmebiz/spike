using System.Dynamic;
using System.Globalization;
using System.Net.Mime;
using Microsoft;
using Newtonsoft.Json;
using SendmeDemo.Core.Exceptions;

namespace SendmeDemo.Configuration
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ExceptionHandlingMiddlewareOptions _options;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        private readonly Dictionary<ErrorType, int> _errorTypeToHttpStatusCodeMap = new Dictionary<ErrorType, int>
        {
            { ErrorType.ClientError, StatusCodes.Status400BadRequest },
            { ErrorType.ServerError, StatusCodes.Status500InternalServerError },
            { ErrorType.AuthenticationRequired, StatusCodes.Status401Unauthorized },
            { ErrorType.ResourceNotFound, StatusCodes.Status404NotFound },
            { ErrorType.ResourceAlreadyExists, StatusCodes.Status409Conflict },
            { ErrorType.AccessForbidden, StatusCodes.Status403Forbidden },
            { ErrorType.FailedDependency, StatusCodes.Status424FailedDependency },
            { ErrorType.NotAllowed, StatusCodes.Status405MethodNotAllowed }
        };

        public ExceptionHandlingMiddleware(
            RequestDelegate next,
            ExceptionHandlingMiddlewareOptions options,
            ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _options = options;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            Requires.NotNull(context, nameof(context));

            if (_options.Predicate != null && !_options.Predicate.Invoke(context))
            {
                await _next(context);
                return;
            }

            try
            {
                await _next(context);
            }
            catch (SendmeCoreException ex)
            {
                await HandleCoreException(context, ex);
            }
            catch (Exception ex)
            {
                await HandleInternalException(context, ex);
            }
        }

        private Task HandleCoreException(HttpContext context, SendmeCoreException ex)
        {
            if (ex.ErrorType == ErrorType.ServerError)
            {
                _logger.LogError(ex, "An error occurred while processing an API request");
            }
            else
            {
                _logger.LogWarning(ex, "A warning occurred while processing an API request");
            }

            object errorResponse = CreateErrorResponse(ex.Message, context.TraceIdentifier);
            int httpStatusCode = GetHttpCodeByErrorType(ex.ErrorType);
            return WriteResponseAsync(context, httpStatusCode, errorResponse);
        }

        private Task HandleInternalException(HttpContext context, Exception ex)
        {
            _logger.LogError(ex, "An error occurred while processing an API request");

            object errorResponse = CreateErrorResponse("Internal server error.", context.TraceIdentifier, 500);
            return WriteResponseAsync(context, StatusCodes.Status500InternalServerError, errorResponse);
        }

        private static Task WriteResponseAsync(HttpContext context, int httpStatusCode, object body)
        {
            context.Response.ContentType = MediaTypeNames.Application.Json;
            context.Response.StatusCode = httpStatusCode;

            return context.Response.WriteAsync(
                JsonConvert.SerializeObject(body, Formatting.None, new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore }));
        }

        private dynamic CreateErrorResponse(string message, string requestId, int? errorCode = null)
        {
            dynamic errorResponse = new ExpandoObject();
            if (errorCode.HasValue)
            {
                errorResponse.ErrorCode = errorCode;
            }

            errorResponse.Message = message;

            if (_options.DiagnosticsEnabled)
            {
                errorResponse.RequestId = requestId;
                if (!string.IsNullOrEmpty(_options.TracingUrl))
                {
                    errorResponse.TracingUrl = string.Format(CultureInfo.InvariantCulture, _options.TracingUrl, requestId);
                }
            }

            return errorResponse;
        }

        private int GetHttpCodeByErrorType(ErrorType errorType)
        {
            if (!_errorTypeToHttpStatusCodeMap.TryGetValue(errorType, out var statusCode))
            {
                statusCode = StatusCodes.Status500InternalServerError;
            }

            return statusCode;
        }
    }
}
