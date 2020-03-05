
import 'dotenv/config';
import express from 'express';
import path from 'path';
import routes from './routes';

import * as Sentry from '@sentry/node';
import sentryConfig from './config/sentry';

//Loader Models
import './database';
import 'express-async-errors';

class App {
  constructor() {
    this.server = express();
    Sentry.init(sentryConfig);
    this.middlewares();
    this.routes();
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
}

export default new App().server;
