import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';
import styled from 'styled-components';
const Container = styled.div`
  margin-left: 40px;
`;
class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  nameId = nanoid();

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parsContact = JSON.parse(contact);
    if (parsContact) {
      this.setState({ contacts: parsContact });
    }
    console.log(parsContact);
    console.log('App componentDidMount');
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('Поле обновилось');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
    console.log('App componentDidUpdate');
    console.log(prevState);
    console.log(this.state);
  }

  addContacts = (name, number) => {
    let isAdded = false;
    this.state.contacts.forEach(el => {
      if (el.name.toLowerCase() === name.toLowerCase()) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });
    if (isAdded) {
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };
  handleRemove = allId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== allId),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <Container>
          <h1>Phonebook</h1>
          <ContactForm onSubmit={this.addContacts} />

          <h2>Contacts</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            handleRemove={this.handleRemove}
          />
        </Container>
      </div>
    );
  }
}

export default App;
