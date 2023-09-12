export type ITemplate = {
  /**
   * @param title {string} - subject of the template
   */
  title: string;
  /**
   * @param title {string} - text version of template, usually used in sms
   */
  text: string;
  /**
   * @param title {string} - html version of template, usually used in emails
   */
  html: string;
  /**
   * @param title {string} - keyof template, key should be in the format of [service]-[template]
   */
  slug: string;
};
