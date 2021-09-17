const request = require('request')

const forecast = (longitude, latitude, callback) => {
    
    const url = "http://api.weatherstack.com/current?access_key=117082b989f9ccb984b09a0823e9a29b&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude) + "&units=m"

    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error) {
            callback('Invalid input. Please provide valid latitude and longitude values', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + " and it feels like " + body.current.feelslike)
        }    
    })
}

module.exports = forecast