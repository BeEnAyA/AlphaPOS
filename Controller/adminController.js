const db = require("../Model/index");
const Admin = db.admin;
const bcrypt = require("bcryptjs");



exports.index = async (req, res) => {
    res.render("index");
  };

exports.registerAdmin = async(req, res) =>{
    const { name, email, password } = req.body
        await Admin.create({
            name:name,
            email:email,
            password:bcrypt.hashSync(password, 10),
            file:req.file.filename,
        })
        console.log("Admin registered successfully"); 
        res.redirect("/login")   
}; 


exports.renderLogin = async (req, res) => {
    res.render("login");
  };


exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    
    const registeredAdmin = await db.admin.findAll({
      where: {
        email: email,
      }
    });
  
    if (registeredAdmin.length == 0) { 
      return res.redirect("/login");
    }
  
    if (bcrypt.compareSync(password, registeredAdmin[0].password)) {
      res.redirect("/");
    } else {
      res.redirect("/login");
    }
  
  };  