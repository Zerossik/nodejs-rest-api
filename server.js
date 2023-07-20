const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config(); // зчитує данні із .env та заносить їх у глобальний об'єкт process.env

const { DB_HOST, PORT } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
