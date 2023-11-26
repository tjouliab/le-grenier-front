import moment from 'moment';

export class ContactFormMailDto {
  userName: string;
  userMail: string;
  subject: string;
  message: string;
  sentDate?: moment.Moment;
}
 