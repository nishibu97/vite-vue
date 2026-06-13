import * as bcrypt from "bcrypt";

/**
 * SHA-256を使った仮ハッシュ化（本番ではbcrypt）
 */
export const mockHashPassword = async (password: string): Promise<string> => {
  // password123 -> hashed_password123 という形式に変換
  return `hashed_${password}`;
};

/**
 * パスワード検証
 */
export const mockVerifyPassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  const hashed = await mockHashPassword(plainPassword);
  return hashed === hashedPassword;
};

// const SALT_ROUNDS = 10;

// /**
//  * パスワードをハッシュ化
//  */
// export const hashPassword = async (password: string): Promise<string> => {
//   return await bcrypt.hash(password, SALT_ROUNDS);
// };

// /**
//  * パスワード検証
//  */
// export const verifyPassword = async (
//   plainPassword: string,
//   hashedPassword: string
// ): Promise<boolean> => {
//   return await bcrypt.compare(plainPassword, hashedPassword);
// };
