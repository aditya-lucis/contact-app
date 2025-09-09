import { prismaClient } from "../src/application/database"
import bcrypt from "bcrypt"

export const removeTestUser = async ()=>{
    await prismaClient.user.deleteMany({
        where: {
            username: "alc"
        }
    })
}

export const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            username: "alc",
            password: await bcrypt.hash("sA1910170!", 10),
            name: "Aditya Lucis Caelum",
            token: "test"
        }
    })
}

export const getTestUser = async () => {
    return prismaClient.user.findUnique({
        where: {
            username: "alc"
        }
    })
}

export const removeAllTestContact = async () => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "alc"
        }
    })
}

export const createTestContact = async () => {
    await prismaClient.contact.create({
        data: {
                username: "alc",
                first_name: "Aditya",
                last_name: "Lucis",
                email: "vampire.prince@tenebrae.com",
                phone: "08723723728",
        }
    })
}

export const getTestContact = async () => {
    return prismaClient.contact.findFirst({
        where: {
            username: 'alc'
        }
    })
}