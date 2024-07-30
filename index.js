const express = require("express");
//configure dotenv
require("dotenv").config();
//database connection
require("./config/db");
const port = process.env.PORT;
//express object
const app = express();
//to interact with json
app.use(express.json());
app.use("/api/v1/", require("./routes/authRoutes"));
app.use("/api/v1/", require("./routes/userRoutes"));
app.use("/api/v1", require("./routes/productDetailsRoutes"));
app.use("/api/v1", require("./routes/productRoutes"));
app.use("/api/v1/", require("./routes/cartRoutes"));

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
