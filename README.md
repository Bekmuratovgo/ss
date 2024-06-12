\\ @senrymori

# Установка и запуск

Для установки всех зависимостей проекта:

1. yarn install
2. cd ios
3. pod install

# Первоначальная настройка (для нового проекта)

--- Переименование шаблона ---

1. npx react-native-rename-config "НазваниеПроекта" -b здесь.написать.бандл
2. watchman watch-del-all

Подробнее тут:

- v0.70+ - react-native-rename-config: https://github.com/grzmot22/react-native-rename-config#readme
- до v0.70 - react-native-rename: https://github.com/junedomingo/react-native-rename#readme

* Возможные ошибки при pod install: CocoaPods requires your terminal to be using UTF-8 encoding - after latest flutter
  upgrade

Решение:

1. Открыть Terminal
2. Прописать: open ~/.zshrc (или open ~/.profile если не используете zsh)
3. В файле прописываем: export LANG=en_US.UTF-8 export LANGUAGE=en_US.UTF-8 export LC_ALL=en_US.UTF-8
4. Сохраняем файл
5. Удалить Podfile.lock
6. Перезагрузить mac

------ Загрузочный экран / Bootsplash -------

1. Логотип расположить в папку assets
2. Переименовать в logo.png
3. Выполнить команду: yarn react-native generate-bootsplash assets/logo.png --background-color=FFFFFF --logo-width=120
4. Для настройки в ios: https://github.com/zoontek/react-native-bootsplash#ios-1

----- Иконка приложения -----

- Все размеры генерируются на сайте: https://www.appicon.co/
- p.s: для android стоит сгенерировать как is_launer, так и ic_launcher_round

----- Подготовка к сборке (релиз версии) -----

В android > gradle.properties есть настройки для release.keystore:

- MYAPP_RELEASE_STORE_FILE=release.keystore
- MYAPP_RELEASE_KEY_ALIAS=template
- MYAPP_RELEASE_STORE_PASSWORD=template
- MYAPP_RELEASE_KEY_PASSWORD=template

чтоб изменить под новый проект:

- перейти в android > app
- выполнить keytool -genkey -v -keystore release.keystore -alias template -keyalg RSA -keysize 2048 -validity 10000

более подробно:
https://stackoverflow.com/questions/35935060/how-can-i-generate-an-apk-that-can-run-without-server-with-react-native
