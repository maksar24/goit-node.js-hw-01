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
        const foundContact = data.find(contact => {
            const stringId = String(contact.id);
            return stringId === String(contactId);
        });
        if (foundContact) {
            return foundContact;
        } else {
            console.table('Contact didn`t find');
        }
    } catch (error) {
        console.error(error);
    }
};

async function removeContact(contactId) {
    try {
        const data = await listContacts();
        const filteredContacts = data.filter(contact => {
            const stringId = String(contact.id);
            return stringId !== String(contactId);
        });
        await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
        console.table('Contact removed');
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
    const data = await listContacts();
    if (newContact.name === undefined || newContact.email === undefined || newContact.phone === undefined) {
        console.table('Not enough information about contact');
        return data;
    }
  try {
      const newData = [newContact, ...data];
      await fs.writeFile(contactsPath, JSON.stringify(newData));
      console.table(`${newContact.name}, ${newContact.email}, ${newContact.phone} - added`);
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