console.log('client side javascript file is loaded!')

// This is the example from Andrew
// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const searchItem = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchItem.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    // Do a fetch api call to get data from our own Weather endpoint
    // removed the 'http://localhost:3000' part of the URL as this way it will work for local or if we
    // use the weather app on Heroku that we uploaded
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        })
    })
})