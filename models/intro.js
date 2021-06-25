const Sequelize = require('sequelize');

module.exports = class Intro extends Sequelize.Model {
  static init(sequelize) {    //테이블 생성을 위해 호출되는 메소드
    return super.init({ //컬럼 정의
  //   id: {
  //     type: Sequelize.INTEGER,
  //     primarykey: true,
  //     autoIncrement: true,
  //   }, // sequelize는 id를 자동으로 넣어줘서 생략 가능
 
     name:{
         type: Sequelize.STRING(20),
         allowNull: false,  //not null
         unique : true,
     },
     birth: {
      type: Sequelize.STRING(15),
      allowNull: true,
    },
    
    task:{
      type: Sequelize.STRING(100),
      allowNull: true,
    },
    
     //deletedAt: true - soft delete  ,실제로 row자체를 통체로 날리는 것 - hard delete
    }, {
      sequelize: sequelize,          // DB 서버와 연결한 객체 , 모델에 대한 설정
      timestamps: false,     // createdAt, updatedAt 자동 생성
      underscored: false,   // true이면 created_at으로 자동 생성
      modelName: 'Intro',   // 자바스크립트에서 쓰는 이름
      tableName: 'intros',  // 실제 sql에서 쓰는 이름
      paranoid: false,       // deletedAt 자동 생성  true면 soft delete를 사용 가능(회원 정보)
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  static associate(db){}
  
};
