import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import styles from './App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      setContacts(JSON.parse(storedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleNameChange = event => {
    const { value } = event.target;
    setName(value);
  };

  const handleNumberChange = event => {
    const { value } = event.target;
    setNumber(value);
  };

  const handleAddContact = () => {
    const isNameExist = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameExist) {
      alert(`${name} is already in contacts!`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      setContacts(prevContacts => [...prevContacts, newContact]);
      setName('');
      setNumber('');
    }
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleFilterChange = event => {
    const filterValue = event.target.value.toLowerCase();
    setFilter(filterValue);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.pageTitle}>Phonebook</h1>
      <ContactForm
        name={name}
        number={number}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleAddContact={handleAddContact}
      />
      <h2 className={styles.contactsHeading}>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <ContactList
        contacts={filter ? filteredContacts : contacts}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
