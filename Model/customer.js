module.exports=(sequelize,DataTypes)=>{
    const Customer= sequelize.define('customer',{
        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
    })
    return Customer;
}