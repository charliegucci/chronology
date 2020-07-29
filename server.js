const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();

//connect to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB Connection Error: ', err));

//import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const wbsRoutes = require('./routes/wbs');
const timesheetRoutes = require('./routes/timesheet');

// app middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(cors())
app.use(cors());

//middlewares
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', wbsRoutes);
app.use('/api', timesheetRoutes);

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`API is running at port ${port}`);
});



