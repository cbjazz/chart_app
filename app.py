from flask import Flask, Response, jsonify, render_template
from flask_restful import Resource, Api
from flask_restful import reqparse
from flask_cors import CORS
import chart_app

app = Flask(__name__)
cors = CORS(app, resource={r"/*":{"orgins":"*"}})
api = Api(app)


class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

class Search(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('searchQuery', type=str)
        args = parser.parse_args()

        query = args['searchQuery']
        data = chart_app.gpdb_dao.search(query)
        return jsonify(data)

api.add_resource(Search, '/search')
api.add_resource(HelloWorld, '/')

if __name__ == '__main__':
    app.run(debug=True)
