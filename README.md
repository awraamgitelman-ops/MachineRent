# 🚜 AGRORENT PRO — High-Performance Agro Machinery Rental Platform

Сучасна платформа оренди важкої польової та овочевої сільськогосподарської техніки згідно з **Архітектурним Blueprint (High-Performance Catalog & LeadGen Engine)** та на базі каталогу [Adena Agro](https://adenaagro.com/product-category/field/).

---

## 🛠️ Технологічний стек

- **Frontend**: React 18 (SPA) + Vite + Lucide Icons + Leaflet (Interactive Map)
- **Styling**: Scoped CSS & Design Tokens (`:root` змінні, темна агрономічна тема, оверлеї статусу «В ОРЕНДІ»)
- **Backend**: Node.js (Express)
  - 🤖 Lead Pipeline (`POST /api/send-lead`)
  - 🛡️ Anti-CORS Media Streamer (`GET /api/media/:encodedUrl`)
  - 📁 Static SPA Fallback Server
- **Hosting / Deploy**: GitHub ➔ Railway (Zero-config CI/CD)

---

## 🚀 Ключові можливості

1. **Client-Side In-Memory Data Layer (0 мс затримки)**:
   - Миттєва фільтрація за категоріями, брендами (Grimme, Struik, Baselier, Dewulf, John Deere, Claas, Horsch, Lemken), потужністю (к.с.), ціною, локаціями та повнотекстовим пошуком.
2. **Статусна система об'єктів (Active / Rented)**:
   - Техніка зі статусом `isRented: true` відображається зі стильним графітовим блюр-оверлеєм, діагональною штриховкою, бейджем **«В ОРЕНДІ»** та датою очікуваного звільнення.
3. **Інтерактивний калькулятор робіт**:
   - Розрахунок за зміну (10 год), за гектар (га) або подобово.
   - Оптові знижки від обсягу (-5%, -10%, -15%).
   - Послуги сертифікованого оператора та логістика важким тралом по областях України.
   - Мультивалютність: перемикання UAH (₴), USD ($), EUR (€).
4. **Смарт-форма бронювання**:
   - Пресети дат («Сьогодні», «Завтра», календар) та робочих змін («Денна», «Нічна», «24/7»).
   - Авто-форматування українських номерів (`+380 (XX) XXX-XX-XX`).
   - Миттєва генерація цифрової квитанції із номером броні.
5. **Інтерактивна гео-карта (Leaflet)**:
   - 7 стратегічних агро-хабів по Україні (Київ, Вінниця, Полтава, Черкаси, Дніпро, Львів, Одеса) з відображенням наявної техніки та тралів.

---

## 🌐 Розгортання на Railway (Deployment)

Проєкт повністю налаштовано для автоматичного деплою на **Railway**:

1. Зайдіть на [railway.app](https://railway.app)
2. Натисніть **«New Project»** ➔ **«Deploy from GitHub repo»**
3. Виберіть репозиторій `awraamgitelman-ops/MachineRent`
4. Railway автоматично розпізнає `railway.json` / `Procfile`, виконає `npm install && npm run build` та запустить сервер через `npm start`.
5. У розділі **Settings** ➔ **Networking** натисніть **«Generate Domain»** для отримання публічного HTTPS-посилання.

---

## 💻 Локальний запуск

```bash
# Встановлення залежностей
npm install

# Запуск Vite Dev сервера
npm run dev

# Збірка production бандла
npm run build

# Запуск повноцінного Express сервера
npm start
```
