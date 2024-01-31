import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      this.setState({ contacts: JSON.parse(storedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(prevState.contacts) !== JSON.stringify(this.state.contacts)
    ) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleNameChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleNumberChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleAddContact = () => {
    const isNameExist = this.state.contacts.some(
      contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
    );

    if (isNameExist) {
      alert(`${this.state.name} is already in contacts!`);
    } else {
      const newContact = {
        id: nanoid(),
        name: this.state.name,
        number: this.state.number,
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
        name: '',
        number: '',
      }));
    }
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
      filter: prevState.filter,
    }));
  };

  handleFilterChange = event => {
    const filterValue = event.target.value.toLowerCase();
    this.setState({ filter: filterValue });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter)
    );

    return (
      <div className={styles.appContainer}>
        <h1 className={styles.pageTitle}>Phonebook</h1>
        <ContactForm
          name={this.state.name}
          number={this.state.number}
          handleNameChange={this.handleNameChange}
          handleNumberChange={this.handleNumberChange}
          handleAddContact={this.handleAddContact}
        />
        <h2 className={styles.contactsHeading}>Contacts</h2>
        <Filter
          filter={this.state.filter}
          handleFilterChange={this.handleFilterChange}
        />
        <ContactList
          contacts={this.state.filter ? filteredContacts : this.state.contacts}
          handleDeleteContact={this.handleDeleteContact}
        />
      </div>
    );
  }
}

export default App;
