export interface Client {
  id?: number;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  address?: string;
  created_at?: Date;
}

export interface IClientRepository {
  findAll(): Promise<Client[]>;
  findById(id: number): Promise<Client | null>;
  create(client: Client): Promise<Client>;
  update(id: number, client: Partial<Client>): Promise<Client | null>;
  delete(id: number): Promise<boolean>;
}
