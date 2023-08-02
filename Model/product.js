module.exports=(sequelize,DataTypes)=>{
    const Product= sequelize.define('product',{
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        unitPrice:{
            type:DataTypes.FLOAT,
            allowNull:false,
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
    return Product;
}