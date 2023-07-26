const express = require("express");
const app = express();
const port = 4000;
const db= require("./Model/index");
const adminController = require ("./Controller/adminController");
const {storage, multer} = require("./Services/multerConfig");
const upload = multer({storage:storage})


const path = require("path")
app.set("view engine","ejs");

require("./Config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"Uploads/Admin")));


db.sequelize.sync({force:false});


app.get("/", adminController.index);
app.post("/register", upload.single("file"),adminController.registerAdmin);
app.get("/login", adminController.renderLogin);
app.post("/login", adminController.loginAdmin)

app.listen(port, () => {
    console.log("Node server started at port 4000");
  });