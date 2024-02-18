const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const logger = require('./modules/logger')
const Article = require('./modules/article')
const articleRouter = require('./routes/articles')

mongoose.connect('mongodb://localhost:27017/ikvarxt-blog', {})

const app = express();
const server = http.createServer(app);

app.use(logger);
app.use(express.urlencoded({ extended: false }))
// use method override to prefrom delete or put action through post potocol
app.use(methodOverride('_method'))
app.use('/articles', articleRouter)

app.set('view engine', 'ejs')

// define the routes
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc'})
  res.render('articles/', { articles: articles })
})

app.get('/about', (req, res) => {
  res.send('<h1>Hello, this is my about Page</h1>')
})

server.listen(3000);

console.log('My node.js web server is alive and running at port 3000')
