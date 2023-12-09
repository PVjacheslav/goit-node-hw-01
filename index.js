const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      return console.table(allContacts);

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.table(oneContact);

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);

    case "remove":
      const deleteContact = await contacts.removeContact(id);
      return console.table(deleteContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "05olLMgyVQdWRwgKfg5J6" });
// invokeAction({ action: "add", name: "Mango", email: "mango@gmail.com", phone: "322-22-22" });
invokeAction({ action: "remove", id: "qdggE76Jtbfd9eWJHrssH" });
