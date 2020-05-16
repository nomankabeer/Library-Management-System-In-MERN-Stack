var BookModel = require('../models/Books')
var escapeRegex = require('../scripts/RegexEscape')

exports.getBooks = async (req, res , next) => {
  // res.json('getbooks').status(200).end()
const resPerPage = 10; // results per page
const page = req.params.book_id || 1; // Page try 
var searchQuery = null
if( req.query.search != null){
   regex = new RegExp(escapeRegex(req.query.search), 'gi');
   searchQuery = {name: regex}
  }
  var booksData = await BookModel.find(searchQuery)
      .populate('user' , 'username')
      .populate('rack' , 'name')
      .select(['name' , 'description' , 'created_at'])
      .sort({created_at: 'desc'})
      .skip((resPerPage * page) - resPerPage)
      .limit(resPerPage);
const numOfProducts = await BookModel.count({name: regex});

var message;
if(numOfProducts == 0){
  message =  "Books not Found"
}
else{
  message ="Books Found"
}

let getbooks = {
   books: booksData, 
   currentPage: page, 
   pages: Math.ceil(numOfProducts / resPerPage), 
   searchVal: req.query.search, 
   numOfResults: numOfProducts,
   message: message
  };
 res.json(getbooks).status(200).end()
};


exports.createBook = async (req, res , next) => {
  var bookData = {
    user: req.user._id ,
    name: req.body.name,
    rack: req.body.rack,
    description: req.body.description,
  }
  BookModel.create(bookData, function (err, book) {
    if(err){   
      res.json(err)
    }
    else {
      message ="Book created Sucessfully"
      res.json({book , message}).status(200).end()
    }
  })
};

exports.deleteBook = async (req, res , next) => {
  var bookData = {
    _id: req.params.book_id
  }
  BookModel.findOneAndDelete(bookData, function (err, book) {
    if(book == null){
      res.json({'message' : "Book not Found"})
    }
    else if(err){   
      res.json(err)
    }
    else {
      message ="Book Deleted Sucessfully"
      res.json({book , message}).status(200).end()
    }
  })
};


exports.updateBook = async (req, res , next) => {
  var bookId = {
    _id: req.params.book_id
  }
  var bookData = {
    name: req.body.name,
    rack: req.body.rack,
    description: req.body.description,
  }
  await BookModel.findOneAndUpdate(bookId, bookData , function (err, book) {
    if(book == null){
      res.json({'message' : "Book not Found"})
    }
    else if(err){   
      res.json(err)
    }
    else {
      message ="Book Updated Sucessfully"
      res.json({book , message}).status(200).end()
    }
  })
};

