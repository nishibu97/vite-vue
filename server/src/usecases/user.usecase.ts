import { userRepository } from '../infrastructure/repositories/user.repository'

export const userUseCase = {
  getUsers: async () => {
    const users = await userRepository.findAll()

    // 【ビジネスロジック】
    // ここでデータを加工したり、フィルタリングしたりする
    // 例: 削除されていないユーザーだけを返す
    return users.filter((user) => user.deletedAt === null)
  },
}
