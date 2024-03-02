import logger, { createLogger, LoggerFunction, ILogger, setMode } from '@zajno/common/logger';

export { createLogger };

export type { LoggerFunction, ILogger };

setMode('console');

export default logger;

logger.log(__APP_VERSION__);
