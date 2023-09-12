import { injectable } from 'tsyringe';

@injectable()
class ResponseMessages {
  public static TEMPLATE_CREATED = 'template added successfully';
  public static TEMPLATE_CREATION_FAILED =
    'An error occurred while attempting to create/update template';
  public static BAD_REQUEST = 'Bad Request';
  public static STATUS_SUCCESS = 'success';
  public static STATUS_FAILED = 'failed';
  public static NOT_FOUND = 'Data not found';
  public static TEMPLATE_RECEIVED = 'Template received';
  public static NOTIFICATION_QUEUED = 'Notification queued';
  public static TEMPLATE_NOT_FOUND = 'Template does not exist, please create template and try again';
};

export default ResponseMessages;
