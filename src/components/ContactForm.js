import React from 'react';
import PropTypes from 'prop-types';
import styles from './App.module.css';

const ContactForm = ({
  name,
  number,
  handleNameChange,
  handleNumberChange,
  handleAddContact,
}) => {
  return (
    <div className={styles.appContainer}>
      <p className={styles.name}>Name</p>
      <label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Ząćęłńóśźż' -]+$"
          title="Name may contain only letters, apostrophe, dash, spaces, and Polish characters (ą, ę, ł, ó, ś, ż, ź, ć, ń)"
          required
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <p className={styles.name}>Phone Number</p>
      <label>
        <input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleNumberChange}
        />
      </label>
      <button className={styles.addContactBtn} onClick={handleAddContact}>
        Add contact
      </button>
    </div>
  );
};

ContactForm.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleNumberChange: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
