const path = require('path');
const express = require('express');
const hbs = require('hbs');

// import geocode and forecast functions.
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
console.log(path.join(__dirname, '../public'));

const app = express();

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);



// Serve up directory.
app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Marius De Allie'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Marius De Allie'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'You have come to the right place for help.',
    name: 'Marius De Allie'
  });
});

// Weather route.
app.get('/weather', (req, res) => {
  // console.log(req.query);
  // if requets url has no address query tring
  if(!req.query.address) {
    return res.send({
      error: 'You must provide an address!'
    });
  }

  geocode(req.query.address, (error, { lat, long, location } = {}) => {
    if(error) {
      return res.send({ error });
    }
    forecast(lat, long, (error, forecastData) => {
      if(error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help 404',
    errorMessage: 'Help article not found',
    name: 'Marius De Allie'
  });

});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Marius De Allie'
  })
})

// Start the web server using listen method.

app.listen(3001, () => {
  console.log('server running on port 3001');
});