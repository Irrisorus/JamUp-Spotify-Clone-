const express = require("express");
const cors = require("cors"); 
const bodyParser = require("body-parser");
const path = require("path");
const playerRouter=require("./routes/player.route")

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
// app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./project/dist/")));
app.use("/", playerRouter);




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
