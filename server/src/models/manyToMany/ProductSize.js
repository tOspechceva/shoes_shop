export default (sequelize) => {
    const ProductSize = sequelize.define('ProductSize', {});

    // Связь many-to-many между Product и Size через ProductSize
    ProductSize.associate = (models) => {
        models.Product.belongsToMany(models.Size, { through: ProductSize });
        models.Size.belongsToMany(models.Product, { through: ProductSize });
    };

    return ProductSize;
};


  

      
    