import { Request, Response } from "express";
import Address from "../../models/address.entity";

export default class AddressController {
    static async store(req: Request, res: Response) {
        const { street, number, city, state, country, zipCode } = req.body
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        if (!street || !number || !city || !state || !country || !zipCode) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
        }

        const address = new Address()
        address.street = street
        address.number = number
        address.city = city
        address.state = state
        address.country = country
        address.zipCode = zipCode
        address.userId = Number(userId)
        await address.save()

        return res.status(201).json(address)
    }

    static async index(req: Request, res: Response) {
        const { userId } = req.headers

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const addresses = await Address.find({ where: { userId: Number(userId) } })
        return res.json(addresses)
    }

    static async show(req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const address = await Address.findOneBy({ id: Number(id), userId: Number(userId) })

        if (!address) {
            return res.status(404).json({ error: 'Endereço não encontrado' })
        }

        return res.json(address)
    }

    static async delete(req: Request, res: Response) {
        const { id } = req.params
        const { userId } = req.headers

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const address = await Address.findOneBy({ id: Number(id), userId: Number(userId) })

        if (!address) {
            return res.status(404).json({ error: 'Endereço não encontrado' })
        }

        await address.remove()
        return res.status(204).json()
    }

    static async update(req: Request, res: Response) {
        const { id } = req.params
        const { street, number, city, state, country, zipCode } = req.body
        const { userId } = req.headers

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: 'O id é obrigatório' })
        }

        if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' })

        const address = await Address.findOneBy({ id: Number(id), userId: Number(userId) })

        if (!address) {
            return res.status(404).json({ error: 'Endereço não encontrado' })
        }

        address.street = street ?? address.street
        address.number = number ?? address.number
        address.city = city ?? address.city
        address.state = state ?? address.state
        address.country = country ?? address.country
        address.zipCode = zipCode ?? address.zipCode
        await address.save()

        return res.json(address)
    }
}   