module.exports=(sequelize,DataTypes)=>{
    const Item= sequelize.define('item',{
        quantity:{
            type:DataTypes.STRING,
            allowNull:false
        },
    })
    return Item;
}