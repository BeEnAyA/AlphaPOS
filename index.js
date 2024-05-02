const express = require("express");
const app = express();
const port = 4000;
const db= require("./Model/index");
const adminController = require ("./Controller/adminController");
const productController=require("./Controller/productController");
const salesController=require("./Controller/salesController");
const customerController = require("./Controller/customerController");

const {storage, multer, productStorage} = require("./services/multerConfig");
const adminUpload = multer({storage:storage})
const productUpload = multer({storage:productStorage})


const path = require("path")
app.set("view engine","ejs");

require("./Config/db");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.static(path.join(__dirname,"Uploads/Admin")));
app.use(express.static(path.join(__dirname,"Uploads/Product")));

db.sequelize.sync({force:false});


app.get("/", adminController.index);
app.post("/register", adminUpload.single("profilePic"),adminController.registerAdmin);
app.get("/login", adminController.renderLogin);
app.post("/login", adminController.loginAdmin)

app.get("/product/add", productController.renderAddProduct)
app.get("/product/delete/:productId", productController.deleteProduct)
app.post("/product/add",productUpload.single("image"),productController.addProduct)
app.get('/sales', salesController.renderSalesProduct);
app.get('/pos', salesController.renderPOS);
app.post('/createSale', salesController.createSale);


app.get("/product",productController.renderAllProduct)

app.get('/search',productController.searchProduct);

app.get("/addCustomers",customerController.renderAddCustomers)
app.post("/customer/add",customerController.addCustomer);
app.get('/customersList', customerController.renderCoustomers);

app.listen(port, () => {
    console.log("Node server started at port 4000");
  });