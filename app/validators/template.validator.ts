import { injectable } from 'tsyringe';
import { checkSchema } from 'express-validator';
import validate from '../lib/validate';

@injectable()
class TemplateValidator {
  validateTemplateInput = validate(
    checkSchema({
      title: {
        in: ['body'],
        isString: {
          errorMessage: 'Title must be a string',
        },
        isLength: {
          options: { min: 3 },
          errorMessage: 'Title should be at least 3 characters long',
        },
        trim: true,
      },
      slug: {
        in: ['body'],
        isString: {
          errorMessage: 'Slug must be a string',
        },
        isLength: {
          options: { min: 3 },
          errorMessage: 'Slug should be at least 3 characters long',
        },
        trim: true,
        toLowerCase: true,
      },
      text: {
        in: ['body'],
        trim: true,
        isString: {
          errorMessage: 'Text must be a string',
        },
        isLength: {
          options: { min: 3 },
          errorMessage: 'Text should be at least 3 characters long',
        },
      },
      html: {
        in: ['body'],
        trim: true,
        isString: {
          errorMessage: 'Html must be a string',
        },
        isLength: {
          options: { min: 3 },
          errorMessage: 'Html should be at least 3 characters long',
        },
      },
    })
  );
}
export default TemplateValidator;
