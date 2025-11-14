// src/app/models/project.model.ts

/**
 * Модель шаблона проекта (типовой проект дома)
 * Это то, что видит клиент в каталоге и выбирает
 */
export interface Project {
  id: number;                   // Уникальный идентификатор проекта
  name: string;                 // Название проекта: "Дом Альфа", "Коттедж Бета"
  description: string;          // Подробное описание проекта
  price: number;                // Стоимость строительства
  imageUrl: string;             // URL главного изображения дома
  planUrl?: string;             // URL плана дома (опционально)
  specifications: string;       // Характеристики: "120м², 2 этажа, 4 спальни"
  area: number;                 // Площадь в м²
  bedrooms: number;             // Количество спален
  bathrooms: number;            // Количество санузлов
  createdAt: Date;              // Дата добавления в каталог
}

/**
 * Модель для создания нового проекта (админом)
 */
export interface CreateProjectRequest {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  planUrl?: string;
  specifications: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
}