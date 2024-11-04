from flask import Flask, request, jsonify
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)

# Função para conectar ao banco de dados MySQL
def connect_db():
    try:
        connection = mysql.connector.connect(
            host='localhost',
            database='sorveteria',
            user='root',
            password='nova_senha'
        )
        if connection.is_connected():
            return connection
    except Error as e:
        print(f"Erro ao conectar ao MySQL: {e}")
        return None

# Inicializando o banco de dados com uma tabela simples de pedidos (caso não exista)
def init_db():
    conn = connect_db()
    if conn is not None:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS orders (
                id INT AUTO_INCREMENT PRIMARY KEY,
                items TEXT NOT NULL,
                total DECIMAL(10, 2) NOT NULL
            )
        ''')
        conn.commit()
        cursor.close()
        conn.close()
    else:
        print("Não foi possível conectar ao banco de dados para inicializar.")

# Endpoint para processar o checkout e salvar os pedidos no banco de dados
@app.route('/checkout', methods=['POST'])
def checkout():
    try:
        data = request.get_json()  
        items = ', '.join([item['name'] for item in data['cartItems']]) 
        total = data['totalPrice']

        conn = connect_db()
        if conn is not None:
            cursor = conn.cursor()
            cursor.execute("INSERT INTO orders (items, total) VALUES (%s, %s)", (items, total))
            conn.commit()
            order_id = cursor.lastrowid  
            cursor.close()
            conn.close()

            # Retorna o ID do pedido como resposta
            return jsonify({'orderId': order_id}), 201
        else:
            return jsonify({'error': 'Erro ao conectar ao banco de dados'}), 500
    except Error as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_db()  # Inicializa o banco de dados na primeira execução
    app.run(debug=True)
