import { injectable } from 'tsyringe';
import { TemplateService } from '../services/template.service';

@injectable()
class TemplateController {
  constructor(private templateService: TemplateService) {}
  getHome = async (req, res) => {
    await this.templateService.findHome(req, res);
  };

  addTemplate = async (req, res) => {
    await this.templateService.addTemplate(req, res);
  };

  fetchTemplate = async (req, res) => {
    await this.templateService.fetchTemplate(req, res);
  };

  fetchAllTemplates = async (req, res) => {
    await this.templateService.fetchAllTemplates(req, res);
  };
}

export default TemplateController;
