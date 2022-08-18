import express from 'express';
import { allUsers, createUser } from '../controllers/users.controllers.js';
const userRouter = express.Router()

export default (app)=> {
    userRouter
    .get('/', allUsers)
    .post('/', createUser)
    
    app.use('/v1-api/users', userRouter)
}