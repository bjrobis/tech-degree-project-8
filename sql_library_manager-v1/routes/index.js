var express = require('express');
var router = express.Router();
const {Book} = require('../models/');


/* GET home page. */

router.get('/', async function (req, res, next) {
  try {
    res.redirect('/books');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});

//Books Route: shows full list of books
router.get('/books', async function (req, res, next) {
  try {
    const books = await Book.findAll({order: [["title", "ASC"]]});
    console.log(books.map(book => book.toJSON()));
    res.render('index', {books, title: "List of Books"});
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});

// books/new route: Shows the create new book form
router.get('/books/new', async function (req, res, next) {
  try {
    res.render('new-book', {book: {}, title: "New Book"});
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});


//POST /books/new: posta a book to the database
router.post('/books/new', async function (req, res, next) {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect("/");
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id; 
      res.render('new-book', {book, errors: error.errors});
      console.error('Validation errors: ', error);
    } else {
      throw error;
    }
  }
});


//Renders page to update book in the database
router.get('/books/:id', async function (req, res, next) {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.render('update-book', {book});
    } else {
      let error = new Error();
      error.status = 404;
      error.message = "Page not found!";
      next();
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});

//POST /books/new: update a book in the database
router.post('/books/:id', async function (req, res, next) {
  let book;
  try {
    book = await Book.findByPk(req.params.id);
    if(book) {
      await book.update(req.body);
      res.redirect('/books/');
    } else {
      throw new Error();
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      book = await Book.build(req.body);
      book.id = req.params.id ;
      res.render('update-book', {book, errors: error.errors});
      console.error('Validation errors: ', error);
    } else {
      throw error;
    }
  }
});


// POST /books/:id/delete : Deletes a book
router.post('/books/:id/delete', async function (req, res, next) {
  try {
    const book = await Book.findByPk(req.params.id);
    if(book) {
      await book.destroy();
      res.redirect("/");
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});

module.exports = router;

