import fs from "fs/promises";
import path from "path";

const pathToFile = path.join("db", "contacts.json");


export async function listContacts() {
  try {
    const data = await fs.readFile(pathToFile, "utf-8");
    const contactsList = JSON.parse(data);
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(pathToFile, "utf-8");
    const contacts = JSON.parse(data);
    const contactById = contacts.find((contact) => contact.id === contactId);
    return contactById || null;
  } catch (error) {
    console.error(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const data = await fs.readFile(pathToFile, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const remove = contacts.splice(index, 1)[0];
      await fs.writeFile(
        pathToFile,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return remove;
    }
    return null;
  } catch (error) {
    console.error(error.message);
  }
}

export async function addContact({name, email, phone}) {
  try {
    const data = await fs.readFile(pathToFile, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: new Date().getTime().toString(16),
      name,
      email,
      phone,
      };
      contacts.push(newContact);
      await fs.writeFile(
        pathToFile,
        JSON.stringify(contacts, null, 2),
        "utf-8"
      );
      return newContact;
  } catch (error) {
    console.error(error.message);
  }
}
export async function editContact(id, data) {
  try {
    const listContacts = await fs.readFile(pathToFile, "utf-8");
    const contacts = JSON.parse(listContacts);
    const index = contacts.findIndex((contact) => contact.id === id);
    if (index === -1) {
      return null;
    }
    contacts[index] = { ...contacts[index], ...data }
    await fs.writeFile(
        pathToFile,
        JSON.stringify(contacts, null, 2),
        "utf-8"
    );
    return contacts[index];

  } catch (error) {
    console.error(error.message);
  }
}