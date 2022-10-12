let myLibrary = [];


const libraryDisplay = document.querySelector('.library-display')
const newBookButton = document.querySelector('.new-book-button');
const hidden = document.querySelector('.hidden');
const closeButton = document.querySelector('.close-button');
const addButton = document.querySelector('.add-button');


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}.`;
  }
}


function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}


function displayBooks() {
  libraryDisplay.innerHTML = `
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Read?</th>
  </tr>`

  for (let i = 0; i < myLibrary.length; i++) {
    const newEntry = document.createElement('tr');
    const newEntryTitle = document.createElement('td');
    const newEntryAuthor = document.createElement('td');
    const newEntryPages = document.createElement('td');
    const newEntryRead = document.createElement('td');

    newEntryTitle.textContent = myLibrary[i].title;
    newEntryAuthor.textContent = myLibrary[i].author;
    newEntryPages.textContent = myLibrary[i].pages;
    newEntryRead.textContent = myLibrary[i].read;

    newEntry.appendChild(newEntryTitle);
    newEntry.appendChild(newEntryAuthor);
    newEntry.appendChild(newEntryPages);
    newEntry.appendChild(newEntryRead);
    libraryDisplay.appendChild(newEntry);
  }
}



function getBookFromInput() {
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const pages = document.querySelector('.pages').value;
  const read = document.querySelector('.read').value;

  const currentBook = new Book(title, author, pages, read);

  addBookToLibrary(currentBook);

  displayBooks();
}



function showForm() {
  hidden.style.display = 'flex';
}


function hideForm() {
  hidden.style.display = 'none';
}


newBookButton.addEventListener('click', () => showForm());
closeButton.addEventListener('click', () => hideForm());
addButton.addEventListener('click', () => getBookFromInput());



// =======================================================================



const book1 = new Book('The Man', 'Patrick Post', 1000, 'Not read yet');
const book2 = new Book('How to Excel in Math', 'Sebastian Gonzalez', 387, 'completed');
const book3 = new Book('Designing the Gigafiladextron', 'Marc Allen', 621, 'completed');
const book4 = new Book('The State of Overwatch 2', 'Luis Laca', 420, 'completed');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

displayBooks();