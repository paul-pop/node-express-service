const app = require("express")();
const bodyParser = require("body-parser").json();
const pino = require("express-pino-logger")();
const logger = require("pino")();

const env = process.env.ENVIRONMENT || "default";
const config = require(`./config/${env}/config.json`);
const port = config.server.port;

// Express middleware
app.use(bodyParser);
app.use(pino);

// Express routes
app.get("/health", require("./routes/health"));
app.get("/api/:name", require("./routes/api"));

// Error handling
app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Not Found" });
});

app.listen(port, () => {
  logger.info(`Running service on port ${port} using ENVIRONMENT: ${env}`);
});

module.exports = app;
