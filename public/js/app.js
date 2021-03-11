console.log('client side JS fileis loaded!');

// fetch('http://puzzle.mead.io/puzzle')
// .then(response => {
//   // parse response JSON data to JS object.
//   response.json()
//   .then(data => {
//     // log parsed response.
//     console.log(data);
//   })
// });


// fetch('http://localhost:3001/weather?address=boston')
// .then(response => {
//   // parse returned json.
//   response.json()
//   .then(data => {
//     if(data.error) {
//       console.log(data.error)
//     } else {
//       console.log(data.location);
//       console.log(data.forecast);
//     }
//   })
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // get input value and assign to variable
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  // Make async request to backend api passing in the location in the dynamic url.
  fetch(`/weather?address=${location}`)
  .then(response => {
    // parse returned json.
    response.json()
    .then(data => {
      if(data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
      } else {
        console.log(data.location);
        console.log(data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
  });
});