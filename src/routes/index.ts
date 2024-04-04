import { Router } from 'express'
import taskRoutes from './task/task.routes'
import authRoutes from './auth/auth.routes'
import addressRoutes from './address/address.routes'

const routes = Router()

routes.use('/task', taskRoutes)
routes.use('/auth', authRoutes)
routes.use('/address', addressRoutes)

export default routes