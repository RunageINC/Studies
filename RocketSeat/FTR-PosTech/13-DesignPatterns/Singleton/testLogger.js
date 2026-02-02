const Logger = require("./SingletonLogger");

const logger1 = new Logger();
const logger2 = new Logger();
const logger3 = new Logger();

logger1.log("Hello World");
logger2.log("Hello World");
logger3.log("Hello World");

logger1.print();
logger2.print();
