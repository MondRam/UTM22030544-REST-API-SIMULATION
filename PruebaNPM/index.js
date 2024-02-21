
import { readJson, updateJson } from "./fileUtils.js";

const sendReponse =(code, body = null) => {
    const response = {
      code,
      body,
    };
  
    switch (code) {
      case 200:
        response.msg = "Ok";
        break;
      case 201:
        response.msg = "Done";
        break;
      case 301:
        response.msg = "Moved";
        break;
      case 400:
        response.msg = "Endpoint not valid";
        break;
      case 404:
        response.msg = "Not found";
        break;
      case 500:
        response.msg = "Internal Server Error";
        break;
      default:
        response.msg = "Unknown status code";
    }
  
    return response;
  };




const updateBookTitle = (isbn, title) => {
  try {
    const books = readJson("books-copy.json");
    let updatedBook;
    const newBooks = books.map((book) => {
      if (book.ISBN === isbn) {
        updatedBook = { ...book, title };
        return updatedBook;
      }

      return book;
    });

    updateJson("books-copy.json", newBooks);
    return updatedBook;
  } catch (error) {
    console.error(error);
  }
};



//takes one book title OR ISBN and return it if exists.
const getBook = (titleOrISBN) => {
  try {
    const books = readJson("books-copy.json");
    const book = books.find((book) => book.title === titleOrISBN || book.ISBN === titleOrISBN);
    if (book) {
        return sendReponse(200, book);
    } 
    if(!titleOrISBN) {
        return sendReponse(400);
    }
    return sendReponse(404);
    
  } catch (error) {
    return sendReponse(500, error);
  }
};


//Return all exisisitng books
const getBooks = (arrayName) => {
    try {
        const books = readJson("books-copy.json");
        if (arrayName === "books") {
            return sendReponse(200, books);
        }
        if(!arrayName) {
            return sendReponse(400);
        }
        return sendReponse(404);
        
    } catch (error) {
        return sendReponse(500, error);
    }
};


//adds a new book to the books array and return the book created, and the new array, including the new book.
const addBook = (title, ISBN, year, genre, author, stock, publisher) => {
    const books = readJson("books-copy.json");
    const newBook = {
        "title": title,
        "ISBN": ISBN,
        "year": year,
        "genre": genre,
        "author": author,
        "stock": stock,
        "publisher": publisher,
    };
    try {
        if (title, ISBN, year, genre, author, stock, publisher) {
            const newBooks = [...books, newBook];
            updateJson("books-copy.json", newBooks);
            return sendReponse(201, newBooks);
        }
        return sendReponse(400);
    
    } catch (error) {
        return sendReponse(500, error);
    }
};


// //takes a title OR ISBN and, if found, removes the element from the array, it returns the deleted element and the new array.
const removeBookByTitleOrISBN = (titleOrISBN) => {
    const books = readJson("books-copy.json");
    const book = books.find((book) => book.title === titleOrISBN || book.ISBN === titleOrISBN);
    try {
        if(book){
            const bookIndex = books.indexOf(book);
            const removedBook = books.splice(bookIndex, 1);
            updateJson("books-copy.json", books);
            return sendReponse(201, books);
        }
        if(!titleOrISBN) {
            return sendReponse(400);
        }
        return sendReponse(404);
    }catch (error) {
        return sendReponse(500, error);
    }
 };



// // the first param will be the filtering property (genre, author, or publisher), the second will be the string that is being searched. You must return all books that match the condition.
const filterBy = (property, search) => {
    try{
        const books = readJson("books-copy.json");
        if (property && search){
            if (property === "genre"){
                let filter = books.filter(book => book.genre === search);
                return sendReponse(200, filter);
            } else if (property === "author"){
                let filter = books.filter(book => book.author === search);
                return sendReponse(200, filter);
            } else if (property === "publisher"){
                let filter = books.filter(book => book.publisher === search);
                return sendReponse(200, filter);
            }

        }

        if(!property || !search) {
             return sendReponse(400);
        }
        return sendReponse(404);

    }catch (error) {
        return sendReponse(500, error);
    }
};


//return a list of all the books in the next format: Title - Author - Year.
const listBooks = (arrayName) => {
    try {
        const books = readJson("books-copy.json");
        if (arrayName === "books"){
            return sendReponse(200, books.map (book => book.title + " - " + book.author + " - " + book.year).join(", "));
        }
        if(!arrayName) {
            return sendReponse(400);
        }
        return sendReponse(404);
        
    }catch (error) {
        return sendReponse(500, error);
    }
};


