var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()

/* GET home page. */
router.get('/',(req, res, next) => {
   //Conects to the database
   let db = new sqlite3.Database('/home/sans/sqlite3/anuario2.db', err => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the main SQLite database')
  })

  //query
  let query = `SELECT ID, Name FROM 'students'`
  let Name, ID
  db.all(query, (err, rows) => {
    if(err){
      return console.error(err.message)
    }
    if(rows){
      let names = ['Saul Chavez Sanchez']
      rows.forEach(i => {
        names.push(i.Name)
      })
      res.render('index', {names: names})
    }
  })

  //Disconect
  db.close(err => {
    if (err){
      return console.error(err.message)
    }
    console.log('Close the database connection')
  })
});

/* GET users listing. */
router.get('/student', function(req, res, next) {
  //Conects to the database
  let db = new sqlite3.Database('/home/sans/sqlite3/anuario2.db', err => {
    if (err) {
      return console.error(err.message)
    }
    console.log('Connected to the main SQLite database')
  })

  //query
  let query = `SELECT * FROM 'students' WHERE ID = ${req.param('id')}`
  let Name, Born, Things
  db.get(query, (err, row) => {
    if (err) {
      return console.error(err.message)
    }
    if (row){
      Name = row.Name
      Born = row.Born
      Things = row.Things
      console.log(Name + Born + Things)
    }
    res.render('student', {
      Name: Name,
      Born: Born,
      Things: Things
    })
  })

  //Disconect
  db.close(err => {
    if (err){
      return console.error(err.message)
    }
    console.log('Close the database connection')
  })
})

module.exports = router;
