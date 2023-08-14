module.exports=(sequelize,DataTypes)=>{
    const Sale= sequelize.define('sale',{
        total:{
            type:DataTypes.STRING,
            allowNull:false
        },
        
    })
    return Sale;
}