import { Products } from '../dataAccess/products'
import { ProductItem } from '../models/ProductItem'
import { CreateProductRequest } from '../requests/CreateProductRequest'
import { UpdateProductRequest } from '../requests/UpdateProductRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

const logger = createLogger('product-bussiness-layer')
const products = new Products()

export const getProducts = async (userId: string): Promise<ProductItem[]> => {
    return await products.getProducts(userId);
}

export const createProduct = async (userId: string, product: CreateProductRequest): Promise<ProductItem> => {
    logger.log('info', 'Received product create request: '.concat(JSON.stringify(product)))
    const productId = uuid.v4();
    const newProduct: ProductItem = {
        ...product,
        userId,
        productId,
        createdAt: new Date().toISOString()
    }
    await products.createProduct(newProduct);
    return newProduct;
}

export const updateProduct = async (userId: string, productId: string, updateProduct: UpdateProductRequest): Promise<void> => {
    logger.log('info', 'Received product update request: '.concat(productId))
    await products.updateProduct(userId, productId, updateProduct)
}

export const deleteProduct = async (userId: string, productId: string): Promise<void> => {
    logger.log('info', 'Received product delete request: '.concat(productId))
    await products.deleteProduct(userId, productId)
}

export const generateUploadURL = async (userId: string, productId: string): Promise<string> => {
    logger.log('info', 'Uploading image for product: '.concat(productId))
    const url = await products.getUploadURL(userId, productId)
    return url 
}