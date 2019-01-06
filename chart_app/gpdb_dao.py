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

def search(search):
    searchQuery = """
        SELECT (row_to_json(a))::text result
        FROM (
            SELECT id,
                gptext.gptext_retrieve_field(rf, 'code') code,
                gptext.gptext_retrieve_field(rf, 'chart') chart
            FROM gptext.search(TABLE(SELECT 1 SCATTER BY 1),
                  'cbjazz.stock.chart_index', '{}', null, 'fl=code,chart')
        ) as a;
    """
    searchQuery = searchQuery.format(search)

    conn = gpdb_conn()
    cur = conn.cursor()
    cur.execute(searchQuery)
    rows = cur.fetchall()
    result = [row[0] for row in rows]
    cur.close()
    gpdb_disconn(conn)
    return '[' + ','.join(result) + ']'


if __name__ == '__main__':
    print(search("001940"))
