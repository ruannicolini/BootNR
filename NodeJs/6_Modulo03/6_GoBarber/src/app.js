import express from 'express';
import path from 'path';
import routes from './routes';

import './database';
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());

    // servir arquivos staticos
    this.server.use(
      '/files', // rota que vai servir os arquivos staticos
      express.static( path.resolve(__dirname,'..', 'tmp', 'uploads') ) 
    );
    
  }

  routes() {
    this.server.use(routes);
  }
}

// module.exports = new App().server;
export default new App().server;
