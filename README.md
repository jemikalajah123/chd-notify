# Notification Service

## Template

> <br>The template module is rendered using handlebars syntax, you can check the documentation for more info. [Handlebars](https://handlebarsjs.com/) 
<br>


### Create a template

> <br>You get access to the name of the user using the user object by doing `{{user.firstName}}` `{{user.lastName}}`
> the firstName and lastName is only needed when you need to personalize a notification.
<br>

```json
{
  "title": "Hello World",
  "slug": "hello",
  "text": "Hello {{user.firstName}}, use the below OTP to verify your account. \n {{code}}",
  "html": "<div><p>Hello {{user.firstName}}, use the below OTP to verify your account. <br> {{code}}</p></div>"
}
```


## Sending
### sample payload with HTML

```json
    {
      "title": "Verify Email",
      "priority": IMessagePriority.HIGH,

      "data": { code: '698657' },
      "messageId": uid(20),
      "channels": [IChannel.EMAIL],
      // text: '',
      // template: '',
      "recipients": [
        {
          "firstName": "test",
          "lastName": "yet",
          "email": "xx@gmail.com",
        },,
        {
          "firstName": "Ade",
          "lastName": "Yemi",
          "email": "a@b.com",
        },
      ],
      "webhook": '',
      // sendIndividually: false
    }
```

### sample payload with template

```json
    {
      "priority": IMessagePriority.HIGH,
      "data": { code: '698657' },
      "messageId": uid(20),
      "channels": [IChannel.EMAIL],
      "template": 'email-verification',
      "recipients": [
         {
          "firstName": "test",
          "lastName": "yet",
          "email": "xx@gmail.com",
        },,
        {
          "firstName": "Ade",
          "lastName": "Yemi",
          "email": "a@b.com",
        },
      ],
      "webhook": ''
    }
```

### sample payload with template, override title

```JSON
{
      "title": "verify email",
      "priority": IMessagePriority.HIGH,
      "data": { code: '698657' },
      "messageId": uid(20),
      "channels": [IChannel.EMAIL],
      // text: '',
      // template: '',
      "recipients": [
        {
          "firstName": "test",
          "lastName": "yet",
          "email": "xx@gmail.com",
        },
        {
          "firstName": "Ade",
          "lastName": "Yemi",
          "email": "a@b.com",
        },
      ],
    }
```

### sample SMS

```JSON
{
      "title": "verify phone number",
      "priority": IMessagePriority.HIGH,
      "data": { code: '698657' },
      "messageId": uid(20),
      "channels": [IChannel.SMS],

      "recipients": [
        {
          "firstName": "buruku",
          "lastName": "ode",
          "phone": "23480000000",
        }

      ],
    }
```