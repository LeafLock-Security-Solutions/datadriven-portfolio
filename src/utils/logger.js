import log from 'loglevel';

const TAG = '[DDP]';
const isProd = import.meta.env.MODE === 'production';

// Set level based on environment
log.setLevel(isProd ? 'silent' : 'debug');

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
      const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
      const level = methodName.toUpperCase();

      rawMethod(`${TAG} [${timestamp}] [${level}]`, ...args);
    };
  };
  log.setLevel(log.getLevel());
  log._customized = true;
}
export default log;
