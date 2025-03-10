import express from 'express';
import testRoutes from './test.router';
import serviceRoutes from './service.router';
import userRoutes from './user.router';
import jobRoutes from './jobPost.router'

const appRoutes = () => {
  const router = express.Router();  
  router.use('/test', testRoutes)
  router.use('/service', serviceRoutes);
  router.use('/user', userRoutes)
  router.use('/job-post' , jobRoutes);
  
  
  return router;
};

export default appRoutes;
