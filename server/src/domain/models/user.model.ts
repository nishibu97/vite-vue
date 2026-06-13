export type User = {
  id: string;
  name: string;
  kana: string;
  email: string;
  password: string;
  createdAt: Date;
  deletedAt: Date | null;
};
