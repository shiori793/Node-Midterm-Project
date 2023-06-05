import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./backend/route/authRoutes.js";
import listRoutes from './backend/route/listRoute.js'
import cors from "cors";
import mongoose from "mongoose";
mongoose.set('strictQuery', true);

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});
mongoose.connect(`mongodb+srv://shiorifujiicb:${process.env.MONGO_PASSWORD}@cluster0.d9cumcp.mongodb.net/todolistDB`, {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors()); 

app.get("/about", function(req, res){
  res.render("about");
});

app.use("/auth", authRoutes);
app.use("/list", listRoutes)

app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});
