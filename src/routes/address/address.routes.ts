import { Router } from "express"
import AddressController from "../../controllers/address/address.controller"
import authMiddleware from "../../middlewares/auth.middleware"

const addressRoutes = Router()

addressRoutes.post('/', authMiddleware, AddressController.store)    // POST /address    
addressRoutes.get('/', authMiddleware, AddressController.index)    // GET /address  
addressRoutes.get('/:id', authMiddleware, AddressController.show)   // GET /address/:id
addressRoutes.delete('/:id', authMiddleware, AddressController.delete) // DELETE /address/:id
addressRoutes.put('/:id', authMiddleware, AddressController.update) // PUT /address/:id

export default addressRoutes