require('dotenv/config');
// é lido pelo sequelize que n consegue entender import
module.exports = {
  // na documentação de dialects do sequelize, pde para instalar as libraries pg@^7.0.0 e pg-hstore
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    timestamps: true, // para as colunas armazenarem a data de criação e edicação de cada registro.
    underscored: true, // fala para o sequelize usar o padrão com letras minusculas cm as palavras separadas por _
    underscoredAll: true, // faz a mesma coisa, mas n para o nome da tabela e sim para o nome das colunas e relacionamentos.
  },
};
