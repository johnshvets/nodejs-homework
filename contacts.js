import * as fs from "fs";
import * as path from "path";
import shortid from "shortid";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "db", "contacts.json");

export function listContacts() {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(JSON.parse(data));
    return JSON.parse(data);
  });
}

export function getContactById(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const contact = JSON.parse(data).filter(({ id }) => id === contactId);
    console.log(contact[0]);
    return contact[0];
  });
}

export function removeContact(contactId) {
  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const parsedData = JSON.parse(data);
    const contact = parsedData.find(({ id }) => id === contactId);

    if (!contact) {
      return console.log(`Contact with id: ${contactId} wasn't found!`);
    }

    const newData = parsedData.filter(({ id }) => id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log(`Contact with id: ${contactId} was deleted!`);
  });
}

export function addContact(name, email, phone) {
  const newContact = {
    name,
    email,
    phone,
    id: shortid.generate(),
  };

  fs.readFile(contactsPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const parsedData = JSON.parse(data);
    const newData = [...parsedData, newContact];

    fs.writeFile(contactsPath, JSON.stringify(newData), (err) =>
      console.log(err)
    );

    console.log("New contact has been added!");
  });
}
