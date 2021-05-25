const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize){
        return super.init({
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
              },
              nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
              },
              password: {
                type: Sequelize.STRING(100),
                allowNull: true,
              },
              provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
              },
              snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
              },
            },{
                sequelize,
                timestamps: true,
                underscored: false,
                modelName: 'USer',
                tableName:'users',
                paranoid: true,
                
        });
    }

    static associate(db) {
      db.User.hasMany(db.Post);
      db.User.belongsToMany(db.User,{
        foreignKey: 'followingId',
        as: 'Followers',
        through: 'Follow',
      });
      db.User.belongsToMany(db.User,{
        foreignKey: 'followerId',
        as: 'Followings',
        through: 'Follow',
      });
    }
};
     
  