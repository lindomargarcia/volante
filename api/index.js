import Fastify from 'fastify'
import db from "./config/database.js";
import { Customer } from "./models/Customer.js";
import { Vehicle } from "./models/Vehicle.js";
import { Employee } from "./models/Employee.js";
import { InsuranceCompany } from "./models/InsuranceCompany.js";
import { ServiceOrder } from "./models/ServiceOrder.js";
import { ValidationError } from 'sequelize';
import { Catalog } from './models/Catalog.js';
import { ServiceOrderItem } from './models/ServiceOrderItem.js';

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

// db.query("PRAGMA strict = ON;")
//   .then(() => {
//     console.log("Strict mode enabled in SQLite");
//   })
//   .catch(error => {
//     console.error("Failed to enable strict mode:", error);
//   });

// db.sync()
//     .then(() => {
//         console.log("Database synchronized");
//     })
//     .catch(error => {
//         console.error("Failed to synchronize database:", error);
//     });

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

const createBasicCRUD = (name, route, table, methods = ['get_all','get_by_id', 'post', 'put', 'delete']) => {
    // Criar
    if(methods.includes('post')){
        api.post(`/${route}`, async (request, reply) => {
            try {
            const result = await table.create(request.body);
            reply.status(201).send(result);
            } catch (error) {
                if(error instanceof ValidationError){
                    const message = error.errors[0].message
                    reply.status(400).send({error: message})
                }
            reply.status(400).send({ error: error.message });
            }
        });
    }
    
    // Listar
    
    if(methods.includes('get_all')){
        api.get(`/${route}`, async (request, reply) => {
            try {
            const result = await table.findAll();
            reply.status(200).send(result);
            } catch (error) {
            reply.status(500).send({ error: error.message });
            }
        });
    }
    
    // Obter por ID
    if(methods.includes('get_by_id')){
        api.get(`/${route}/:id`, async (request, reply) => {
            try {
            const result = await table.findByPk(request.params.id);
            if (result) {
                reply.status(200).send(result);
            } else {
                reply.status(404).send({ error: `${name} not found` });
            }
            } catch (error) {
            reply.status(500).send({ error: error.message });
            }
        });
    }
    
    // Atualizar
    if(methods.includes('put')){
        api.put(`/${route}/:id`, async (request, reply) => {
            try {
            const [updated] = await table.update(request.body, {
                where: { id: request.params.id }
            });
            if (updated) {
                const result = await table.findByPk(request.params.id);
                reply.status(200).send(result);
            } else {
                reply.status(404).send({ error: `${name} not found` });
            }
            } catch (error) {
                if(error instanceof ValidationError){
                    const message = error.errors[0].message
                    reply.status(400).send({error: message})
                }
            reply.status(500).send({ error: error.message });
            }
        });
    }
    
    // Excluir
    if(methods.includes('delete')){
        api.delete(`/${route}/:id`, async (request, reply) => {
            try {
            const deleted = await table.destroy({
                where: { id: request.params.id }
            });
            if (deleted) {
                reply.status(204).send();
            } else {
                reply.status(404).send({ error: `${name} not found` });
            }
            } catch (error) {
                reply.status(500).send({ error: error.message });
            }
        });
    }
}

createBasicCRUD('Catalog Price Condition', 'catalog_price_conditions', Catalog)
createBasicCRUD('Catalog', 'catalog', Catalog)
createBasicCRUD('Customer', 'customers', Customer)
createBasicCRUD('Employee', 'employees', Employee)
createBasicCRUD('Insurance Company', 'insurance_companies', InsuranceCompany)
createBasicCRUD('Service Order', 'service_orders', ServiceOrder, ['put', 'delete', 'get_all'])
createBasicCRUD('Service Order Item', 'service_order_items', ServiceOrder)
createBasicCRUD('Vehicle', 'vehicles', Vehicle)

api.post('/service_orders', async (request, reply) => {
    if(!request.body.customer){
        throw new Error('Customer cannot be empty')
    }else if(!request.body.vehicle){
        throw new Error('Vehicle cannot be empty')
    }

    let result = await db.transaction(async t => {
        try{
            let customerId, vehicleId = null

            if(request.body?.customer?.id){
                customerId = request.body.customer.id
            }else{
                const newCustomer = await Customer.create(request.body.customer, { transaction: t })
                customerId = newCustomer.id
            }

            if(request.body?.vehicle?.id){
                vehicleId = request.body.vehicle.id
            }else{
                const newVehicle = await Vehicle.create(request.body.vehicle, { transaction: t })
                vehicleId = newVehicle.id
            }

            const {status, insuranceCompanyId, durationQuantity, durationType, items} = request.body

            const newSO = await ServiceOrder.create({status, customerId, vehicleId, insuranceCompanyId, durationQuantity, durationType}, {transaction: t})

            let createdItems = []

            if(items && items?.length > 0){
                const itemsData = items.map(item => ({serviceOrderId: newSO.id, ...item}));
                createdItems = await ServiceOrderItem.bulkCreate(itemsData, { transaction: t })
            }

            reply.status(200).send({...newSO.dataValues, items: createdItems})
        }catch(error){
            console.error(error)
            if(error.name === 'SequelizeUniqueConstraintError'){
                throw new Error(error.errors[0]?.message)
            }else if(error.name === 'SequelizeForeignKeyConstraintError'){
                throw new Error('Customer, Vehicle, Insurance Company or Catalog Item does not exist')
            }
            throw error
        }
    })
    reply.status(204)
})
