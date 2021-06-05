const Sequelize = require('sequelize');

module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {    // 테이블 생성을 위해 
    return super.init({
      // field설정, id필드는 자동으로 프라이머리키로서 생성
      id: { // 글번호
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        // comment: '글 ID', // 설명
      },
      content: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      create_at: {  // 글작성시간
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
        },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) { 
    db.Post.belongsTo(db.User);   // 게시글은 사용자에게 속해 있다. 
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    // 게시글은 많은 해시태그에 속해질 수 있다.
  }
};