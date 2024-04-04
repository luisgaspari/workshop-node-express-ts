import { Router } from 'express'
import AuthController from '../../controllers/auth/auth.controller'

const authRoutes = Router()

authRoutes.post('/register', AuthController.store)
authRoutes.get('/users', AuthController.list)
authRoutes.post('/login', AuthController.login)
authRoutes.post('/refresh', AuthController.refresh)
authRoutes.post('/logout', AuthController.logout)

export default authRoutes
