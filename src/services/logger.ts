type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private logs: { level: LogLevel; message: string; timestamp: string }[] = [];
  private maxLogs = 50;

  private log(level: LogLevel, message: string, context?: Record<string, any>): void {
    const timestamp = new Date().toISOString();
    this.logs.push({ level, message, timestamp });
    if (this.logs.length > this.maxLogs) this.logs.shift();

    if (__DEV__) {
      const prefix = `[${level.toUpperCase()}] ${timestamp}`;
      console.log(prefix, message, context || '');
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.log('debug', message, context);
  }

  info(message: string, context?: Record<string, any>): void {
    this.log('info', message, context);
  }

  warn(message: string, context?: Record<string, any>): void {
    this.log('warn', message, context);
  }

  error(message: string, context?: Record<string, any>): void {
    this.log('error', message, context);
  }
}

export const logger = new Logger();
