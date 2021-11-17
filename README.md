# Получаем и выводим весь список контактов в виде таблицы

node index.js --action list
https://monosnap.com/file/BRgFLkGeTLbPx02JVcjgR9D8JF3yh4

# Получаем контакт по id

node index.js --action get --id 5
https://monosnap.com/file/Ey4Jepy6KrwfmNsgsTEtXKXfbaGane

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22
https://monosnap.com/file/IGYMapludcTLwLKQGQP3YytarUCVNc

# Удаляем контакт

node index.js --action remove --id=3
https://monosnap.com/file/8MKmjdwr0fmaeU5ice283hHByN29Ub
