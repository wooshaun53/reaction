const app = require("./app"); // the actual Express application
const config = require("./utils/config");
const logger = require("./utils/logger");

const PORT = config.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
