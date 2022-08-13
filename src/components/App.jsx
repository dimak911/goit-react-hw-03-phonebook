import { Component } from 'react';
import { nanoid } from 'nanoid';
import { GlobalStyle } from './GlobalStyle';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onFormSubmit = evt => {
    evt.preventDefault();
    const newName = {
      id: nanoid(),
      name: evt.target.elements.name.value,
      number: evt.target.elements.number.value,
    };
    if (!this.hasDuplicates(newName.name)) {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, newName],
        };
      });
    } else {
      alert(`${newName.name} is already in contacts.`);
    }
  };

  hasDuplicates(duplicate) {
    return this.state.contacts.find(({ name }) => name === duplicate);
  }

  getFilteredContacts = () => {
    const filterValue = this.state.filter.toLowerCase();

    return this.state.contacts.filter(({ name }) =>
      name.toLowerCase().includes(filterValue)
    );
  };

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  deleteContact = evt => {
    const contactToDeleteId = evt.target.dataset.id;
    this.setState({
      contacts: this.state.contacts.filter(
        ({ id }) => id !== contactToDeleteId
      ),
    });
  };

  render() {
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <GlobalStyle />
        <Section title="Phonebook">
          <ContactForm onFormSubmit={this.onFormSubmit} />
        </Section>
        <Section title="Contacts">
          <Filter onInputChange={this.onInputChange} />
          <ContactList
            contacts={filteredContacts}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
