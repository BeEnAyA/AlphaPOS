const db=require("../model/index.js")
const Product=db.product

exports.renderAddProduct=async(req,res)=>{
    res.render('addProduct')
}

exports.addProduct= async(req,res)=>{
    const {name,quantity,unitPrice}=req.body
    const product={
        'name':name,
        'unitPrice':unitPrice,
        'quantity':quantity,
        'image':'http://localhost:4000/'+req.file.filename
    }
    await Product.create(product)
    res.redirect('/product/add')
}

exports.renderAllProduct=async(req,res)=>{
    const product=await Product.findAll()
    res.render('product',{product:product})
}


