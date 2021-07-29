const express = require("express");
const mongoose = require("mongoose");
const env = require("dotenv");
const app = express();
const cors = require("cors");

//routes
const userRoutes = require("./routes/user/auth");
const noteRoutes = require("./routes/notes");

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.1ybab.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("database connection established"))
  .catch((err) => console.log(err));
mongoose.set("useFindAndModify", false);

app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", noteRoutes);

app.listen(process.env.PORT, () => {});
