const Sequelize = require('sequelize');

module.exports = class Question extends Sequelize.Model {
  static init(sequelize) {    //테이블 생성을 위해 호출되는 메소드
    return super.init({
      // field 설정
      // uid: {  // 열 Column이름
      //   type: Sequelize.NUMBER, // 자료형
      //   allowNull: true, // Null 허용 여부
      //   primaryKey: true, // Primary Key 여부
      //   // autoIncrement: true, // 자동증가 여부
      // }
      // ,
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      content: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },

      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },

      nick: {   // 이름
        type: Sequelize.STRING(15),
        allowNull: false,
      },

    }, {
      sequelize: sequelize,          // DB 서버와 연결한 객체
      timestamps: true,     // createdAt, updatedAt 자동 생성
      underscored: true,   // true이면 created_at으로 자동 생성
      modelName: 'Question',
      tableName: 'questions',
      paranoid: false,       // deletedAt 자동 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {}
};