//return all books for a given year.
const getBooksByYear = (year) => {
    try{
        const books = readJson("books-copy.json");
        
        if(year){
            const intYear = parseInt(year);
            const filter = books.filter(book => book.year === intYear);
            return sendReponse(200, filter);
        }
        if(!year) {
            return sendReponse(400);
        }
        return sendReponse(404);
    }catch (error) {
        return sendReponse(500, error);
    }
};


//return true or false if all books from a given genre have stock available.
const genreFullAvailability = (genre) => {
    const books = readJson("books-copy.json");
    const booksGenre = books.find((book) => book.genre === genre);
    try{
        if (booksGenre !== undefined){
            let filter = books.filter(book => book.genre === genre);
            let stock = filter.every((book) => book.stock > 0);
            return sendReponse(200, stock);
        }
        if(!genre) {
            return sendReponse(400);
        }
        if (booksGenre == undefined){
            return sendReponse(404);
        }
    
    }catch (error) {
        return sendReponse(500, error);
    }
};


//return true or false if at least ONE book from a given genre has stock availability.
const genrePartialAvailability = (genre) =>{
    const books = readJson("books-copy.json");
    const booksGenre = books.find((book) => book.genre === genre);
    try{
        if (booksGenre !== undefined){
            let filter = books.filter(book => book.genre === genre);
            let stock = filter.some((book) => book.stock > 0);
            return sendReponse(200, stock);
        }
        if(!genre) {
            return sendReponse(400);
        }
        if (booksGenre == undefined){
            return sendReponse(404);
        }
    
    }catch (error) {
        return sendReponse(500, error);
    }
};


//the first param will be the counting property (genre, author, or publisher),
// you must return a new object with the name of the property that you are counting and
// the counter.
const getCountBy = (property) =>{
    try{
        const books = readJson("books-copy.json");
        if (property){
            if (property === "Genre"){
                let counter = books.reduce((acc, book) => {
                    acc[book.genre] = (acc[book.genre] || 0) + 1;
                    return acc;
                }, {});
                return sendReponse(200, counter);
            } else if (property === "Author"){
                let counter = books.reduce((acc, book) => {
                    acc[book.author] = (acc[book.author] || 0) + 1;
                    return acc;
                }, {});
                return sendReponse(200, counter);
            } else if (property === "Publisher"){
                let counter = books.reduce((acc, book) => {
                    acc[book.publisher] = (acc[book.publisher] || 0) + 1;
                    return acc;
                }, {});
                return sendReponse(200, counter);
            }
        }
        if(!property) {
            return sendReponse(400);
        }
        return sendReponse(404);
    }catch (error) {
        return sendReponse(500, error);
    }

};


function main() {
  const args = process.argv.slice(2);

  const endpoint = args[0];

  switch (endpoint) {
    case "updateBookTitle":
      const isbn = args[1];
      const newtitle = args[2];
      console.log(updateBookTitle(isbn, newtitle));
      break;
    case "getBook":
      const titleOrISBN = args[1];
      console.log(getBook(titleOrISBN));
      break;
    case "getBooks":
      const arrayName = args[1];
      console.log(getBooks(arrayName));
      break;
    case "addBook":
      const addBooktitle = args[1];
      const addBookISBN = args[2];
      const addBookyear = args[3];
      const addBookgenre = args[4];
      const addBookauthor = args[5];
      const addBookstock = args[6];
      const addBookpublisher = args[7];
      console.log(addBook(addBooktitle, addBookISBN, addBookyear, addBookgenre, addBookauthor, addBookstock, addBookpublisher));
      break;
    case "removeBookByTitleOrISBN":
        const titleOrISBNr = args[1];
        console.log(removeBookByTitleOrISBN(titleOrISBNr));
        break;
    case "filterBy":
        const filterByProperty = args[1];
        const filterBySearch = args[2];
        console.log(filterBy(filterByProperty, filterBySearch));
        break;
    case "listBooks":
        const listBooksArray = args[1];
        console.log(listBooks(listBooksArray));
        break;
    case "getBooksByYear":
        const year = args[1];
        console.log(getBooksByYear(year));
        break;
    case "genreFullAvailability":  
        const genre = args[1];
        console.log(genreFullAvailability(genre));
        break;
    case "genrePartialAvailability":
        const genrePartial = args[1];
        console.log(genrePartialAvailability(genrePartial));
        break;
    case "getCountBy":
        const getCountByProperty = args[1];
        console.log(getCountBy(getCountByProperty));
        break;
    default:
      console.log("Endpoint no válido");
  }
}

main();