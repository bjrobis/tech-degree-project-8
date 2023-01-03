var express = require('express');
var router = express.Router();
const Book = require('../models/book');


/* GET home page. */

router.get('/', function (req, res, next) {
(async () => {
    try {
      const books = await Book.findAll();
      console.log(books.map(book => book.toJSON()));
      //res.render('index', { title: 'Express' });
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message);
        console.error('Validation errors: ', errors);
      } else {
        throw error;
      }
    }
  });
});


module.exports = router;

