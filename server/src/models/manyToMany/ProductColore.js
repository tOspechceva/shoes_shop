export default (sequelize) => {
    const ProductColore = sequelize.define('ProductColore', {});

    // Связь many-to-many между Product и Colore через ProductColore
    ProductColore.associate = (models) => {
        models.Product.belongsToMany(models.Colore, { through: ProductColore });
        models.Colore.belongsToMany(models.Product, { through: ProductColore });
    };

    return ProductColore;
};


  

      
    