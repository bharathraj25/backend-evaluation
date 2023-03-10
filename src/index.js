const express = require('express');
const { middleWareErrorHandle } = require('./middleware');

const { PORT } = require('./config');

const app = express();

app.use(express.json());

const apiRoutes = require('./routes');
app.use('/', apiRoutes);

app.use(middleWareErrorHandle);

app.listen(PORT, () => {
  console.log('server started visit http://localhost:', PORT);
});