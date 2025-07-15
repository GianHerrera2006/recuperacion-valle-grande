from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)

# Configuración RDS
app.config['MYSQL_HOST'] = 'database-3.cax2z7f5zzws.us-east-1.rds.amazonaws.com'
app.config['MYSQL_USER'] = 'admin'
app.config['MYSQL_PASSWORD'] = '6082228gian9'
app.config['MYSQL_DB'] = 'bycint'
app.config['MYSQL_PORT'] = 3306

mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        nombre = request.form.get('nombre')
        apellido = request.form.get('apellido')
        direccion = request.form.get('direccion')
        email = request.form.get('email')
        try:
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO registros (nombre, apellido, direccion, email) VALUES (%s, %s, %s, %s)",
                        (nombre, apellido, direccion, email))
            mysql.connection.commit()
            cur.close()
        except Exception as e:
            print('Error al insertar registro:', e)
        return redirect(url_for('index'))

    registros = []
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT nombre, apellido, direccion, email FROM registros")
        registros = [
            {'nombre': row[0], 'apellido': row[1], 'direccion': row[2], 'email': row[3]}
            for row in cur.fetchall()
        ]
        cur.close()
    except Exception as e:
        print('Error al consultar registros:', e)

    return render_template('formulario.html', registros=registros)

if __name__ == '__main__':
    app.run(debug=True)
