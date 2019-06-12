var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose()

/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
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
  })

  //Disconect
  db.close(err => {
    if (err){
      return console.error(err.message)
    }
    console.log('Close the database connection')
  })

  //render
  res.render('student', {
    Name: Name,
    Born: Born,
  })
})

module.exports = router;
