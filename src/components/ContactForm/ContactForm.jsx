import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { Form, Label, Button } from './ContactForm.styled';
function ContactForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();

  const handleChangeName = event => {
    setName(event.target.value);
    // const { name, value } = event.currentTarget;
    // setName({ [name]: value });
  };

  const handleChangeNumber = event => {
    setNumber(event.target.value);
    // const { name, value } = event.currentTarget;
    // setName({ [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // reset();

    onSubmit(name, number);
  };
  // reset = () => {
  //   setNumber({ name: '', number: '' });
  // };

  return (
    <Form action="" onSubmit={handleSubmit}>
      <Label htmlFor={nameId}>
        Name
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChangeName}
          id={nameId}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>

      <Label htmlFor={nameId}>
        Number
        <input
          type="tel"
          name="number"
          value={number}
          onChange={handleChangeNumber}
          id={nameId}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit">Add contact</Button>
    </Form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
