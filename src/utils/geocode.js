const request = require('request')

const geocode = (address, callback) => {
    const urlMapBox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZmRlcyIsImEiOiJja3RiejN2NTMyMHdiMm9sYWRzOHkxMzk2In0.-lObvzKv-7DqeRf8mnTpQw&limit=1"

    request({ url: urlMapBox, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to map service!', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Please provide another location!', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })            
        }    
    })
}

module.exports = geocode