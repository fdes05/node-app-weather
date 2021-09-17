const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { response } = require('express')

// make this an express web server app
const app = express()
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views below with app.set()
// This sets the view template engine which we installed with npm i hbs (handlebars)
app.set('view engine', 'hbs')
// Set the path to 'templates' as we are not using the standard 'views' directory name
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve up static html files
// the app.use function replaces the app.get function below to serv up HTML pages
// except when you want to serv JSON from an API then you still use the app.get function
app.use(express.static(publicDirectoryPath))

// first argument is the route ('' means root domain) and second is the function 
// which will do request/respond (req, res)
// app.get('', (req, res) => {
//     res.send()
// })

// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About Page</h1>')
// })

// this is to render dynamic views (opposed to static in the public folder) that need pages like index.hbs
// in the 'views' folder in order for the hbs (handlebars) dynamic templating to work
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is to help you along with this app.',
        title: 'Help Page',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You need to provide an address!'
        })
    }    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }

        forecast(longitude, latitude, (error, forecast) => {
            if(error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast: forecast,
                location: location,
                address: req.query.address
            })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found.',
        title: '404 Error',
        name: 'Andrew Mead'
    })
})

// This is to provide 404 errors for routes that don't exist
app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found.',
        title: '404 Error',
        name: 'Andrew Mead'
    })
})

// To start the Express server you need to do the following below and define the port and callback function
app.listen(3000, () => {
    console.log('server is up on port 3000!')
})