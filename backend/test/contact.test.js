import supertest from "supertest"
import {web} from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestContact, createTestUser, getTestContact, removeAllTestContact, removeTestUser } from "./test.util";

describe('POST /api/contacts', function () {
    beforeEach(async ()=> {
        await createTestUser()
    })
    
    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can create new contact', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "Aditya",
                last_name: "Lucis",
                email: "vampire.prince@tenebrae.com",
                phone: "08723723728",
            })

        logger.info(result.body);

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("Aditya")
        expect(result.body.data.last_name).toBe("Lucis")
        expect(result.body.data.email).toBe("vampire.prince@tenebrae.com")
        expect(result.body.data.phone).toBe("08723723728")
    })

    it('should reject if invalid value', async () => {
        const result = await supertest(web)
            .post('/api/contacts')
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "Lucis",
                email: "vampire.princetenebrae",
                phone: "08723723728",
            })

        logger.info(result.body);

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:contactId', function () {
    beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
    })
    
    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get("/api/contacts/" + testContact.id)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
        expect(result.body.data.email).toBe(testContact.email)
        expect(result.body.data.phone).toBe(testContact.phone)
    })

    it('should return 404 if contact id is not found', async () => {
        const testContact = await getTestContact();

        const result = await supertest(web)
            .get("/api/contacts/" + (testContact.id + 1))
            .set('Authorization', 'test');

        expect(result.status).toBe(404);
    })
})

describe('PUT /api/contacts/:contactId', () => {
  beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
    })
    
    afterEach(async () => {
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can update existing contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "Aditya",
                last_name: "Lucis",
                email: "vampire.prince@tenebrae.com",
                phone: "08723723728",
            })

        logger.info(result.body);

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("Aditya")
        expect(result.body.data.last_name).toBe("Lucis")
        expect(result.body.data.email).toBe("vampire.prince@tenebrae.com")
        expect(result.body.data.phone).toBe("08723723728")
    })

    it('should reject if request is invalid', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .put('/api/contacts/' + testContact.id)
            .set('Authorization', 'test')
            .send({
                first_name: "",
                last_name: "",
                email: "vampireprince",
                phone: "08723723728",
            })

        logger.info(result.body);

        expect(result.status).toBe(400)
    })

     it('should can update existing contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .put('/api/contacts/' + (testContact.id + 1))
            .set('Authorization', 'test')
            .send({
                first_name: "Aditya",
                last_name: "Lucis",
                email: "vampire.prince@tenebrae.com",
                phone: "08723723728",
            })

        logger.info(result.body);

        expect(result.status).toBe(404)
    })
})
