import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'APIs',
    description: 'An inventory project API testing.'
  },
  host: 'https://inventory-4-g8tu.onrender.com'
};

const outputFile = './swagger-output.json';
const routes = ['./routes/auth.route.js', './routes/product.route.js'];

swaggerAutogen()(outputFile, routes, doc);
