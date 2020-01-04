
//Carrega as variaveis ambiente definidas no arquivo .env  
//Essas variáveis podem ser acessadas a partir da variavel global do node "process.env"
import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import routes from './routes';
import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

import './database';
import 'express-async-errors';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);
  
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());

    this.server.use(express.json());

    // servir arquivos staticos
    this.server.use(
      '/files', // rota que vai servir os arquivos staticos
      express.static( path.resolve(__dirname,'..', 'tmp', 'uploads') ) 
    );
    
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {

    this.server.use(async (err, req, res, next) => {

      if (process.env.NODE_ENV === 'development') { 
        const erros = await new Youch(err, req).toJSON();
        return res.status(500).json(erros);
      }

      return res.status(500).json({ error: 'Internal server error.' });
      
    });
  }

}

// module.exports = new App().server;
export default new App().server;
