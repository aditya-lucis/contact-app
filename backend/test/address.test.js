import supertest from "supertest"
import {web} from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestAddress, createTestContact, createTestUser, getTestAddress, getTestContact, removeAllTestAddress, removeAllTestContact, removeTestUser } from "./test.util"

describe('POST /api/contacts/:contactId/address', function (){
    beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
    })
    
    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can crate address', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/address')
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Bekasi",
                province: "Jawa Barat",
                country: "Indonesia",
                postal_code: '17710'
            })
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('test street')
        expect(result.body.data.city).toBe('Bekasi')
        expect(result.body.data.province).toBe('Jawa Barat')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('17710')
    })

    it('reject to crate address if request required is invalid', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post('/api/contacts/' + testContact.id + '/address')
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Bekasi",
                province: "Jawa Barat",
                country: "",
                postal_code: ''
            })
        expect(result.status).toBe(400)
    })

    it('reject to crate address if contact is not found', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .post('/api/contacts/' + (testContact.id + 1) + '/address')
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Bekasi",
                province: "Jawa Barat",
                country: "Indonesia",
                postal_code: '17710'
            })

        expect(result.status).toBe(404)
    })
})

describe('GET /api/contacts/:contactId/address/:addressId', () => {
    beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })
    
    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/address/${testAddress.id}`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('test street')
        expect(result.body.data.city).toBe('Bekasi')
        expect(result.body.data.province).toBe('Jawa Barat')
        expect(result.body.data.country).toBe('Indonesia')
        expect(result.body.data.postal_code).toBe('17710')
    })

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id + 1}/address/${testAddress.id}`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)
    })
    
    it('should reject if address is not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/address/${testAddress.id + 1}`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)
    })
})

describe('PUT /api/contacts/:contactId/address/:addressId', () => {
    beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })
    
    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can update', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}/address/${testAddress.id}`)
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Istanbul",
                province: "Istanbul",
                country: "Turki",
                postal_code: '17710'
            })

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.street).toBe('test street')
        expect(result.body.data.city).toBe('Istanbul')
        expect(result.body.data.province).toBe('Istanbul')
        expect(result.body.data.country).toBe('Turki')
        expect(result.body.data.postal_code).toBe('17710')
    })

    it('reject update if request not valid', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}/address/${testAddress.id}`)
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Istanbul",
                province: "",
                country: "",
                postal_code: ''
            })

        expect(result.status).toBe(400)
    })
    
    it('reject update if contact not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id+1}/address/${testAddress.id}`)
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Istanbul",
                province: "Istanbul",
                country: "Turki",
                postal_code: '17710'
            })

        expect(result.status).toBe(404)
    })
    
    it('reject update if address not found', async () => {
        const testContact = await getTestContact()
        const testAddress = await getTestAddress()
        
        const result = await supertest(web)
            .put(`/api/contacts/${testContact.id}/address/${testAddress.id+1}`)
            .set('Authorization', 'test')
            .send({
                street: "test street",
                city: "Istanbul",
                province: "Istanbul",
                country: "Turki",
                postal_code: '17710'
            })

        expect(result.status).toBe(404)
    })
})

describe('DELETE /api/contacts/:contactId/address/:addressId', () => {
    beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })
    
    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await removeTestUser()
    })
    
    it('should can remove address', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}/address/${testAddress.id}`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data).toBe("Ok")

        testAddress = await getTestAddress()
        expect(testAddress).toBeNull()
    })
    
    it('reject if address not found', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id}/address/${testAddress.id + 1}`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)
    })
    
    it('reject if contact not found', async () => {
        const testContact = await getTestContact()
        let testAddress = await getTestAddress()

        const result = await supertest(web)
            .delete(`/api/contacts/${testContact.id + 1}/address/${testAddress.id}`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)
    })
})

describe('GET /api/contacts/:contactId/address', () => {
    beforeEach(async ()=> {
        await createTestUser()
        await createTestContact()
        await createTestAddress()
    })
    
    afterEach(async () => {
        await removeAllTestAddress()
        await removeAllTestContact()
        await removeTestUser()
    })

    it('should can get list address', async function () {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id}/address`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(200)
        expect(result.body.data.length).toBe(1)
    })

    it('reject if contact is not found', async function () {
        const testContact = await getTestContact()

        const result = await supertest(web)
            .get(`/api/contacts/${testContact.id + 1}/address`)
            .set('Authorization', 'test')
        
        expect(result.status).toBe(404)
    })
})
