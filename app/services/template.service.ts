import { injectable } from 'tsyringe';
import { Types } from 'mongoose';
import { LoggerService } from './logger.service';
import { writeFile } from 'fs/promises';
import { TemplateModel } from '../model/template.model';
import { ITemplate } from '../types/Types/ITemplate';
import ResponseMessages from '../lib/response-messages';

@injectable()
export class TemplateService {
  constructor(private logger: LoggerService) {}
  public findHome = async (req, res) => {
    this.logger.log('notification service');
    return res.json({ message: "hi i'm sending a message" });
  };

  public addTemplate = async (req, res) => {
    const { text, title, html, slug } = req.body;
    const slugTrim = slug.toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')

    try {
      const payload: ITemplate = {
          text,
          title,
          html,
          slug: slugTrim,
        },
        query = { title },
        options = { upsert: true, new: true },
        // Find the document
        data = await TemplateModel.findOneAndUpdate({slug: slugTrim}, { ...payload }, options);
      if (!data) {
        return res.status(400).json({
          status: ResponseMessages.STATUS_FAILED,
          message: ResponseMessages.TEMPLATE_CREATION_FAILED,
        });
      }

      return res.status(200).json({
        status: ResponseMessages.STATUS_SUCCESS,
        data,
        message: ResponseMessages.TEMPLATE_CREATED,
      });
    } catch (error) {
      this.logger.log(error);
    }
  };

  public fetchTemplate = async (req, res) => {
    const { slug } = req.params;
    let data: ITemplate & {
      _id: Types.ObjectId;
    };

    if (slug) {
      data = await TemplateModel.findOne({
        slug,
      }).exec();
    }

    if (!data) {
      return res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data,
        message: ResponseMessages.NOT_FOUND,
      });
    }

    return res.status(200).json({
      status: ResponseMessages.STATUS_SUCCESS,
      data,
      message: ResponseMessages.TEMPLATE_RECEIVED,
    });
  };

  public fetchAllTemplates = async (req, res) => {
    let data = await TemplateModel.find({}).exec();
    /// TODO: add pagination
    if (!data) {
      return res.status(400).json({
        status: ResponseMessages.STATUS_FAILED,
        data,
        message: ResponseMessages.NOT_FOUND,
      });
    }
    return res.json({
      status: ResponseMessages.STATUS_SUCCESS,
      data,
      message: ResponseMessages.TEMPLATE_RECEIVED,
    });
  };

  public async getTemplateFromSlug(slug: string): Promise<ITemplate> {
  return await TemplateModel.findOne({ slug }).exec()
  }
}
