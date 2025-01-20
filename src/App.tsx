import React, { useState, useCallback, useEffect } from "react";
import { Contact } from "./types/contacts.ts";
import Searchbar from "./component/searchbar.tsx";
import AddEditContact from "./component/addEditContact.tsx";
import ContactList from "./component/contactList.tsx";

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      console.log("No contacts found in localStorage.");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addOrUpdateContact = useCallback((contact: Contact) => {
    setContacts((prevContacts) => {
      const existingIndex = prevContacts.findIndex((c) => c.id === contact.id);
      if (existingIndex !== -1) {
        const updatedContacts = [...prevContacts];
        updatedContacts[existingIndex] = contact;
        return updatedContacts;
      }
      return [...prevContacts, contact];
    });
  }, []);

  const deleteContact = (id: string) => {
    setContacts((prevContacts) => prevContacts.filter((contact) => contact.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact
      )
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedContacts = [...filteredContacts].sort(
    (a, b) => Number(b.isFavorite) - Number(a.isFavorite)
  );

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold mb-5">Contact Manager</h1>
      <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <AddEditContact onSave={addOrUpdateContact} />
      <ContactList
        contacts={sortedContacts}
        onDelete={deleteContact}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default App;
