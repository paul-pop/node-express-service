const app = require("express")();
const bodyParser = require("body-parser").json();
const pino = require("express-pino-logger")();

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

module.exports = app;
