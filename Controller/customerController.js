const { render } = require("ejs");
const db = require("../Model/index");
const customer = require("../Model/customer");
const Customer = db.customer;
exports.renderCoustomers=async(req,res)=>{
  const customers=await Customer.findAll()
  res.render('customersList',{customers:customers})
}

exports.renderAddCustomers=async(req,res)=>{
  res.render('addCustomers')
  //??
}

exports.addCustomer= async(req,res)=>{
  const {name,phone}=req.body
  const customer={
      'name':name,
      'phone':phone,
  }
  await Customer.create(customer)
  res.redirect('customersList')
}

exports.getCustomerById = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    res.render("customerDetails", { customer });
  } catch (error) {
    console.error("Error retrieving customer:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateCustomer = async (req, res) => {
  const customerId = req.params.id;
  const { name, phone } = req.body;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    customer.name = name;
    customer.phone = phone;
    await customer.save();
    res.redirect(`/customers/${customerId}`);
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteCustomer = async (req, res) => {
  const customerId = req.params.id;
  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    await customer.destroy();
    res.redirect("/customersList");
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).send("Internal Server Error");
  }
};


