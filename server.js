require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
app.use(express.json());
app.use(cors());
const port = 8000;

app.use("/api/", router);

app.listen(port, () => {
    console.log("listening on port " + port);
});
