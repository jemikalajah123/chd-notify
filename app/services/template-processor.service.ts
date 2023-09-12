import { compile } from 'handlebars';

export class TemplateProcessorService {
  render(text: string, data: object): string {
    let template = compile(text);
    return template(data, { data, allowProtoPropertiesByDefault: true });
  }
}
