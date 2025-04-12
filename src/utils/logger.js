import { config } from '@/config/Validate';
import { getCurrentTimestamp } from '@/utils/time';
import log from 'loglevel';

const { level, tag } = config.logger;
const isProd = import.meta.env.MODE === 'production';

const resolvedLevel = isProd ? level.production : level.development;

// Set level based on environment
log.setLevel(resolvedLevel);

const originalFactory = log.methodFactory;

if (!log._customized) {
  /**
   * Custom log method factory to inject:
   * - [TAG]
   * - [Timestamp]
   * - [Log Level]
   * @param methodName
   * @param logLevel
   * @param loggerName
   * @returns {Function} A wrapped logging method
   */
  log.methodFactory = function (methodName, logLevel, loggerName) {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);

    return function (...args) {
      const timestamp = getCurrentTimestamp();
      const logLevelLabel = methodName.toUpperCase();

      rawMethod(`[${tag}] [${timestamp}] [${logLevelLabel}]`, ...args);
    };
  };
  log.setLevel(log.getLevel());
  log._customized = true;
}
export default log;
