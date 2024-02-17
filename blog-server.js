const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const logger = require('./modules/logger')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost:27017/ikvarxt-blog', {})

const app = express();
const server = http.createServer(app);

app.use(logger);
app.use(express.urlencoded({ extended: false }))
app.use('/articles', articleRouter)

app.set('view engine', 'ejs')

// define the routes
app.get('/', (req, res) => {
  const articles = [
    {
    title: "hello my first blog post",
    description: "some desc",
    date: new Date(),
    },
    {
      title: "hello my second blog post",
      description: "some desc",
      date: new Date(),
    }
  ]
  res.render('articles/', { articles: articles })
})
app.get('/about', (req, res) => {
  res.send('<h1>Hello, this is my about Page</h1>')
})

server.listen(3000);

console.log('My node.js web server is alive and running at port 3000')
