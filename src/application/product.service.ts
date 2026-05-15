import { IProductRepository, Product } from '../domain/product.entity.js';

export class ProductService {
  constructor(private productRepository: IProductRepository) {}

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async getProductById(id: number) {
    return this.productRepository.findById(id);
  }

  async createProduct(productData: Product) {
    // Validaciones de negocio adicionales podrían ir aquí
    return this.productRepository.create(productData);
  }

  async updateProduct(id: number, productData: Partial<Product>) {
    return this.productRepository.update(id, productData);
  }

  async deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
