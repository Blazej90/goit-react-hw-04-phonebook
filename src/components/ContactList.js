import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.module.css';

const ContactList = ({ contacts, handleDeleteContact }) => {
  return (
    <ul className={styles.contactList}>
      {contacts.map(contact => (
        <li key={contact.id} className={styles.contactItem}>
          {contact.name} - {contact.number}
          <button
            onClick={() => handleDeleteContact(contact.id)}
            className={styles.deleteBtn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  handleDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
