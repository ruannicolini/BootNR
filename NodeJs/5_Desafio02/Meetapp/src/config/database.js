module.exports = {
  dialect: 'postgres',
  host: '192.168.99.100',
  username: 'postgres',
  password: 'docker',
  database: 'meetapp',
  operatorAliases: false,
  define: {
    timestamps: true, // Adiciona duas colunas na BD - registro e alteração
    underscored: true, // troca camelCase por snake_case
    underscoredAll: true
  }
};
