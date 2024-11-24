import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

interface Product {
  id: number;
  name: string;
}

@Injectable()
export class ProductService {
  constructor(private readonly UserService: UserService) {}
  product: Product[] = [
    {
      id: 1,
      name: 'product1',
    },
    {
      id: 2,
      name: 'product2',
    },
    {
      id: 3,
      name: 'product3',
    },
  ];
  getAllProducst(): any {
    const data: any = {
      users: this.UserService.getAllProducst(),
      products: this.product,
    };
    return data;
  }
}
