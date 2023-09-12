import { Router } from 'express';
import { default as TemplateRouter } from './template';
import { default as MessageRouter } from './message';

export const Routes = Router();

 

Routes.use('/v1/template', TemplateRouter);
Routes.use('/v1/message', MessageRouter); 

 

 
