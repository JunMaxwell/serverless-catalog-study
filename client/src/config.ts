// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = '6wl3u7t9yi'
const region = 'us-east-1'
export const apiEndpoint = `https://${apiId}.execute-api.${region}.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map. For example:
  // domain: 'dev-nd9990-p4.us.auth0.com',
  domain: 'dev-vmurf25dd40tjocj.us.auth0.com',            // Auth0 domain
  clientId: 'Oj6hwlVfk3nGbVwoqg2bUkhhziqwoetT',           // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
