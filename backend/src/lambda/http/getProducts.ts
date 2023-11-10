import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ProductItem } from '../../models/ProductItem'
import * as middy from 'middy'
import { cors } from 'middy/middlewares'
import { getUserId } from '../utils';
import { getProducts } from '../../businessLogic/productBussiness';

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const userId = getUserId(event);
    try {
      const products: ProductItem[] = await getProducts(userId);
      if (products) {
        return {
          statusCode: 200,
          body: JSON.stringify({ items: products }),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
        }
      }
      return {
        statusCode: 404,
        body: null,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
      }
    }
    catch (err) {
      return {
        statusCode: 500,
        body: JSON.stringify(err),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
      }
    }
  }
)

handler.use(
  cors({
    credentials: true
  })
)