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
    const books = await Book.findAll();
    console.log(books.map(book => book.toJSON()));
    res.render('index', {books});
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
    res.render('new-book');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});

// /books:id route : updates book info in the database
router.get('/books/:id', async function (req, res, next) {
  try {
    res.render('update-book');
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } else {
      throw error;
    }
  }
});

// POST /books/:id/delete : Deletes a book
router.post('/books/:id/delete', async function (req, res, next) {
  try {
    //code for deleting book
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
  try {
    //CODE for posting new book
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
  try {
    //CODE for updating book
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

