import { faker } from '@faker-js/faker'
import { http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'
 
export const worker = setupWorker(
  http.get('/api/product', () => HttpResponse.json({ name: faker.commerce.product() }))
)