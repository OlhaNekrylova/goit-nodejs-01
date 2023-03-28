const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async ()=> {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

const getContactById = async (id) => {
    const books = await getAll();
    const result = books.find(item => item.id === id);
    return result || null;
}

const addContact = async({title, author}) => {
    const books = await getAll();
    const newBook = {
        id: nanoid(),
        title,
        author,
    };
    books.push(newBook);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return newBook;
}

// const updateById = async (id, data) => {
//     const books = await getAll();
//     const index = books.findIndex(item => item.id === id);
//     if(index === -1){
//         return null;
//     }
//     books[index] = {id, ...data};
//     await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
//     return books[index];
// }

const removeContact = async (id) => {
    const books = await getAll();
    const index = books.findIndex(item => item.id === id);
    if(index === -1){
        return null;
    }
    const [result] = books.splice(index, 1);
    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));
    return result;
}

module.exports = {
    getAll,
    getById,
    add,
    // updateById,
    deleteById,
}