const app = require("./app");

app.listen(process.env.PORT || 8000, function () {
  console.log("Server is running on "+ process.env.PORT +" port");
});