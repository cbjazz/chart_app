import json

from bokeh.layouts import gridplot
from bokeh.plotting import figure, show, output_file
from bokeh.resources import CDN
from bokeh.sampledata.iris import flowers
from bokeh.embed import components
from chart_app import gpdb_dao

import numpy as np

def make_plot(id):

    p = figure(title = id, plot_width=780, plot_height=430)
    data = gpdb_dao.detail(id);
    for c in data:
        x_val = np.array(c['X'].split(',')).astype(float)
        y_val = np.array(c['Y'].split(',')).astype(float)
        legend = c['legend'].split(',')
        p.circle(x_val, y_val, fill_alpha=0.2, size=4)

    return components(p)

if __name__ == '__main__':
    make_plot()
