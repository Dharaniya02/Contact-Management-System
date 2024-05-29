const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

let contacts = [];

// Routes for CRUD operations

app.get("/contacts", (req, res) => {
  res.json({ contacts });
});

app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  const id = contacts.length + 1;
  const newContact = { id, name, email, phone };
  contacts.push(newContact);
  res.json({ success: true, contact: newContact });
});

app.put("/contacts/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const index = contacts.findIndex((contact) => contact.id === parseInt(id));
  if (index !== -1) {
    contacts[index] = { id: parseInt(id), name, email, phone };
    res.json({ success: true, contact: contacts[index] });
  } else {
    res.status(404).json({ success: false, message: "Contact not found" });
  }
});

app.delete("/contacts/:id", (req, res) => {
  const { id } = req.params;
  contacts = contacts.filter((contact) => contact.id !== parseInt(id));
  res.json({ success: true });
});
``
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
