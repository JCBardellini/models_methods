const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // adds a bunch of standard security to server
const Book = require('./models/Book.js');
require('dotenv').config();
require('./config/db.js');
const PORT = 3000;


const app = express();


// START MIDDLEWARE //
app.use(express.json());
app.use(cors({
    origin: "*"
}));
app.use(morgan('dev'));
app.use(helmet());
// END MIDDLEWARE //

// START ROUTES //


// find   - finds everything

// .find()
 
app.get("/books", async (req, res) => {
    let response = await Book.find()
    res.send(response)
})

// findOne

app.get("/books/title/:title", async (req, res) => {
    let title = req.params.title
    let response = await Book.findOne({ title: title})
    console.log(response);
    res.send(response)
})

// findById

app.get("/books/id/:bookId", async (req, res) => {
    let bookId = req.params.bookId
    let response = await Book.findById(bookId)
    res.send(response)
})

// create
app.post("/books/singleBook", async (req, res) => {
    let singleBook = req.body.singleBook

    let response = await Book.create(singleBook)
    res.send(response)
})

// insertMany
app.post('/books', async (req, res) => {
    // in the request there should be an array of books objects.
    let books = req.body.books;

    let dbResponse =  await  Book.insertMany(books);
    res.send(dbResponse);
})

// deleteOne


// DeleteMany
app.delete("/books", async (req, res) => {
    let response = await Book.deleteMany({pages: {$gte: 200}} )
    res.send('Books Deleted')
})

// app.delete("/books", async (req, res) => {
//     try {
//         const response = await Book.deleteMany({ pages: { $gt: 250 } });
//         res.send('Books Deleted');
//     } catch (err) {
//         res.status(500).send({ error: "Internal server error" });
//     }
// });


app.delete("/books/:title", async (req, res) => {
    let title = req.params.title
    let response = await Book.deleteOne({title : title});
    res.send("book deleted")
})

app.delete("/books/id/:bookId", async (req, res) => {
    let bookId = req.params.bookId
    let response = await Book.findByIdAndDelete(bookId)
    res.send("book deleted")
})


app.put("/books/updatedBook", async (req, res) => {
    let updatedBook = req.body.updatedBook
    let response = await Book.updateOne({title : updatedBook.title}, updatedBook)
    res.send(response)

})
// END ROUTES //

app.listen(PORT, () => {
    console.log(`Server LIVE on port ${PORT}`);
});


