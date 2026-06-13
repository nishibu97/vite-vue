import type { User } from "../../domain/models/user.model";

// モックデータ
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "山田 太郎",
    kana: "ヤマダ タロウ",
    email: "taro@example.com",
    password: "hashed_password123",
    createdAt: new Date("2024-01-01T10:00:00Z"),
    deletedAt: null,
  },
  {
    id: "2",
    name: "鈴木 花子",
    kana: "スズキ ハナコ",
    email: "hanako@example.com",
    password: "hashed_password123",
    createdAt: new Date("2024-02-15T12:00:00Z"),
    deletedAt: null,
  },
  {
    id: "99",
    name: "削除 済子",
    kana: "サクジョ スミコ",
    email: "deleted@example.com",
    password: "hashed_password123",
    createdAt: new Date("2023-12-01T09:00:00Z"),
    deletedAt: new Date("2024-01-20T00:00:00Z"), // 削除済み
  },
];

export const userRepository = {
  // 全ユーザーを取得する
  findAll: async (): Promise<User[]> => {
    // 本来はここで prisma.user.findMany() などを呼ぶ
    return MOCK_USERS;
  },
  findByEmail: async (email: string): Promise<User | undefined> => {
    return MOCK_USERS.find((user) => user.email === email);
  },
};
