import express, { Router, Application } from 'express';
import { container } from 'tsyringe';
import TemplateController from '../controller/template.controller';
import TemplateValidator from '../validators/template.validator';

const TemplateRouter: Router = express.Router();
const templateController: any = container.resolve(TemplateController);
const templateValidator: any = container.resolve(TemplateValidator);

TemplateRouter.get('/gethome', templateController.getHome)
  .post(
    '/add',
    templateValidator.validateTemplateInput,
    templateController.addTemplate
  )
  .get('/:slug', templateController.fetchTemplate)
  .get('/', templateController.fetchAllTemplates);

export default TemplateRouter;
