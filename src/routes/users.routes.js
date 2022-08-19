import express from 'express';
import { allUsers, createUser, verifyLogin } from '../controllers/users.controllers.js';
const userRouter = express.Router()

export default (app)=> {
    userRouter
    .get('/', allUsers)
    .post('/', createUser)
    .post('/login', verifyLogin)
    
    app.use('/v1-api/users', userRouter)
}