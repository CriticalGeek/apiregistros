const
  mysql = require('mysql'),
  
connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'apiregistros'
})

let userModel = {}

userModel.getUsers = (callback) => {
  if(connection) {
    connection.query(
      'SELECT * FROM users ORDER BY id_relation',
      (err, rows) => {
        if (err) {
          throw err
        } else {
          callback(null, rows)
        }
      }
    )
  }
}

userModel.insertUser = (userData, callback) => {
  if (connection) {
    connection.query(
      'INSERT INTO users SET ?', userData,
      (err, rows) => {
        if (err) {
          throw err
        } else {
          callback(null, {
            'insertId': rows.insertId
          })
        }
      }
    )
  }
}

userModel.updateUser = (userData, callback) => {
  if (connection) {
    let sql = `
      UPDATE 
        users SET 
          email_linker = ${connection.escape(userData.email_linker)},
          email_child = ${connection.escape(userData.email_child)},
          name_child = ${connection.escape(userData.name_child)},
          surname_child = ${connection.escape(userData.surname_child)}
        WHERE id_relation = ${connection.escape(userData.id_relation)}
      `
    connection.query(sql, (err, res) => {
      if (err) {
        throw err
      } else {
        callback(null, {
          'message': `Actualizado`
        })
      }
    })
  }
}

userModel.deleteUser = (id, callback) => {
  if (connection) {
    let sql = `
      SELECT * FROM users WHERE id_relation = ${connection.escape(id)}
    `
    connection.query(sql, (err, row) => {
      if (row) {
        let sql = `DELETE FROM users WHERE id_relation = ${connection.escape(id)}`
        connection.query(sql, (err, res) => {
          if (err) {
            throw err
          } else {
            callback(null, {
              'message': `Eliminado`
            })
          }
        })
      } else {
        callback(null, {
          'message': `El registro no existe`
        })
      }
    })
  }
}

module.exports = userModel