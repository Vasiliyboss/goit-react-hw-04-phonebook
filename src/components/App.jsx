import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import styled from 'styled-components';
const Container = styled.div`
  margin-left: 40px;
`;
export function App() {
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContacts = data => {
    const { name, number } = data;
    const elArray = contacts.map(contact => contact.name);

    if (elArray.includes(name)) {
      alert(`${name} is already in contacts`);
    } else {
      const contacts = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(state => [contacts, ...state]);
    }
  };

  const handleRemove = allId => {
    setContacts(contacts.filter(contact => contact.id !== allId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filterContacts = getVisibleContacts();
  return (
    <div>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContacts} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filterContacts} handleRemove={handleRemove} />
      </Container>
    </div>
  );
}

// componentDidMount() {
//   const contact = localStorage.getItem('contacts');
//   const parsContact = JSON.parse(contact);
//   if (parsContact) {
//     this.setState({ contacts: parsContact });
//   }

// }
// componentDidUpdate(prevProps, prevState) {
//   if (this.state.contacts !== prevState.contacts) {
//     console.log('Поле обновилось');
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
//     }

// addContacts = (name, number) => {
//   let isAdded = false;
//   this.state.contacts.forEach(el => {
//     if (el.name.toLowerCase() === name.toLowerCase()) {
//       alert(`${name} is already in contacts`);
//       isAdded = true;
//     }
//   });
//   if (isAdded) {
//     return;
//   }

//   const contact = {
//     id: nanoid(),
//     name: name,
//     number: number,
//   };
//   this.setState(prevState => ({
//     contacts: [...prevState.contacts, contact],
//   }));
// };
// handleRemove = allId => {
//   this.setState(prevState => ({
//     contacts: prevState.contacts.filter(contact => contact.id !== allId),
//   }));
// };
// changeFilter = e => {
//   this.setState({ filter: e.currentTarget.value });
// };
// getVisibleContacts = () => {
//   const { contacts, filter } = this.state;
//   const normalizedFilter = filter.toLowerCase();
//   return contacts.filter(contact =>
//     contact.name.toLowerCase().includes(normalizedFilter)
//   );
// };
// render() {
//   const { filter } = this.state;
//   const visibleContacts = this.getVisibleContacts();

// export default App;
