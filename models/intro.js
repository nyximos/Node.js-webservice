const Sequelize = require('sequelize');

module.exports = class Intro extends Sequelize.Model {
  static init(sequelize) {    //테이블 생성을 위해 호출되는 메소드
    return super.init({
     name:{
         type: Sequelize.STRING(20),
         allowNull: false,
         unique : true,
     },
     age:{
         type:Sequelize.INTEGER.UNSIGNED,
         allowNull: false,
     },
     comment: {
         type:Sequelize.TEXT,
         allowNull: true,
     },
     
    }, {
      sequelize: sequelize,          // DB 서버와 연결한 객체
      timestamps: true,     // createdAt, updatedAt 자동 생성
      underscored: false,   // true이면 created_at으로 자동 생성
      modelName: 'Intro',
      tableName: 'intro',
      paranoid: true,       // deletedAt 자동 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){}
  
};
