# Web-приложение «Индивидуальный план внеучебной деятельности ППС»

## Курсовой проект на курсе Tinkoff Fintech School, Frontend, весна 2022
Выполнила: Окладникова Ольга Дмитриевна  
https://github.com/TFSchool/coursework-hathawway

## Описание проекта

Задача проекта: автоматизация бизнес - процесса в образовательных организациях по формированию и заполнению ППС индивидуальных планов внеучебной деятельности.

Целевая аудитория проекта: ППС образовательных организаций.

Функциональные возможности проекта:
1.	Регистрация пользователей в соответствии с ролью.
    Роли: администратор, сотрудник УМУ, завкаф., ППС. Для обеспечения безопасности данных в БД пароль хранится в виде хэшированного значения.

Функция - Роль.

Администрирование учетных записей пользователя (регистрация+редактирование) - Администратор.

Заполнение и корректировка справочников - Администратор, Сотрудник УМУ.

Формирование штатного расписания - Завкаф.

Мониторинг ИП - Завкаф.

Заполнение ИП - ППС.


2.	Авторизация пользователей.
    Аутентификация пользователя реализована посредством jwt токена.
3.	Обработка, хранение и управление данными:
    a.	Заполнение справочников.
    b.	Формирование штатного расписания кафедры
    c.	Формирование индивидуального плана

Ввод и редактирование информации осуществляется через пользовательский интерфейс и сохраняется в БД.
Используемый стэк-технологий: Express.js + Angular + Postgresql.

Примечание: ППС – профессорско-преподавательский состав
