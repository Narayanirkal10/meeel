const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const sequelize = require('./config/database');
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- SWAGGER SETUP with SECURITY ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: { 
      title: 'Meal Business Master API', 
      version: '1.0.0', 
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }], // Apply secure by default to see the locks
  },
  apis: ['./src/routes/*.js'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// --- ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/menu', menuRoutes);

// Database Sync
sequelize.sync({ alter: true }).then(() => {
  console.log('[SEQUELIZE] Database & Tables Synced Successfully');
}).catch(err => {
  console.error('[SEQUELIZE] Sync Error:', err.message);
});

module.exports = app;
