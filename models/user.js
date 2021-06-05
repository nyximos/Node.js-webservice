const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
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
      email: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      nick: {   // 이름
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      number: {   // 학번
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      birth: {
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      mobile: {  // 전화번호
        type: Sequelize.STRING(15),
        allowNull: true,
      },
      provider: {      // local 또는 kakao (google, facebook)
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },
    }, {
      sequelize: sequelize,          // DB 서버와 연결한 객체
      timestamps: true,     // createdAt, updatedAt 자동 생성
      underscored: false,   // true이면 created_at으로 자동 생성
      modelName: 'User',
      tableName: 'users',
      paranoid: true,       // deletedAt 자동 생성
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);     // 사용자는 게시글을 다수 가질 수 있다.
    db.User.belongsToMany(db.User, {    // 사용자는 여러 사용자에게 팔로잉될 수 있다.
      foreignKey: 'followingId',              // FollowingId가 외래키
      as: 'Followers',                           // Followers 형태로서 
      through: 'Follow',                       // Follow 모델이 중간 매개 모델
    });
    db.User.belongsToMany(db.User, {    // 사용자는 여러 사용자에게 팔로워로서 역할할 수 있다.
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};