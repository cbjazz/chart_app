import os
from flask import Flask, render_template, request, url_for, redirect, jsonify
import jinja2
import chart_app

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    if request.method == 'POST':
        content = request.json
        query = content['searchQuery']
        data = chart_app.gpdb_dao.search(query)

    return data

if __name__ == '__main__':
    app.run(debug=True)
