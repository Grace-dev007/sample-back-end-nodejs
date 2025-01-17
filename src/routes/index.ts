import express from 'express';
import testRoutes from './test.router';
import serviceRoutes from './service.router';

const appRoutes = () => {
  const router = express.Router();  
  router.use('/test', testRoutes)
  router.use('/service', serviceRoutes)

  return router;
};

export default appRoutes;
