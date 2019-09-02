// Book Class - repesents a book, instantiates a new book 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class - handles UI Tasks, displays, removes 
class UI {
    static displayBooks() {
        const books = [
            {
                title: `You don't know JavaScript`,
                author: `Kyle Simpson`,
                isbn: `343`
            },
            {
                title: `Clean Code`,
                author: `Bob Martin`,
                isbn: `757`
            },
            {
                title: `Rethinking Reactivity`,
                author: `Rich Harris`,
                isbn: `989`
            }
        ];

        books.forEach(book => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete text-danger btn btn-lg p-0">&#10008;</a></td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(elem) {
        if (elem.classList.contains('delete')) {
            elem.parentElement.parentElement.remove();
        }
    }

    static showAlert(msg, className) {
        const alertElem = document.createElement('div');

        alertElem.className = `alert alert-${className}`;
        alertElem.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');

        container.insertBefore(alertElem, form.nextSibling);

        // to remove the alert message 
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
}

// Event: Display Books - shows books in the list
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', e => {
    e.preventDefault();

    // getting form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // validate inputs
    if (title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill out all fiels!', 'danger');
    }
    else {
        // instantiating a book
        const book = new Book(title, author, isbn);

        // Add book to UI
        UI.addBookToList(book);

        // show success msg
        UI.showAlert('Book added successfully!', 'success');

        // Clear input fields method
        UI.clearFields();
    }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', e => {
    UI.deleteBook(e.target);

    // show success msg
    UI.showAlert('Book removed from list!', 'warning');
});