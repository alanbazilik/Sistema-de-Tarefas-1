from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Conexão com o banco de dados
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="sistema_tarefas"
)

@app.route('/tarefas', methods=['GET'])
def listar_tarefas():
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT * FROM tarefas")
    tarefas = cursor.fetchall()
    return jsonify(tarefas)

@app.route('/tarefas', methods=['POST'])
def adicionar_tarefa():
    data = request.json
    cursor = db.cursor()
    query = "INSERT INTO tarefas (titulo, descricao, prioridade) VALUES (%s, %s, %s)"
    cursor.execute(query, (data['titulo'], data['descricao'], data['prioridade']))
    db.commit()
    return jsonify({'message': 'Tarefa adicionada com sucesso!'})

@app.route('/tarefas/<int:id>', methods=['PUT'])
def atualizar_tarefa(id):
    data = request.json
    cursor = db.cursor()
    query = "UPDATE tarefas SET status = %s WHERE id = %s"
    cursor.execute(query, (data['status'], id))
    db.commit()
    return jsonify({'message': 'Tarefa atualizada com sucesso!'})

@app.route('/tarefas/<int:id>', methods=['DELETE'])
def deletar_tarefa(id):
    cursor = db.cursor()
    query = "DELETE FROM tarefas WHERE id = %s"
    cursor.execute(query, (id,))
    db.commit()
    return jsonify({'message': 'Tarefa removida com sucesso!'})

if __name__ == '__main__':
    app.run(debug=True)
