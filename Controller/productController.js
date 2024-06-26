const db=require("../Model/index.js")
const Product=db.product
const sequelize=require('sequelize')

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
    res.redirect('/product')
}

exports.renderAllProduct=async(req,res)=>{
    const product=await Product.findAll()
    res.render('product',{product:product})
}

exports.searchProduct=async (req, res) => {
    const { keyword } = req.query;
    // Fetch items from the database where the name contains the keyword
    const filteredItems = await Product.findAll({
      where: {
        name: {
          [sequelize.Op.like]: `%${keyword}%`, // Case-insensitive search
        },
      },
    });
    res.json(filteredItems);
  }

  exports.deleteProduct= async (req,res)=>{
    const id=req.params.productId
    await Product.destroy({
      where:{
        id:id
      }
    })

    res.redirect('/product')
  }

