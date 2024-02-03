const http = require('http')
const express = require('express')
const logger = require('./modules/logger')
const articleRouter = require('./routes/articles')

const app = express();
const server = http.createServer(app);

app.use(logger);
app.use('/articles', articleRouter)

app.set('view engine', 'ejs')

// define the routes
app.get('/', (req, res) => {
    const articles = [{
        title: "hello",
        description: "some desc",
        date: "2000//2/2"
    }]
    res.render('index', { carticles: articles })
})
app.get('/about', (req, res) => {
    res.send('<h1>Hello, this is my about Page</h1>')
})

server.listen(3000);

console.log('My node.js web server is alive and running at port 3000')