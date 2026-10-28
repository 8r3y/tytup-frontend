# inwave-panel

Учебный фронтенд мини-видеохостинга на **Vue 3 + Vite + TypeScript**: лента видео, просмотр по HLS и загрузка роликов на сервер.

Проект собирался как песочница для изучения современного стека Vue и для этого он и полезен: это небольшой, но законченный сценарий «список → просмотр → загрузка», который удобно читать целиком за вечер.

## Чем может быть полезен

- **HLS-плеер во Vue без сторонних обёрток.** В [SeeVideoView.vue](src/views/public/main-stack/SeeVideoView.vue) показано, как подключить [hls.js](https://github.com/video-dev/hls.js) к обычному `<video>`, ограничить буфер (`maxBufferLength`, `backBufferLength`) и откатиться на нативный HLS в Safari.
- **Загрузка файла через `FormData`.** [UploadVideoFormView.vue](src/views/public/main-stack/UploadVideoFormView.vue) показывает форму с выбором файла, проверкой размера на клиенте (до 50 МБ) и отправкой `multipart/form-data` через axios.
- **Pinia в стиле setup-stores.** Хранилища в [src/stores](src/stores) написаны через `defineStore(id, () => {...})` с `ref`/`computed`, с общим реэкспортом из `index.ts`.
- **Composition API и Options API в одном проекте.** В проекте есть и `<script setup>`, и классические компоненты с `data`/`mounted`, так что видно, как они уживаются.
- **Готовая инфраструктура из `create-vue`.** Уже настроены Vitest, Nightwatch (e2e и компонентные тесты), ESLint и Prettier.

## Возможности

| Экран | Маршрут | Что делает |
| --- | --- | --- |
| Все видео | `/` | Сетка карточек с превью, длительностью, автором и просмотрами |
| Рекомендованные | `/recomendations` | Та же лента (заготовка под отдельную выдачу) |
| Просмотр | `/video/:videoId` | HLS-плеер и описание ролика |
| Загрузка | `/upload-video` | Форма: название, описание, файл ≤ 50 МБ |
| 404 | `*` | Страница «Ничего тут нет» |

Интерфейс на русском языке.

## Ограничения

Это песочница, а не готовый продукт:

- **Бэкенда в репозитории нет.** Нужен сервер, реализующий [API ниже](#api-бэкенда).
- **Авторизация — заглушка.** `auth-store` через 2 секунды выставляет фейковый токен, экран `/login` пустой, а ссылки «Мои видео» и «Мой профиль» ведут на страницу 404.
- **Вёрстка рассчитана на десктоп** (плеер фиксированной ширины 1280px).
- **Тестов немного:** юнит-тесты карточки видео и e2e-проверка каркаса и страницы 404.

## Быстрый старт

Требуется Node.js 18+.

```sh
npm install
cp .env.example .env.local   # укажите адрес своего бэкенда
npm run dev                  # http://localhost:5173
```

### Переменные окружения

| Переменная | Описание |
| --- | --- |
| `VITE_API_BASE_URL` | Базовый URL бэкенда без завершающего слэша, например `https://api.example.com`. Если не задан, запросы идут на тот же домен, где открыт фронтенд. |

## API бэкенда

Фронтенд ожидает три эндпоинта:

| Метод | Путь | Запрос | Ответ |
| --- | --- | --- | --- |
| `GET` | `/video-list` | — | `{ "result": { "items": VideoCard[] } }` |
| `GET` | `/video-info/:videoId` | — | `{ "result": VideoCard }` |
| `POST` | `/upload-video` | `multipart/form-data`: `video` (файл), `name`, `description` | `{ "result": string }` или `{ "error": string }` |

Формат `VideoCard` (см. [app-types.d.ts](app-types.d.ts)):

```ts
type VideoCard = {
  id: string
  name: string
  url: string          // ссылка на HLS-манифест (.m3u8)
  duration: string     // строка для отображения, например "12:34"
  author: string
  preview?: string     // URL превью; показывается только если начинается с https://
  views?: string
  createdAt: number
  description: string
}
```

Если фронтенд и бэкенд на разных доменах, на сервере нужно разрешить CORS.

## Скрипты

| Команда | Что делает |
| --- | --- |
| `npm run dev` | Dev-сервер с hot reload (слушает `0.0.0.0:5173`) |
| `npm run build` | Проверка типов и production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр production-сборки |
| `npm run test:unit` | Юнит-тесты (Vitest) |
| `npm run test:e2e` | E2E-тесты (Nightwatch); на CI сначала выполните `npm run build` |
| `npm run lint` | ESLint с автоисправлением |
| `npm run format` | Prettier для `src/` |

## Структура

```
src/
├── components/
│   ├── main-layout/     # каркас: верхняя и левая навигация
│   └── VideoCard.vue    # карточка видео в ленте
├── constants/           # API_BASE_URL из переменных окружения
├── router/              # маршруты (vue-router, ленивая загрузка экранов)
├── stores/              # Pinia: video-store, auth-store
└── views/public/
    └── main-stack/      # лента, просмотр, загрузка
```

## Стек

Vue 3.3 · Vite 4 · TypeScript 5 · Pinia · Vue Router 4 · axios · hls.js · SCSS · Vitest · Nightwatch

## Рекомендуемая настройка IDE

[VS Code](https://code.visualstudio.com/) + расширение [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (бывший Volar). Vetur нужно отключить.

## Лицензия

[MIT](LICENSE)
