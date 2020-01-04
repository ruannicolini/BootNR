require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  operatorAliases: false,
  define: {
    timestamps: true, // Adiciona duas colunas na BD - registro e alteração
    underscored: true, // troca camelCase por snake_case
    underscoredAll: true
  }
};
