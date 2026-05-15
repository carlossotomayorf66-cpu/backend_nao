import { Request, Response } from 'express';
import { ProductService } from '../../application/product.service.js';

export class ProductController {
  constructor(private productService: ProductService) {}

  getAll = async (_req: Request, res: Response) => {
    try {
      const products = await this.productService.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  };

  getById = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.getProductById(Number(req.params.id));
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  };

  create = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear producto' });
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const product = await this.productService.updateProduct(Number(req.params.id), req.body);
      if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(product);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar producto' });
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const success = await this.productService.deleteProduct(Number(req.params.id));
      if (!success) return res.status(404).json({ error: 'Producto no encontrado' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  };
}
