import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'APIs',
    description: 'An inventory project API testing.'
  },
  host: 'inventory-4-g8tu.onrender.com',
  basePath: "/api",   
  schemes: ["https"] 
};

const outputFile = './swagger-output.json';
const routes = ['./routes/auth.route.js', './routes/product.route.js',"./routes/supplier.route.js","./routes/sale.route.js"];

swaggerAutogen()(outputFile, routes, doc);
