import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { CreateProductRequest } from '../../requests/CreateProductRequest'
import { getUserId } from '../utils';
import { createProduct } from '../../businessLogic/productBussiness'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const newProduct: CreateProductRequest = JSON.parse(event.body)
    const userId = getUserId(event)
    try {
      const newCreatedProduct = await createProduct(userId, newProduct);
      return {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        statusCode: 201,
        body: JSON.stringify({ message: 'Success', item: newCreatedProduct }),
      };
    } catch (exception) {
      return {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        statusCode: 500,
        body: JSON.stringify({ message: exception })
      };
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)
