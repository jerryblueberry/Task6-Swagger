const winston  = require('winston');
const {combine,timestamp,printf} = winston.format;


const myFormat = printf(({level,message,timestamp}) => {
    return `[${timestamp}] ${level}:${message}`
})
//  create a winston logger instance
const logger = winston.createLogger({
    level:'info',
    transports:[
        new winston.transports.Console({
            format:winston.format.cli(),
        }), //logs to the Console
        new winston.transports.File({filename:'logs.log'}) // logs to the file
    ],
    format:combine(
        timestamp(),
        myFormat
        // winston.format.json()
    )
});


module.exports = {
    logger
 
}