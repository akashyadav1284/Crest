fetch('http://localhost:5000/api/domains')
    .then(res => res.text())
    .then(text => console.log('STATUS:', text.substring(0, 100)))
    .catch(err => console.error(err));
