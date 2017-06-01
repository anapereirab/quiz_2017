var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Para usar en local BBDD SQLite:
  // DATABASE_URL = "sqlite:///"
  //  DATABASE_STORAGE = "quiz.sqlite"
// Para usar en Heroku BBDD Postgres:
//    DATABASE_URL = postgres://user:passwd@host:port/database

var url, storage;

if (!process.env.DATABASE_URL) {
	console.log("No hay process.env");
    url = "sqlite:///";
    //url = "postgres://rlgdvzqrbqvrno:a77a3bcc10f25aa67d424cf223d633b5c02176443b4637a9abb87d5d0955ecf0@ec2-54-225-118-55.compute-1.amazonaws.com:5432/dfm4k7kj9635mn"
    storage = "quiz.sqlite";
    console.log("url: "+url);
} else {
    url = process.env.DATABASE_URL;
    storage = process.env.DATABASE_STORAGE || "";
}

var sequelize = new Sequelize(url, {storage: storage});

//var sequelize = new Sequelize(url);



// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));


// Importar la definicion de la tabla Tips de tips.js
var Tip = sequelize.import(path.join(__dirname,'tip'));

// Importar la definicion de la tabla Users de user.js
var User = sequelize.import(path.join(__dirname,'user'));


// Relaciones entre modelos
Tip.belongsTo(Quiz);
Quiz.hasMany(Tip);

// Relacion 1 a N entre User y Quiz:
User.hasMany(Quiz, {foreignKey: 'AuthorId'});
Quiz.belongsTo(User, {as: 'Author', foreignKey: 'AuthorId'});


exports.Quiz = Quiz; // exportar definición de tabla Quiz
exports.Tip = Tip;   // exportar definición de tabla Tips
exports.User = User; // exportar definición de tabla Users


