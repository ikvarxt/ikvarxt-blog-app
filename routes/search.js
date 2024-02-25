const express = require('express')
const Article = require('../modules/article')

const router = express.Router()

router.route('/')
  .get(async (req, res) => {
    res.render('search/', { articles: [], search: "" })
  })
  .post(async (req, res) => {
    const query = req.body.query
    if (!query) {
      res.send("error undefined query, body is " + JSON.stringify(req.body))
      return
    }
    const finded = await Article.find({ $text: { $search: query, $caseSensitive: false } })
    res.render('search/', { articles: finded, search: query })
  })

// router.post('/', async (req, res) => {
//   let article = new Article({
//     title: req.body.title,
//     description: req.body.description,
//     markdown: req.body.markdown
//   })
//   try {
//     article = await article.save()
//     res.redirect(`/articles/${article.slug}`)
//   } catch (e) {
//     res.render('articles/new', { article: article })
//   }
// })

// router.delete('/:id', async (req, res) => {
//   await Article.findByIdAndDelete(req.params.id)
//   res.redirect('/')
// })

module.exports = router
