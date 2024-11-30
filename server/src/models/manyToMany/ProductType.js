export default (sequelize) => {
    const ProductType = sequelize.define('ProductType', {});

    // Связь many-to-many между Product и Type через ProductType
    ProductType.associate = (models) => {
        models.Product.belongsToMany(models.Type, { through: ProductType });
        models.Type.belongsToMany(models.Product, { through: ProductType });
    };

    return ProductType;
};


  

      
    