export interface IRecipientDraft {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  pushToken?: string[];
}

export interface IRecipient extends Partial<IRecipientDraft> {}
