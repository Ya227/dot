import React from 'react';
import express, { type Express, type Request, type Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world для проекта - dot')
});

app.listen(3000);

`const App = () => {
  return (
    <h1>Hello world для проекта - dot</h1>
  );
};

export default App;`