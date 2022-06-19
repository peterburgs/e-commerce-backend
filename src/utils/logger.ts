import {Logger} from "tslog";

const logger: Logger = new Logger({
  name: "myApp",
  displayFunctionName: false,
  displayFilePath: "hidden",
  printLogMessageInNewLine: true,
  displayLoggerName: false,
});
export default logger;
