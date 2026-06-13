import { sign } from "hono/jwt";
import { userRepository } from "../infrastructure/repositories/user.repository";
import { mockVerifyPassword } from "../utils/hash.util";

// 本来は環境変数に入れるべき秘密鍵
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set");
}

export const authUseCase = {
  login: async (email: string, password: string) => {
    // 1. ユーザーの存在確認
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    // 2. 削除済みユーザーのチェック
    if (user.deletedAt) {
      throw new Error("User is deleted");
    }

    // 3. パスワードの検証
    // リクエスト: password123
    // Mock DB: hashed_password123
    const isValidPassword = await mockVerifyPassword(password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    // 4. トークン(JWT)の発行
    const payload = {
      sub: user.id,
      name: user.name,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // 12時間後に期限切れ
    };

    const token = await sign(payload, JWT_SECRET);
    return token;
  },
};
