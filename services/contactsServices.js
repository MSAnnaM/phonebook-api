import Contact from "../db/models/contactModel.js";


export async function listContacts() {
  try {
    const contactsList = await Contact.find();
    return contactsList;
  } catch (error) {
    console.error(error.message);
  }
}

export async function getContactById(contactId) {
  try {
    const result = await Contact.findById(contactId);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function removeContact(contactId) {
  try {
    const result = await Contact.findByIdAndDelete(contactId);
    return result;
  } catch (error) {
    console.error(error.message);
  }
}

export async function addContact(data) {
  try {
    const newContact = Contact.create(data);
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
}
export async function editContact(id, data) {
  try {
    const result = await Contact.findByIdAndUpdate(id, data, {new: true});
    return result;

  } catch (error) {
    console.error(error.message);
  }
}