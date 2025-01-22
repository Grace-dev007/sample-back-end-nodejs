import express from 'express';
import testRoutes from './test.router';
import serviceRoutes from './service.router';
import userRoutes from './user.router';

const appRoutes = () => {
  const router = express.Router();  
  router.use('/test', testRoutes)
  router.use('/service', serviceRoutes);
  router.use('/user', userRoutes)

  return router;
};

export default appRoutes;
