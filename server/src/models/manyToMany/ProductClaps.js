export default (sequelize) => {
    const ProductClaps = sequelize.define('ProductClaps', {});

    // Связь many-to-many между Product и Claps через ProductClaps
    ProductClaps.associate = (models) => {
        models.Product.belongsToMany(models.Claps, { through: ProductClaps });
        models.Claps.belongsToMany(models.Product, { through: ProductClaps });
    };

    return ProductClaps;
};


  

      
    