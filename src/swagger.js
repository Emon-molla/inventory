import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'APIs',
    description: 'An inventory project API testing.'
  },
  host: 'localhost:3001'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/auth.route.js', './routes/product.route.js'];

swaggerAutogen()(outputFile, routes, doc);
