import supertest from "supertest"
import {web} from "../src/application/web.js";
import { logger } from "../src/application/logging.js";
import { createTestUser, removeTestUser,getTestUser } from "./test.util.js";
import bcrypt from "bcrypt"

describe('POST /api/users', function(){
    
    afterEach(async () => {
        await removeTestUser();
    })

    it('should can register new user', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: "alc",
            password: "sA1910170!",
            name: "Aditya Lucis Caelum"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("alc");
        expect(result.body.data.name).toBe("Aditya Lucis Caelum");
        expect(result.body.data.password).toBeUndefined();
    })

    it('should reject if request is invalid', async () => {
        const result = await supertest(web)
        .post('/api/users')
        .send({
            username: '',
            password: '',
            name: ''
        });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })

    it('should reject if username already registered', async () => {
        let result = await supertest(web)
            .post('/api/users')
            .send({
                username: "alc",
                password: "sA1910170!",
                name: "Aditya Lucis Caelum"
            });

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("alc");
        expect(result.body.data.name).toBe("Aditya Lucis Caelum");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
            .post('/api/users')
            .send({
                username: "alc",
                password: "sA1910170!",
                name: "Aditya Lucis Caelum"
            });

        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
})

describe('POST /api/users/login', function () {
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can login', async ()=>{

        const result = await supertest(web)
        .post('/api/users/login')
        .send({
                username: "alc",
                password: "sA1910170!"
            });


        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    })
   
    it('should reject login', async ()=>{

        const result = await supertest(web)
        .post('/api/users/login')
        .send({
                username: "",
                password: ""
            });


        logger.info(result.body);

        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    })
    
    it('should reject if username is wrong', async ()=>{

        const result = await supertest(web)
        .post('/api/users/login')
        .send({
                username: "siapa",
                password: "sA1910170!"
            });


        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
    
    it('should reject if password is wrong', async ()=>{

        const result = await supertest(web)
        .post('/api/users/login')
        .send({
                username: "alc",
                password: "salah!"
            });


        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    })
})

describe('GET /api/users/current', function () {
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can get current user', async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'test')

        logger.info(result.body);

        expect(result.status).toBe(200);
        expect(result.body.data.name).toBe('Aditya Lucis Caelum');
        expect(result.body.data.username).toBe("alc");
    })
   
    it('should can get current user', async ()=>{
        const result = await supertest(web)
        .get('/api/users/current')
        .set('Authorization', 'salah')

        logger.info(result.body);

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined;
    })
})

describe('PATCH /api/users/current', function () {
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can update user', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: "Aditya Lucis Caelum",
            password: "sA1910170!"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("alc");
        expect(result.body.data.name).toBe("Aditya Lucis Caelum");

        const user = await getTestUser()
        expect(await bcrypt.compare("sA1910170!", user.password)).toBe(true)
    })
    
    it('should can update user name', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            name: "Aditya Lucis Caelum"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("alc");
        expect(result.body.data.name).toBe("Aditya Lucis Caelum")
    })

    it('should can update user', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'test')
        .send({
            password: "sA1910170!"
        })

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("alc");
        expect(result.body.data.name).toBe("Aditya Lucis Caelum");

        const user = await getTestUser()
        expect(await bcrypt.compare("sA1910170!", user.password)).toBe(true)
    })
    
    it('should reject is request not valid', async () => {
        const result = await supertest(web)
        .patch('/api/users/current')
        .set('Authorization', 'salah')
        .send({})

        expect(result.status).toBe(401);
    })
})

describe('DELETE /api/users/logout', function () {
    beforeEach(async ()=> {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser()
    })

    it('should can logout', async ()=>{

        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'test')


        logger.info(result.body);

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("Ok")
        
        const user = await getTestUser()
        expect(user.token).toBeNull()
    })

    it('should reject logout', async ()=>{

        const result = await supertest(web)
        .delete('/api/users/logout')
        .set('Authorization', 'salah')

        expect(result.status).toBe(401)
    })
})
