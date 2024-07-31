import Fastify from 'fastify'
import db from "./config/database.js";
import { Customer } from "./models/Customers.js";
import { ValidationError } from 'sequelize';

const api = Fastify({logger: false})

const startServer = async () => {
    try {
        await api.listen({port: 2000});
        console.log('Server running at port 2000');
    } catch (err) {
        api.log.error(err);
        process.exit(1);
    }
};

db.authenticate()
    .then(() => {
        console.log('SQLite database connected');
        return db.sync();
    })
    .then(() => {
        console.log('Models sincronized');
        startServer()
    })
    .catch(error => {
        console.error('Error connecting to DB:', error);
    }
);

api.get("/", async (resquest, reply) => {
    reply.status(200).send("API Volante running succesfully!")
})

// Criar Cliente
api.post('/customers', async (request, reply) => {
    try {
      const customer = await Customer.create(request.body);
      reply.status(201).send(customer);
    } catch (error) {
        if(error instanceof ValidationError){
            const message = error.errors[0].message
            reply.status(400).send({error: message})
        }
      reply.status(400).send({ error: error.message });
    }
  });
  
  // Listar Clientes
  api.get('/customers', async (request, reply) => {
    try {
      const customers = await Customer.findAll();
      reply.status(200).send(customers);
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });
  
  // Obter Cliente por ID
  api.get('/customers/:id', async (request, reply) => {
    try {
      const customer = await Customer.findByPk(request.params.id);
      if (customer) {
        reply.status(200).send(customer);
      } else {
        reply.status(404).send({ error: 'Customer not found' });
      }
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });
  
  // Atualizar Cliente
  api.put('/customers/:id', async (request, reply) => {
    try {
      const [updated] = await Customer.update(request.body, {
        where: { id: request.params.id }
      });
      if (updated) {
        const updatedCliente = await Customer.findByPk(request.params.id);
        reply.status(200).send(updatedCliente);
      } else {
        reply.status(404).send({ error: 'Customer not found' });
      }
    } catch (error) {
        if(error instanceof ValidationError){
            const message = error.errors[0].message
            reply.status(400).send({error: message})
        }
      reply.status(500).send({ error: error.message });
    }
  });
  
  // Excluir Cliente
  api.delete('/customers/:id', async (request, reply) => {
    try {
      const deleted = await Customer.destroy({
        where: { id: request.params.id }
      });
      if (deleted) {
        reply.status(204).send();
      } else {
        reply.status(404).send({ error: 'Customer not found' });
      }
    } catch (error) {
      reply.status(500).send({ error: error.message });
    }
  });