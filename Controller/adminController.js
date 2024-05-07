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
            profilePic:req.file.filename,
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
      res.redirect("/product/add");
    } else {
      res.redirect("/login");
    }
  
  };  

  exports.updateProfile = async (req, res) => {
    const { name, email, password } = req.body;
    const adminId = req.params.id; // Assuming you pass admin ID in the URL
    
    try {
        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            return res.status(404).send("Admin not found");
        }

        admin.name = name;
        admin.email = email;
        admin.password = bcrypt.hashSync(password, 10); // Update password if provided

        await admin.save();

        res.redirect("/profile"); // Redirect to profile page after update
    } catch (error) {
        console.error("Error updating admin profile:", error);
        res.status(500).send("Internal Server Error");
    }
};


