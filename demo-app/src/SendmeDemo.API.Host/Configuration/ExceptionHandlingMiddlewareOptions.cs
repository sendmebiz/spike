namespace SendmeDemo.Configuration
{
    public class ExceptionHandlingMiddlewareOptions
    {
        /// <summary>
        /// A flag indicating whether or not troubleshooting information is added to non-successful responses.
        /// This flag must be turned OFF on production.
        /// </summary>
        public bool DiagnosticsEnabled { get; set; }

        /// <summary>
        /// A URL that allows to see a sequence of events occurred during a request.
        /// It is ignored when <see cref="DiagnosticsEnabled"/> is set to false.
        /// </summary>
        public string TracingUrl { get; set; } = string.Empty;

        /// <summary>
        /// A predicate to invoke middleware only for matching requests. If the value is null, all requests go through the middleware.
        /// </summary>
        public Func<HttpContext, bool>? Predicate { get; set; }
    }
}