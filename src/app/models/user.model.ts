// src/app/models/user.model.ts

/**
 * Модель пользователя системы
 * Будет использоваться для регистрации, входа и отображения профиля
 */
export interface User {
  id: string;            // Уникальный идентификатор (согласуем с API: AspNetUsers.Id — nvarchar(450))
  email: string;         // Email для входа и связи
  password?: string;     // Пароль (только при регистрации, не хранится на фронте)
  fullName: string;      // Полное имя пользователя
  phone?: string;        // Телефон для связи
  role: 'Admin' | 'Client' | 'Contractor';  // Роль в системе
  createdAt?: Date;      // Дата регистрации
}

/**
 * Модель для запроса регистрации нового пользователя
 */
export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: 'Client' | 'Contractor';  // При регистрации нельзя стать админом
}

/**
 * Модель для ответа после успешной авторизации
 */
export interface AuthResponse {
  user: User;            // Данные пользователя
  token: string;         // JWT токен для последующих запросов
}
