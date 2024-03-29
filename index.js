var winston, fs, mkdirp, loggerInstance;

winston = require('winston');
fs = require('fs');
mkdirp = require('mkdirp');
loggerInstance = false;

createLogger = function(filePath) {
  var accessLog, errorLog, logger;
  /*  If we dont pass in an argument, set the filePath to the
   *  base directory the parent application was called from.
  */

  if (filePath == null) {
      filePath = process.cwd();
  }

  /*  Check to see that we actually have a /logs directory
   *  In that location, creating it otherwise.
  */
  if (!fs.existsSync(filePath + '/logs')) {
      mkdirp.sync(filePath + '/logs');
  }
  accessLog = filePath + '/logs/access.log'
  errorLog = filePath + '/logs/errors.log'

  logger = new (winston.Logger)({
      transports : [new (winston.transports.Console)({
          colorize: true,
          json : false,
          timestamp : function(){
            var d = new Date();
            return  d.toDateString() + d.toLocaleTimeString();
          }
      }), new winston.transports.File({
          filename : accessLog,
          json : false,
          timestamp : function(){
            var d = new Date();
            return  d.toDateString() + d.toLocaleTimeString();
          }
      })],
      exceptionHandlers : [new (winston.transports.Console)({
          colorize: true,
          json : false,
          timestamp : function(){
            var d = new Date();
            return  d.toDateString() + d.toLocaleTimeString();
          }
      }), new winston.transports.File({
          filename : errorLog,
          json : false,
          timestamp : function(){
            var d = new Date();
            return  d.toDateString() + d.toLocaleTimeString();
          }
      })],
      exitOnError : false
  });

  return logger;
}

module.exports = function(filePath) {
  /* Create a simple singleton instance
  *  To hold our logger.
  */
  if (!loggerInstance) {
      loggerInstance = createLogger(filePath);
  }
  return loggerInstance;
}