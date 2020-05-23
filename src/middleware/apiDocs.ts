import { Router } from 'express';
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(process.cwd(), 'src/config/swagger.yaml'));

export const handleAPIDocs = (router: Router) =>
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
