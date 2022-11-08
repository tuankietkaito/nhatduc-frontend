import { privateInstance } from '.';
import { ApiResponse, IProduct } from '../utils/types';

const getAllProducts = async (): Promise<IProduct[]> => {
  const res: ApiResponse = await privateInstance.get('/products');
  return res.payload as IProduct[];
};

const createNewProduct = async (data: IProduct): Promise<IProduct> => {
  const res: ApiResponse = await privateInstance.post('/products', data);
  return res.payload;
};

const updateProduct = async (custId: string, data: IProduct): Promise<IProduct> => {
  const res: ApiResponse = await privateInstance.patch(`/products/${custId}`, data);
  return res.payload;
};

const deleteProduct = async (custId: string): Promise<IProduct> => {
  const res: ApiResponse = await privateInstance.delete(`/products/${custId}`);
  return res.payload;
};

const ProductApi = {
  getAllProducts,
  createNewProduct,
  updateProduct,
  deleteProduct
};

export default ProductApi;
