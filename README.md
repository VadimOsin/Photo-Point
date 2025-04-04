# Каталог товаров

Тестовое задание для позиции Frontend Developer (React/Next.js)
https://photo-point-osin.netlify.app/
## Описание

Каталог товаров - это веб-приложение, которое позволяет просматривать список товаров, искать их по названию, фильтровать по категориям и управлять корзиной покупок.

## Функциональность

- Просмотр списка товаров
- Поиск товаров по названию
- Фильтрация товаров по категориям
- Добавление товаров в корзину
- Управление количеством товаров в корзине
- Удаление товаров из корзины
- Расчет общей стоимости заказа

## Технологии

- React
- Material UI
- React Router
- Zustand (управление состоянием)
- Axios (работа с API)

## Установка и запуск

1. Клонируйте репозиторий:
```bash

```

2. Установите зависимости:
```bash
yarn install
```

3. Запустите проект в режиме разработки:
```bash
yarn dev
```

4. Откройте [http://localhost:5173](http://localhost:5173) в браузере.

## Сборка для продакшена

```bash
yarn build
```

## Структура проекта

```
src/
  ├── api/          # API запросы
  ├── components/   # Переиспользуемые компоненты
  ├── pages/        # Страницы приложения
  ├── store/        # Управление состоянием
  └── utils/        # Вспомогательные функции
```

## API

Проект использует [FakeStore API](https://fakestoreapi.com/) для получения данных о товарах.
