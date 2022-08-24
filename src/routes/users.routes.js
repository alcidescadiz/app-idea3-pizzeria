import express from 'express';
import { allUsers, createUser, verifyLogin } from '../controllers/users.controllers.js';
import { Auth } from '../middlewares/auth.middlewares.js';
import { validateDataUserCreate } from '../middlewares/validateDataUserCreate.middlewares.js';
const userRouter = express.Router()

export default (app)=> {
    userRouter
    .get('/', Auth, allUsers)
    .post('/',validateDataUserCreate, createUser)
    .post('/login', verifyLogin)
    
    app.use('/v1-api/users', userRouter)
}