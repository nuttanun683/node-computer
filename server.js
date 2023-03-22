const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6303231',
  password: '6303231',
  database: 'u6303231',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})

app.get('/customer', function(req, res) {
  connection.query(
    'SELECT * FROM a1_customer',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

app.get('/order', function(req, res) {
    connection.query(
      'SELECT * FROM a1_order',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })

  app.get('/product', function(req, res) {
    connection.query(
      'SELECT * FROM a1_product',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })
  app.get('/top_product', function(req, res) {
    connection.query(
      `SELECT p.productId, SUM(o.quantity) AS top_products
      FROM a1_product p 
      LEFT JOIN a1_order o
      ON o.orderId = p.productId
      GROUP BY p.productId  
      ORDER BY top_products  DESC;`,
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })
  app.get('/top_customer', function(req, res) {
    connection.query(
      `SELECT p.productId, SUM(p.price) AS priceSum FROM a1_product p LEFT JOIN a1_order o ON o.orderId = p.productId GROUP BY p.productId;`,
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })
  app.get('/product_price', function (req, res) {
    connection.query(
        `SELECT id, productName, price
       FROM pet
       ORDER BY price;`,
        function (err, results) {
            res.json(results)
        }
    )
})//
app.post('/order', function(req, res) {
  const values = req.body
  console.log(values)
  connection.query(
    'INSERT INTO a1_order (orderid, customerid, productid, quantity) VALUES ?', [values],
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})


app.listen(5000, () => {
  console.log('Server is started.')
})
