## Установка

* Клонируем репозиторий
```bash
git clone git@github.com:reptily/domyland.frontend.git
```

* Переходим в директорию с проектом
```bash
cd domyland.frontend
```

* Устанавливаем все зависимости
```bash
npm install
```

* Для конфигурации адреса backend нужно изменить адрес в файле nuxt.config.js
```js
proxy: {
    '/api/': { target: 'http://127.0.0.1:8000/api/', pathRewrite: {'^/api/': ''} }
  }
```

* Для запуска режима разработуи
```bash
npm run dev
```

* Для сборке проекта
```bash 
npm run build
npm run start
```

* Для генерации статичных фалов
```bash
npm run generate
```
## Демо
Демонстрационная версия доступна по адресу http://go2ride.asuscomm.com:8000/ \
Логин: demo\
Пароль: demo
