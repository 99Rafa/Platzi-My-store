const express = require('express');
const cors = require('cors');
const {
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');
const { routerApi } = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
};
app.use(cors(options));

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App corriendo en http://localhost:${port}`);
});
