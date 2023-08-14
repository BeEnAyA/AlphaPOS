const db = require("../Model/index");
const Customer = db.customer;

exports.addCustomer = async (req, res) => {
    const { phone, name } = req.body;
        await Comment.create({
          phone: phone,
          name: name,
        });
  
    res.redirect("/pos");
  };