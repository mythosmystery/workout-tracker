const express = require('express');
const mongoose = require('mongoose');
const routes = require('./controllers');
const path = require('path');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
   useNewUrlParser: true,
   useFindAndModify: false,
   useUnifiedTopology: true,
   useCreateIndex: true,
});

app.use(routes);

app.get('/exercise', async (req, res) => {
   res.sendFile(path.join(__dirname, './public/exercise.html'));
});

app.get('/stats', async (req, res) => {
   res.sendFile(path.join(__dirname, './public/stats.html'));
});

app.listen(PORT, () => {
   console.log(`App running on port ${PORT}!`);
});
