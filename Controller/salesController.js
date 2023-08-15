const db = require("../Model/index.js");
const Product = db.product;
const Sale = db.sale;
const Item= db.item
const sequelize = require('sequelize');

//sales Part trial only
exports.renderSalesProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.render('sales', { product: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("An error occurred while fetching products.");
  }
};

exports.createSale = async (req, res) => {
  const { productIds, quantities } = req.body;
  const productIdArray = productIds.split(',').filter(id => id !== "");
  const quantityArray = quantities.split(',').filter(qty => qty !== "");

  const newSale = await Sale.create({ total: 0 }); //making new sale with initial total of $0

  // Loop through the selected products and quantities
  for (let i = 0; i < productIdArray.length; i++) {
    const productId = parseInt(productIdArray[i]);
    const quantity = parseInt(quantityArray[i]);
    const product = await Product.findByPk(productId);

    if (product && product.quantity >= quantity) {      
      const total = newSale.total + product.unitPrice * quantity;
      await Item.create({ saleId: newSale.id, productId, quantity }); // Create an item in the database for this sale
      newSale.total = total;
      await newSale.save();
      
      // Update the product's quantity
      product.quantity -= quantity;
      await product.save();
    }
  }

  res.redirect("/pos");
};


// exports.renderPOS = async (req, res) => {
//   try {
//     const currentSale = await Sale.findOne({
//       include: [
//         {
//           model: Item,
//           include: Product, // Include Product model
//         },
//       ],
//       order: [['createdAt', 'DESC']], //descending order so that latest can de displayed
//     });

//     if (!currentSale) {
//       return res.render('pos', {
//         currentSale: null,
//       });
//     }

//     res.render('pos', {
//       currentSale,
//     });
//   } catch (error) {
//     console.error('Error fetching current sale:', error);
//     res.status(500).send('Error fetching current sale');
//   }
// };

exports.renderPOS = async (req, res) => {
  try {
    const currentSale = await Sale.findOne({
      include: [
        {
          model: Item,
          include: Product, // Include Product model
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    if (!currentSale) {
      return res.render('pos', {
        currentSale: null,
      });
    }

    // Calculate the subtotal for each item
    currentSale.items.forEach(item => {
      item.subtotal = item.quantity * item.product.unitPrice;
    });

    res.render('pos', {
      currentSale,
    });
  } catch (error) {
    console.error('Error fetching current sale:', error);
    res.status(500).send('Error fetching current sale');
  }
};
