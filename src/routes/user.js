const 
  user = require('../models/user')

module.exports = (app) => {

  app.get('/users', (req, res) => {
    user.getUsers((err, data) => {
       res.json(data)
    })
  })

  app.post('/users', (req, res) => {
    let userData = {
      id_relation: null,
      email_linker: req.body.email_linker,
      email_child: req.body.email_child,
      name_child: req.body.name_child,
      surname_child: req.body.surname_child
    }
    user.insertUser(userData, (err, data) => {
      if (data && data.insertId) {
        res.json({
          success: true,
          message: 'Usuario Insertado',
          data: data
        })
      }
    })
  })

  app.put('/users/:id', (req, res) => {
    const userData = {
      id_relation: req.params.id,
      email_linker: req.body.email_linker,
      email_child: req.body.email_child,
      name_child: req.body.name_child,
      surname_child: req.body.surname_child
    }
    user.updateUser(userData, (err, data) => {
      if(data, data.message) {
        res.json(data)
      } else {
        res.json({
          success: false,
          message: 'error'
        })
      }
    })
  })

  app.delete('/users/:id', (req, res) => {
    user.deleteUser(req.params.id, (err, data) => {
      if (data && data.message === 'Eliminado' || data.message === 'El registro no existe') {
        res.json({
          success: true,
          data
        })
      } else {
        res.status(500).json({
          message: 'Error'
        })
      }
    })
  })
}