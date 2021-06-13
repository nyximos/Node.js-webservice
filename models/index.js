const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const Hashtag = require('./hashtag');
const Intro = require('./intro');
const Major = require('./major');
const Question = require('./questions')


const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.Hashtag = Hashtag;
db.Intro = Intro;
db.Major = Major;
db.Question = Question;


User.init(sequelize);
Post.init(sequelize);
Hashtag.init(sequelize);
Intro.init(sequelize); // table이랑 model 이랑 sequelize 랑 mysql연결
Major.init(sequelize);
Question.init(sequelize);

User.associate(db);
Post.associate(db);
Hashtag.associate(db);
Intro.associate(db);
Major.associate(db);
Question.associate(db);

module.exports = db;
