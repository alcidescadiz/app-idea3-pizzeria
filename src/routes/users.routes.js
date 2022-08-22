import express from 'express';
import { allUsers, createUser, verifyLogin } from '../controllers/users.controllers.js';
import { Auth } from '../middlewares/auth.middlewares.js';
const userRouter = express.Router()

export default (app)=> {
    userRouter
    .get('/', Auth, allUsers)
    .post('/', createUser)
    .post('/login', verifyLogin)
    
    app.use('/v1-api/users', userRouter)
}