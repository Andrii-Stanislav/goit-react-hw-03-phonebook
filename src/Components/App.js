import React, { Component } from 'react';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

import styles from './App.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  filterInput = ({ currentTarget }) => {
    this.setState({ filter: currentTarget.value });
  };

  createNewContact = ({ id, name, number }) => {
    if (this.verifyNewContact(name, number)) {
      this.setState(({ contacts }) => ({
        contacts: [...contacts, { id, name, number }],
      }));
    }
  };

  verifyNewContact = (newName, number) => {
    let verify = true;

    this.state.contacts.forEach(({ name }) => {
      if (name.toLowerCase() === newName.toLowerCase()) {
        alert(`${name} is already in contacts`);
        verify = false;
      }
    });

    if (newName === '' || number === '') {
      alert(`Write all info`);
      verify = false;
    }

    return verify;
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;
    filter.toLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(filter));
  };

  deleteContact = event => {
    const deleteId = event.currentTarget.id;

    this.setState(({ contacts }) => ({
      contacts: contacts.filter(({ id }) => id !== deleteId),
    }));
  };

  render() {
    const filtered = this.filteredContacts();

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.createNewContact} />
        <h2 className={styles.title}>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.filterInput} />
        <ContactList contacts={filtered} deleteOnClick={this.deleteContact} />
      </div>
    );
  }
}

export default App;
