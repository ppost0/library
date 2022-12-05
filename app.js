let myLibrary = [];


const libraryDisplay = document.querySelector('.library-display')
const newBookButton = document.querySelector('.new-book-button');
const hidden = document.querySelector('.hidden');
const closeButton = document.querySelector('.close-button');
const addButton = document.querySelector('.add-button');


class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`;
  };

  toggleStatus() {
    if (this.read === 'Completed') {
      this.read = 'Not read yet';
    } else {
      this.read = 'Completed';
    }
    displayBooks();
  }

}


function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

function removeEntry(e) {
  let current = e.target;
  let parentEntry = current.parentNode;
  let grandparentEntry = parentEntry.parentNode;

  myLibrary = myLibrary.filter(function(value) {
    return value.title !== grandparentEntry.firstChild.textContent;
  })

  grandparentEntry.remove();
}


function linkBook(e) {
  let current = e.target;
  let parent = current.parentNode;
  let grandparent = parent.parentNode;
  let greatgrandparent = grandparent.parentNode;
  myLibrary[greatgrandparent.dataset.n].toggleStatus();
}



function displayBooks() {
  libraryDisplay.innerHTML = `
  <tr>
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Read?</th>
    <th></th>
  </tr>`

  for (let i = 0; i < myLibrary.length; i++) {
    const newEntry = document.createElement('tr');
    newEntry.dataset.n = document.querySelector('.library-display').childNodes.length - 2;
    const newEntryTitle = document.createElement('td');
    const newEntryAuthor = document.createElement('td');
    const newEntryPages = document.createElement('td');
    const newEntryRead = document.createElement('td');
    const buttonArea = document.createElement('td')
    const removeButton = document.createElement('button');
    const toggleButton = document.createElement('button');
    const box = document.createElement('div');

    newEntryTitle.textContent = myLibrary[i].title;
    newEntryAuthor.textContent = myLibrary[i].author;
    newEntryPages.textContent = myLibrary[i].pages;
    newEntryRead.textContent = myLibrary[i].read;
    removeButton.textContent = "Remove";
    removeButton.classList.add("removeBtns");
    toggleButton.classList.add("toggleBtns");
    toggleButton.textContent = "Change progress";

    removeButton.addEventListener('click', (e) => removeEntry(e));
    toggleButton.addEventListener('click', (e) => linkBook(e));

    newEntry.appendChild(newEntryTitle);
    newEntry.appendChild(newEntryAuthor);
    newEntry.appendChild(newEntryPages);
    box.appendChild(toggleButton)
    newEntryRead.appendChild(box);
    newEntry.appendChild(newEntryRead);
    newEntry.appendChild(buttonArea);
    buttonArea.appendChild(removeButton);
    libraryDisplay.appendChild(newEntry);
  }
}



function getBookFromInput() {
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  const pages = document.querySelector('.pages').value;
  const read = document.querySelector('.read').value;

  const currentBook = new Book(title, author, pages, read);

  if (title.length > 0) {
    addBookToLibrary(currentBook);
  };

  displayBooks();
}



function showForm() {
  hidden.style.display = 'flex';
}


function hideForm() {
  hidden.style.display = 'none';
  const form = document.querySelector('.form')
  form.reset();
}


newBookButton.addEventListener('click', () => showForm());
closeButton.addEventListener('click', () => hideForm());
addButton.addEventListener('click', () => getBookFromInput());



// =======================================================================



const book1 = new Book('The Man', 'Patrick Post', 1000, 'Not read yet');
const book2 = new Book('How to Excel in Math', 'Sebastian Gonzalez', 387, 'Completed');
const book3 = new Book('Designing the Gigafiladextron', 'Marc Allen', 621, 'Completed');
const book4 = new Book('The State of Overwatch 2', 'Luis Laca', 420, 'Completed');

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

displayBooks();