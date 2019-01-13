from flask import Flask, render_template, request
import pandas as pd
from chart_app import bokeh_chart

app = Flask(__name__)

# Index page
@app.route('/')
def index():
	id = request.args.get('id')
	print(id)
	# Embed plot into HTML via Flask Render
	script, div = bokeh_chart.make_plot(id)
	return render_template("embed.html", script=script, div=div)

if __name__ == '__main__':
    app.run(debug=True, port=5001)
