const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());

/**
 * @fakedata
 */

const customers = []

/**
 * @userdata
 *
 * cpf - string
 * name -string
 * id - uuid
 * statement - Array[]
 */
app.post('/account', (request, response) => {
  const { name, cpf } = request.body;

  const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!' });
  }

  customers.push({
    name,
    cpf,
    id: uuid(),
    statement: []
  });

  return response.status(201).send()
})

app.listen(3333)
