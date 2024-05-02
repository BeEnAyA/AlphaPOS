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
