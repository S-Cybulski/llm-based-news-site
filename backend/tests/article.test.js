import request from "supertest";
import app from "../server.js";

jest.setTimeout(30000); 

describe('POST /api/articles/summarise', () => {
    it('should summarize an article successfully', async () => {
      const url = 'https://www.bbc.co.uk/news/articles/cly3807exyno';
  
      const response = await request(app)
        .post('/api/articles/summarise')
        .send({ url });
  
      expect(response.status).toBe(200);
      expect(response.body.summary).toBeDefined(); 
    });
  
    it('should return 500 for invalid URL', async () => {
      const invalidUrl = '';
  
      const response = await request(app)
        .post('/api/articles/summarise')
        .send({ url: invalidUrl });
  
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Invalid or missing URL');
    });
  });
  