import { injectable } from 'tsyringe';
import { checkSchema, Meta } from 'express-validator';
import validate from '../lib/validate';
import { IMessagePriority } from '../types/Model/i-message-priority';

@injectable()
class MessageValidator {
  validateInput = validate(
    checkSchema({
       
      priority: {
        in: ['body'],
        isString: {
          errorMessage: 'Priority must be a String',
        },
        custom: {
          errorMessage: `Priority must be any containing any of ${Object.values(
            IMessagePriority
          )}`,
          options: (value: IMessagePriority) => {
            return Object.values(IMessagePriority).includes(value);
          },
        },
        contains: {
          // options: [Object.values(IChannel)],

          errorMessage: `Priority must be any of ${Object.values(IMessagePriority)}`,
        },
        trim: true,
      },
      html: {
        in: ['body'],
        trim: true,
        isString: {
          errorMessage: 'Html must be a string',
        },
        exists: { bail: true },
      },
    })
  );
}
export default MessageValidator;
