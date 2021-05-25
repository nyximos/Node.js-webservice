const Sequelize = require('sequelize');

module.exports = class Hashtag extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        },{
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Hangtag',
            tableName: 'hangtag',
            paranoid: false,
          
        });
    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag'});
    }
};