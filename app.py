import os
from flask import Flask, render_template, request, url_for, redirect, jsonify
import jinja2

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    print("HELP ME")
    if request.method == 'POST':
        content = request.json
        print (content)

    data='''
    [
        {
          "id": 1,
          "title": "015260.KS",
          "description": "A&P",
          "url": "#",
          "chartImageUrl": "static/images/products/image-aqua.png"
        },
        {
          "id": 2,
          "title": "078520.KS",
          "description": "ABLE C&C",
          "url": "#",
          "chartImageUrl": "static/images/products/image-rose.png"
        }
    ]'''

    return data

if __name__ == '__main__':
    app.run(debug=True)
