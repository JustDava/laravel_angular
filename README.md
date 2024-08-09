# laravel_angular

## Команды для запуска приложения
    
    docker-compose up -d - Собирает контейнер
    docker-compose exec laravel_angular-app php students-app/artisan migrate - Запускает миграцию БД

После сборки контейнера, приложение будет доступно из-под адреса http://localhost:4000
    
PMA доступен по адресу http://localhost:8080