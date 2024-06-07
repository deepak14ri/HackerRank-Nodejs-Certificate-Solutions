import { Request, Response, Router } from 'express';
import { Op } from 'sequelize';
import Contact from '../models/contact';

const router = Router();

router.post('/identify', async (req: Request, res: Response) => {
  const { email, phoneNumber } = req.body;
  console.log("email: ", email);
  console.log("phoneNumber: ", phoneNumber);

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Email or phoneNumber must be provided' });
  }

  const contacts = await Contact.findAll({
    where: {
      [Op.or]: [{ email }, { phoneNumber }],
    },
  });

  let primaryContact: Contact;
  let secondaryContacts: Contact[] = [];

  if (contacts.length === 0) {
    primaryContact = await Contact.create({
      email,
      phoneNumber,
      linkPrecedence: 'primary',
    });
  } else {
    primaryContact = contacts.find(contact => contact.linkPrecedence === 'primary') || contacts[0];
    secondaryContacts = contacts.filter(contact => contact.id !== primaryContact.id);

    if (!contacts.some(contact => contact.email === email && contact.phoneNumber === phoneNumber)) {
      const newContact = await Contact.create({
        email,
        phoneNumber,
        linkedId: primaryContact.id,
        linkPrecedence: 'secondary',
      });
      secondaryContacts.push(newContact);
    }
  }

  if (!primaryContact) {
    return res.status(500).json({ error: 'An error occurred while processing the request' });
  }

  const response = {
    contact: {
      primaryContactId: primaryContact.id,
      emails: [primaryContact.email, ...secondaryContacts.map(contact => contact.email)].filter(Boolean),
      phoneNumbers: [primaryContact.phoneNumber, ...secondaryContacts.map(contact => contact.phoneNumber)].filter(Boolean),
      secondaryContactIds: secondaryContacts.map(contact => contact.id),
    },
  };

  res.status(200).json(response);
});

export default router;
