const express = require('express')
const Article = require('../modules/article')

const router = express.Router()

router.get('/new', (req, res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/:slug', async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug })
  if (article == null) {
    res.redirect('/')
    return
  }
  res.render('articles/show', { article: article })
})

router.post('/', async (req, res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
  })
  try {
    article = await article.save()
    res.redirect(`/articles/${article.slug}`)
  } catch (e) {
    res.render('articles/new', { article: article })
  }
})

router.delete('/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

module.exports = router
