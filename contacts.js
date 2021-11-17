const shortid = require('shortid');
const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('db/contacts.json');

async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        return JSON.parse(contacts);
    } catch(error) {
        console.error(error);
    }
};

async function getContactById(contactId) {
    try {
        const data = await listContacts();
        const foundContact = data.find(contact => contact.id === Number(contactId));
        return foundContact;
    } catch(error) {
        console.error(error);
    }
};

async function removeContact(contactId) {
    try {
        const data = await listContacts();
        const filteredContacts = data.filter(contact => contact.id !== Number(contactId));
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
        return filteredContacts;
    } catch (error) {
        console.error(error);
  }
};

async function addContact(name, email, phone) {
    const newContact = {
          id: shortid.generate(),
          name,
          email,
          phone
      };
  try {
      const contacts = await fs.readFile(contactsPath);
      const parsedContacts = JSON.parse(contacts);
      const newData = [newContact, ...parsedContacts];
      await fs.writeFile(contactsPath, JSON.stringify(newData));
      return newData;
    } catch (error) {
        console.error(error);
  }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};