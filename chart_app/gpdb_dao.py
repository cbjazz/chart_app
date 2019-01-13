import psycopg2
import pandas as pd
import base64
import json


def gpdb_conn(dbname='cbjazz',
              user='gpadmin',
              password='changeme',
              host='mdw',
              port=5432):

    connstring = "dbname='{dbname}' \
        user='{user}' \
        password='{password}' \
        host='{host}' port={port}".format(
        dbname=dbname, user=user, host=host,  password=password, port=port)
    conn = psycopg2.connect(connstring)
    return conn

def gpdb_disconn(conn):
    conn.close()

def detail(chart_id):
    dataList = []
    searchQuery = """
        SELECT string_agg(s_close::text, ',' order by s_date) Y,
        	string_agg((s_date - '2017-01-01'::date)::text, ',' order by s_date) X,
        	string_agg(code, ',' order by s_date) legend
        FROM stock.price
        WHERE code = '{}'
        """

    searchQuery = searchQuery.format(chart_id)

    conn = gpdb_conn()
    cur = conn.cursor()
    cur.execute(searchQuery)
    rows = cur.fetchall()

    for row in rows:
        data = {}
        data['X'] = row[1]
        data['Y'] = row[0]
        data['legend'] = row[2]
        dataList.append(data)

    cur.close()
    gpdb_disconn(conn)

    return dataList

def search(search):
    chartList = []
    searchQuery = """
        SELECT id,
            gptext.gptext_retrieve_field(rf, 'code') code,
            gptext.gptext_retrieve_field(rf, 'name') name,
            gptext.gptext_retrieve_field(rf, 'ko_name') ko_name,
            gptext.gptext_retrieve_field(rf, 'tag') tag,
            gptext.gptext_retrieve_field(rf, 'chart') chart
        FROM gptext.search(TABLE(SELECT 1 SCATTER BY 1),
              'cbjazz.stock.chart_index_v2', '{}', null,
              'fl=code,chart,name,ko_name,tag')
    """
    searchQuery = searchQuery.format(search)

    conn = gpdb_conn()
    cur = conn.cursor()
    cur.execute(searchQuery)
    rows = cur.fetchall()
    for row in rows:
        chart = {}
        chart['id'] = row[0]
        chart['code'] = row[1]
        chart['name'] = row[2]
        chart['ko_name'] = row[3]
        chart['tag'] = row[4]
        chart['chart'] = row[5]
        chartList.append(chart)

    cur.close()
    gpdb_disconn(conn)
    return chartList


if __name__ == '__main__':
    print(search("001940"))
