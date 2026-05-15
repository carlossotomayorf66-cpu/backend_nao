import { Request, Response } from 'express';
import { ClientService } from '../../application/client.service.js';

export class ClientController {
  constructor(private clientService: ClientService) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const clients = await this.clientService.getAllClients();
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener clientes' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const client = await this.clientService.getClientById(Number(req.params.id));
      if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el cliente' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const client = await this.clientService.createClient(req.body);
      res.status(201).json(client);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear cliente' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const client = await this.clientService.updateClient(Number(req.params.id), req.body);
      if (!client) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.json(client);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar cliente' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const success = await this.clientService.deleteClient(Number(req.params.id));
      if (!success) return res.status(404).json({ error: 'Cliente no encontrado' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar cliente' });
    }
  };
}
