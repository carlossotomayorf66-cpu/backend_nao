import { IClientRepository, Client } from '../domain/client.entity.js';

export class ClientService {
  constructor(private clientRepository: IClientRepository) {}

  async getAllClients() {
    return this.clientRepository.findAll();
  }

  async getClientById(id: number) {
    return this.clientRepository.findById(id);
  }

  async createClient(clientData: Client) {
    return this.clientRepository.create(clientData);
  }

  async updateClient(id: number, clientData: Partial<Client>) {
    return this.clientRepository.update(id, clientData);
  }

  async deleteClient(id: number) {
    return this.clientRepository.delete(id);
  }
}
