require("module-alias/register"); // module-alias

const app = require("./app");

const { port, env } = require("config");

app.listen(
  port,
  console.log(`Server running in ${env} mode on port ${port}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
