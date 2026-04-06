# Дизайн-спецификация сайта «Teachings By Sumati»
# Полное техническое задание для разработки в Replit

---

## 1. ОБЩАЯ КОНЦЕПЦИЯ

**Название:** Teachings By Sumati
**Стиль:** Минимализм, современный, premium-feel
**Цветовая схема:** Белый (#FFFFFF) + Бордовый (#7A1B2E) + акценты
**Ощущение:** Дорогой, спокойный, созерцательный сайт с плавными анимациями
**Тип:** Многостраничный адаптивный сайт (SPA или MPA)

---

## 2. ЦВЕТОВАЯ ПАЛИТРА

```
Primary (бордовый):     #7A1B2E
Primary Light:          #9E3A4F
Primary Dark:           #5C0E1F
Primary Hover:          #8F2540

Background:             #FFFFFF
Background Secondary:   #F8F6F4 (тёплый кремовый для секций)
Background Tertiary:    #F0EDEA (для карточек при hover)

Text Primary:           #1A1A1A
Text Secondary:         #6B6B6B
Text Tertiary:          #9A9A9A
Text on Burgundy:       #FFFFFF
Text on Burgundy Muted: #E8C6CE

Borders:                #E5E2DF
Borders Light:          #F0EDEA
Borders on Hover:       #D1CCC7

Accent Gold:            #C4973B (для мелких акцентов, иконок)
Success:                #2D7A4F
```

---

## 3. ТИПОГРАФИКА

```
Заголовки (Hero, H1):
  Font: "Playfair Display" или "Cormorant Garamond" (serif, элегантный)
  Hero Title: 72px / desktop, 48px / tablet, 36px / mobile
  Weight: 300 (light) или 400

Подзаголовки (H2):
  Font: "Inter" или "DM Sans" (sans-serif, чистый)
  Size: 36px / desktop, 28px / tablet, 24px / mobile
  Weight: 500

H3:
  Font: "Inter"
  Size: 24px / desktop, 20px / tablet, 18px / mobile
  Weight: 500

Body Text:
  Font: "Inter"
  Size: 16px / desktop, 15px / tablet, 14px / mobile
  Weight: 400
  Line-height: 1.7
  Color: #1A1A1A

Small Text / Captions:
  Font: "Inter"
  Size: 13px
  Weight: 400
  Color: #6B6B6B

Navigation:
  Font: "Inter"
  Size: 15px
  Weight: 500
  Letter-spacing: 0.02em
```

---

## 4. BREAKPOINTS (Auto Layout)

```
Desktop XL:    1440px+ (max-width контента: 1200px)
Desktop:       1024px – 1439px
Tablet:        768px – 1023px
Mobile:        320px – 767px

Контейнер:
  Desktop: max-width 1200px, padding 0 40px
  Tablet:  padding 0 32px
  Mobile:  padding 0 20px
```

---

## 5. БОКОВОЕ МЕНЮ (Sidebar Navigation)

### Поведение:
- На ДЕСКТОПЕ: меню скрыто за кнопкой-гамбургером в верхнем левом углу
- При клике — меню выезжает слева (ширина 320px) с backdrop-blur overlay
- На МОБИЛЬНОМ: меню занимает весь экран (100vw)
- Анимация: slide-in 0.3s ease-out + fade-in overlay

### Верхняя часть меню:
```
┌─────────────────────────┐
│  ✕                       │  ← Кнопка закрытия (24px, справа)
│                          │
│  TEACHINGS BY SUMATI     │  ← Логотип / название (serif, 18px, бордовый)
│                          │
│  ─────────────────────   │  ← Тонкая линия-разделитель
│                          │
│  🏠  Главная             │  ← Пункты меню
│  📖  Курсы ACI           │     Font: Inter 16px, weight 400
│  🧘  Практики            │     Высота пункта: 52px
│  🏔  Ретриты             │     Hover: фон #F8F6F4
│  📅  Мероприятия         │     Active: бордовый текст + левая полоска 3px
│  🔗  Проекты             │
│                          │
│  ─────────────────────   │
│                          │
│  🌐  EN / RU             │  ← Переключатель языка (toggle)
│                          │
└─────────────────────────┘
```

### Кнопка-гамбургер (всегда видна):
```
Позиция: fixed, top: 24px, left: 24px
Размер: 44x44px (touch target)
Иконка: 3 линии, каждая 24px шириной, 2px высотой, цвет #1A1A1A
На Hero-секции: цвет #FFFFFF (потому что фон тёмный)
Z-index: 1000
Background: transparent (на Hero), белый круг с тенью (на остальных страницах)
Анимация при открытии: 3 линии трансформируются в ✕
```

### Overlay при открытом меню:
```
Background: rgba(0, 0, 0, 0.4)
Backdrop-filter: blur(4px)
Клик по overlay = закрытие меню
```

---

## 6. HEADER (верхняя панель)

### На Hero-секции (главная, первый экран):
- Header прозрачный, поверх видео
- Гамбургер слева (белый)
- Логотип по центру: "TEACHINGS BY SUMATI" (скрыт, т.к. на Hero есть большая надпись)
- Переключатель языка EN/RU справа (белый)

### На всех остальных страницах:
```
Position: sticky, top: 0
Background: rgba(255, 255, 255, 0.95)
Backdrop-filter: blur(12px)
Height: 64px
Border-bottom: 1px solid #E5E2DF
Z-index: 900

Содержимое:
  [☰ Гамбургер]    [TEACHINGS BY SUMATI]    [EN / RU]
  Left: 24px        Center                   Right: 24px
```

### Переключатель языка EN/RU:
```
Тип: pill toggle
Размер: 72px × 32px
Активный язык: фон бордовый, текст белый
Неактивный: фон прозрачный, текст серый
Border-radius: 16px
Transition: background 0.2s ease
```

---

## 7. ГЛАВНАЯ СТРАНИЦА (Home)

Главная — это лендинг из 4 полноэкранных секций + footer.

### ЭКРАН 1 — Hero (полный экран)

```
Размер: 100vh (весь экран)
Background: видео гор (loop, muted, autoplay)
  - Видео: горный пейзаж, облака, восход
  - Overlay: linear-gradient(
      to bottom,
      rgba(0,0,0,0.3) 0%,
      rgba(0,0,0,0.1) 50%,
      rgba(0,0,0,0.5) 100%
    )
  - Если видео не грузится → статичное фото гор с параллакс-эффектом

Контент по центру (flex, center, center):
  "Teachings By Sumati"
  Font: Playfair Display, 72px, weight 300, color #FFFFFF
  Letter-spacing: 0.05em
  Text-shadow: 0 2px 20px rgba(0,0,0,0.3)
  Анимация при загрузке: fade-in + slide-up (0.8s delay, 1s duration)

  Подзаголовок (под названием):
  "Buddhist Teachings in the Mahayana Tradition"
  Font: Inter, 18px, weight 300, color rgba(255,255,255,0.8)
  Анимация: fade-in (1.2s delay)

Внизу экрана:
  Стрелка-индикатор скролла (chevron-down)
  Анимация: bounce вверх-вниз (infinite, 2s)
  Color: rgba(255,255,255,0.6)

Визуальные эффекты:
  - Parallax на видео при скролле (translateY с коэффициентом 0.3)
  - Лёгкий grain/noise overlay для кинематографичности (opacity 0.03)
  - При скролле вниз: текст плавно уменьшает opacity
```

### ЭКРАН 2 — Биография Ламы Сумати

```
Размер: min-height 100vh
Background: #FFFFFF
Padding: 80px 0

Layout (desktop): 2 колонки
  ┌──────────────────┬──────────────────────────────┐
  │                  │                              │
  │   ФОТО           │  ЛАМА СУМАТИ                │
  │   Ламы Сумати    │  ──────────────              │
  │                  │                              │
  │   (круглое или   │  Текст биографии...          │
  │    скруглённый   │  (Inter, 16px, line-height   │
  │    прямоугольник)│   1.8, color #1A1A1A)        │
  │                  │                              │
  │   max-width:     │  Certified ACI Teacher       │
  │   400px          │  Three Year Great Retreat    │
  │                  │  White Tara Practice         │
  │                  │                              │
  └──────────────────┴──────────────────────────────┘

  Колонка фото: 40% ширины, выравнивание по центру
  Колонка текст: 60% ширины

Layout (mobile): 1 колонка
  Фото сверху (max-width 280px, по центру)
  Текст снизу

Фото:
  Border-radius: 16px (или 50% для круглого)
  Box-shadow: 0 20px 60px rgba(0,0,0,0.1)
  Placeholder (пока нет фото): серый блок с иконкой лотоса

Заголовок секции:
  "Лама Сумати" / "Lama Sumati"
  Font: Playfair Display, 36px, weight 400, color #1A1A1A
  Margin-bottom: 8px

Подзаголовок:
  "Certified ACI Teacher · Diamond Mountain"
  Font: Inter, 14px, weight 400, color #9A9A9A
  Margin-bottom: 32px

Анимации при скролле (Intersection Observer):
  - Фото: fade-in + scale(0.95 → 1), duration 0.6s
  - Текст: fade-in + slide-right (20px), duration 0.6s, delay 0.2s
```

### ЭКРАН 3 — Подобрать учение

```
Размер: min-height: 60vh
Background: #F8F6F4 (тёплый кремовый)
Padding: 80px 0
Text-align: center

Заголовок:
  "Подобрать учение" / "Find a Teaching"
  Font: Playfair Display, 36px, color #1A1A1A

Описание:
  "Нажмите кнопку, и мы подберём для вас случайное учение"
  Font: Inter, 16px, color #6B6B6B
  Max-width: 480px, margin: 0 auto

Кнопка:
  "Подобрать для меня" / "Find for me"
  Размер: auto × 56px, padding: 0 40px
  Background: #7A1B2E (бордовый)
  Color: #FFFFFF
  Font: Inter, 16px, weight 500
  Border-radius: 28px (pill shape)
  Hover: background #8F2540, transform scale(1.02)
  Active: transform scale(0.98)
  Box-shadow: 0 4px 20px rgba(122, 27, 46, 0.3)
  Transition: all 0.2s ease

При нажатии:
  1. Кнопка показывает спиннер (0.5s)
  2. Появляется карточка с YouTube-видео (embed)
  3. Анимация: flip или fade-in + slide-up
  4. Под видео: название учения + кнопка "Ещё одно"
```

### ЭКРАН 4 — Проекты Ламы Сумати

```
Размер: auto (по контенту)
Background: #FFFFFF
Padding: 80px 0

Заголовок секции:
  "Проекты" / "Projects"
  Font: Playfair Display, 36px, text-align center

Сетка проектов (desktop: 2–3 колонки, mobile: 1 колонка):
  Grid: repeat(auto-fit, minmax(300px, 1fr)), gap: 24px

Карточка проекта:
  ┌─────────────────────────────────┐
  │                                 │
  │   [Изображение / обложка]       │  ← aspect-ratio: 16/9
  │                                 │
  ├─────────────────────────────────┤
  │                                 │
  │   Название проекта              │  ← Inter, 20px, weight 500
  │   Краткое описание проекта      │  ← Inter, 14px, color #6B6B6B
  │   в 2-3 строки.                 │
  │                                 │
  │   [Перейти →]                   │  ← Ссылка, бордовый цвет
  │                                 │
  └─────────────────────────────────┘

  Background: #FFFFFF
  Border: 1px solid #E5E2DF
  Border-radius: 16px
  Overflow: hidden (чтобы изображение скруглялось)
  Hover: box-shadow 0 8px 30px rgba(0,0,0,0.08), translateY(-4px)
  Transition: all 0.3s ease

Проекты:
  1. «Книга Буддийских Списков» (tbooklists.com)
     Описание: Справочник списков из 18 курсов ACI
     Ссылка: https://www.tbooklists.com/

  2. «6-разовый дневник» (6-Times Diary)
     Описание: Приложение для ежедневной практики
     Ссылка: [ссылка на приложение]

  3. «Teachings by Sarahni»
     Описание: Учения Ламы Сарани
     Ссылка: https://www.teachingsbysarahni.org/
```

---

## 8. FOOTER (Подвал сайта)

```
Background: #7A1B2E (бордовый)
Padding: 60px 0 32px
Color: #FFFFFF

Layout (desktop): 3-4 колонки

┌────────────┬────────────┬────────────┬────────────┐
│ TEACHINGS  │ Навигация  │ Ресурсы    │ Контакт    │
│ BY SUMATI  │            │            │            │
│            │ Главная    │ ACI Online │            │
│ Serif,     │ Курсы ACI  │ Book Lists │ email      │
│ 20px       │ Практики   │ Sarahni    │            │
│            │ Ретриты    │ 6-Times    │            │
│            │ События    │ Diary      │            │
│            │ Проекты    │            │            │
└────────────┴────────────┴────────────┴────────────┘

Ссылки в footer:
  Color: rgba(255, 255, 255, 0.7)
  Hover: rgba(255, 255, 255, 1.0)
  Font: Inter, 14px

Разделитель:
  Border-top: 1px solid rgba(255, 255, 255, 0.15)
  Margin-top: 40px
  Padding-top: 20px

Копирайт:
  "© 2026 Teachings By Sumati. All rights reserved."
  Font: Inter, 13px, color rgba(255, 255, 255, 0.4)
  Text-align: center

Layout (mobile): 1 колонка, текст по центру
```

---

## 9. СТРАНИЦА «КУРСЫ ACI» (/aci-courses)

### Верх страницы:
```
Заголовок:
  "18 ACI Foundation Courses"
  Font: Playfair Display, 42px
  Text-align: center
  Padding-top: 40px

Описание:
  "Базовые курсы Института Азиатской Классики"
  Font: Inter, 16px, color #6B6B6B
  Text-align: center
  Margin-bottom: 48px
```

### Сетка курсов (18 карточек):
```
Desktop: grid 3 колонки, gap 24px
Tablet: grid 2 колонки
Mobile: grid 1 колонка

Карточка курса:
  ┌─────────────────────────────────────┐
  │                                     │
  │   [Обложка курса]                   │  ← aspect-ratio 16/10
  │    ACI 1                            │     Overlay с номером и годом
  │    "Основные учения буддизма"       │     Градиент снизу
  │    2019                             │
  │                                     │
  ├─────────────────────────────────────┤
  │                                     │
  │   ACI 1                             │  ← Inter, 14px, weight 600, #7A1B2E
  │   Основные учения тибетской системы │  ← Inter, 16px, weight 500, #1A1A1A
  │                                     │
  │   ▰▰▰▰▰▰▰▰▱▱  10 занятий          │  ← Полоска-индикатор (декоративная)
  │                                     │
  │   [Подробнее]                       │  ← Ссылка бордовым, 14px
  │                                     │
  └─────────────────────────────────────┘

  Background: #FFFFFF
  Border: 1px solid #E5E2DF
  Border-radius: 16px
  Overflow: hidden
  Cursor: pointer
  Hover: shadow + translateY(-4px)

  Обложка (если нет фото):
    Background: linear-gradient(135deg, #7A1B2E 0%, #C4973B 100%)
    С номером ACI крупным шрифтом по центру (Playfair, 48px, white)
```

### Названия 18 курсов ACI:
```
ACI 1:  The Principal Teachings of Buddhism / Основные учения буддизма
ACI 2:  Buddhist Refuge / Буддийское прибежище
ACI 3:  Applied Meditation / Прикладная медитация
ACI 4:  The Proof of Future Lives / Доказательство будущих жизней
ACI 5:  How Karma Works / Как работает карма
ACI 6:  The Diamond Cutter Sutra / Сутра Алмазного огранщика
ACI 7:  The Vows of a Bodhisattva / Обеты Бодхисаттвы
ACI 8:  Death and the End of Death / Смерть и конец смерти
ACI 9:  The Ethical Life / Этическая жизнь
ACI 10: A Guide to the Bodhisattva's Way of Life / Путь Бодхисаттвы
ACI 11: The Diamond-Cutter Sutra - Advanced / Сутра Алмазного огранщика (продвинутый)
ACI 12: Guide to the Bodhisattva's Way of Life, Part II / Путь Бодхисаттвы, часть II
ACI 13: The Art of Reasoning / Искусство рассуждения
ACI 14: Lojong — Mind Training / Лоджонг — Тренировка ума
ACI 15: What the Buddha Really Meant / Что на самом деле имел в виду Будда
ACI 16: The Great Ideas of Buddhism / Великие идеи буддизма
ACI 17: The Master's Secret Knowledge / Тайное знание Мастера
ACI 18: The Diamond-Cutter Sutra — Deep / Сутра Алмазного огранщика (глубокий)
```

---

## 10. СТРАНИЦА КУРСА (/aci-courses/aci-1)

### Шапка курса:
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  ← Назад к курсам                                          │
│                                                             │
│  ACI 1                                                      │
│  Основные учения тибетской системы                          │
│  The Principal Teachings of Buddhism                        │
│                                                             │
│  10 занятий + обзорный урок                                 │
│                                                             │
│  [Платформа ACI ENG ↗]  [Платформа ACI RUS ↗]              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

Background: #F8F6F4
Padding: 40px
Border-radius: 0 0 24px 24px
```

### Список занятий:
```
Каждое занятие — это строка-карточка:

┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  Занятие 1                                                  │
│  [Название темы занятия, если известно]                     │
│                                                  [Начать →] │
│                                                             │
└─────────────────────────────────────────────────────────────┘

  Background: #FFFFFF
  Border: 1px solid #E5E2DF
  Border-left: 4px solid #7A1B2E (бордовая полоска слева)
  Border-radius: 12px
  Padding: 20px 24px
  Margin-bottom: 12px
  Hover: border-left-color becomes #C4973B (золотой), shadow появляется
  Cursor: pointer

  Номер занятия: Inter, 13px, weight 600, color #7A1B2E
  Название: Inter, 16px, weight 500, color #1A1A1A
  Кнопка "Начать": Inter, 14px, weight 500, color #7A1B2E

Обзорный урок (последний):
  Такая же карточка, но с пометкой "Обзорный урок" / "Review Class"
  Border-left: 4px solid #C4973B (золотая полоска — выделяется)
```

---

## 11. СТРАНИЦА ЗАНЯТИЯ (/aci-courses/aci-1/class-1)

### Навигация между занятиями:
```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│  [← Предыдущий урок]     Занятие 4     [Следующий →]   │
│   Занятие 3.              из 10         Занятие 5.      │
│   Идея иллюзии                          Неправильные    │
│                                         идеи...         │
│                                                         │
└─────────────────────────────────────────────────────────┘

Background: #F8F6F4
Padding: 16px 24px
Border-radius: 12px
Margin-bottom: 24px

Кнопки "← Предыдущий" и "Следующий →":
  Background: transparent
  Border: 1px solid #E5E2DF
  Border-radius: 8px
  Padding: 10px 16px
  Hover: background #F0EDEA
  Текст мелкий серый (13px, #9A9A9A) — название соседнего урока

Центр: "Занятие 4 из 10"
  Font: Inter, 14px, weight 500, color #6B6B6B
```

### Заголовок занятия:
```
"Занятие 4. Остановка ментальных омрачений путем видения пустоты напрямую"
Font: Playfair Display, 28px, weight 400
Text-align: center
Max-width: 640px
Margin: 0 auto 32px
```

### Блок видео:
```
Tabs (переключатель языка видео):
  ┌───────────┬───────────┐
  │  🇬🇧 ENG  │  🇷🇺 RUS  │
  └───────────┴───────────┘
  
  Активный tab: фон #7A1B2E, текст #FFFFFF
  Неактивный: фон transparent, текст #6B6B6B, border 1px solid #E5E2DF
  Border-radius: 8px
  Transition: background 0.2s

YouTube embed:
  Width: 100%
  Aspect-ratio: 16/9
  Border-radius: 12px
  Overflow: hidden
  Box-shadow: 0 4px 20px rgba(0,0,0,0.08)
```

### Блок материалов (под видео):
```
Заголовок:
  "Материалы к уроку" / "Class Materials"
  Font: Inter, 20px, weight 500
  Margin: 40px 0 20px

Список файлов (каждый файл — карточка):
  ┌─────────────────────────────────────────────────┐
  │  📄                                              │
  │  pdf    ACI 1 заметки урок 4.pdf       201 КБ   │
  │                                     [Открыть ↗] │
  └─────────────────────────────────────────────────┘

  Background: #FFFFFF
  Border: 1px solid #E5E2DF
  Border-radius: 12px
  Padding: 16px 20px
  Margin-bottom: 8px
  Display: flex, align-items center, gap 16px

  Иконка PDF:
    Width: 44px, height: 52px
    Background: #F8F6F4
    Border-radius: 8px
    Текст "pdf" внутри: 11px, weight 600, #7A1B2E

  Название файла: Inter, 15px, weight 500, color #1A1A1A
  Размер: Inter, 13px, color #9A9A9A

  Кнопка "Открыть":
    Background: transparent
    Border: 1px solid #E5E2DF
    Border-radius: 8px
    Padding: 8px 16px
    Font: Inter, 13px, weight 500, color #7A1B2E
    Hover: background #F8F6F4

Типы файлов:
  1. Заметки студентов (student's notes) — "ACI N заметки урок X.pdf"
  2. Чтения (reading) — "ACI N чтение урок X.pdf"
  3. Стенограмма (transcript) — "ACI N стенограмма урок X.pdf"
  4. PDF от Учителя (если есть) — "ACI N материалы учителя урок X.pdf"
```

### Блок транскрипции (текстовый):
```
Если транскрипция доступна в текстовом виде (не PDF):

  Заголовок: "Транскрипция" / "Transcript"
  Контент: текст в expandable блоке

  ┌─────────────────────────────────────────────────┐
  │  Транскрипция                        [Развернуть ▾] │
  │                                                 │
  │  (свёрнуто — показаны первые 3 строки)          │
  │  ...                                            │
  └─────────────────────────────────────────────────┘

  По клику "Развернуть" → показывается весь текст
  Background: #F8F6F4
  Border-radius: 12px
  Padding: 24px
  Font: Inter, 15px, line-height 1.8
  Max-height (свёрнуто): 120px, overflow hidden, mask-gradient снизу
```

---

## 12. СТРАНИЦА «ПРАКТИКИ» (/practice-modules)

### Структура идентична курсам ACI, но:
- Другой заголовок: "Practice Modules / Практические модули"
- Другое описание: "Модули ежедневной практики от Ламы Сумати"
- Карточки модулей (не 18, а сколько есть)
- Внутри каждого модуля: описание + видео + PDF + транскрипция + доп. материалы

### Карточка практического модуля:
```
  ┌─────────────────────────────────────┐
  │                                     │
  │   [Обложка]                         │
  │   🧘                                │
  │   "Медитация смерти"                │
  │                                     │
  ├─────────────────────────────────────┤
  │                                     │
  │   Медитация смерти                  │
  │   Death Meditation                  │
  │                                     │
  │   Описание модуля в 2 строки...     │
  │                                     │
  │   [Подробнее →]                     │
  │                                     │
  └─────────────────────────────────────┘

  Обложка без фото:
    Background: linear-gradient(135deg, #5C0E1F 0%, #7A1B2E 100%)
    С иконкой лотоса или мандалы по центру
```

---

## 13. СТРАНИЦА «РЕТРИТЫ» (/retreats)

```
Заголовок: "Ретриты" / "Retreats"

Каждый ретрит — большая горизонтальная карточка:

┌────────────────┬──────────────────────────────────────┐
│                │                                      │
│  [ФОТО]        │  🇦🇲 Армения, 2025                   │
│   Места или    │  3 дня открытых учений               │
│   страны       │                                      │
│                │  Описание ретрита в 2-3 строки.       │
│  aspect-ratio  │  Что изучали, кто участвовал.         │
│  1:1 или       │                                      │
│  3:4           │  Видео  ·  Транскрипция  ·  Материалы │
│                │                                      │
│                │  [Смотреть →]                         │
│                │                                      │
└────────────────┴──────────────────────────────────────┘

Desktop: 2 колонки (фото 40%, контент 60%)
Mobile: 1 колонка (фото сверху)
Border-radius: 16px
Border: 1px solid #E5E2DF
Margin-bottom: 24px
```

---

## 14. СТРАНИЦА «МЕРОПРИЯТИЯ» (/events)

```
Заголовок: "Предстоящие мероприятия" / "Upcoming Events"

Карточка мероприятия:
┌─────────────────────────────────────────────────┐
│                                                 │
│  ┌─────┐                                        │
│  │ 15  │   Название мероприятия                  │
│  │ мая │   Описание и формат (онлайн/офлайн)    │
│  │2026 │   Время: 19:00 MSK                     │
│  └─────┘   [Подробнее →]                        │
│                                                 │
└─────────────────────────────────────────────────┘

Блок с датой:
  Background: #7A1B2E
  Color: #FFFFFF
  Width: 72px, Height: 80px
  Border-radius: 12px
  Text-align: center
  День: 28px, weight 600
  Месяц: 13px, weight 400
  Год: 13px, weight 400

Если нет предстоящих мероприятий:
  Мягкое сообщение: "Следите за обновлениями"
  Иконка колокольчика
```

---

## 15. МОБИЛЬНАЯ ВЕРСИЯ (App-like Experience)

### Принципы:
- На мобильных (<768px) сайт должен ощущаться как нативное приложение
- Никаких горизонтальных скроллов
- Touch-friendly: минимальный размер кнопок 44×44px
- Swipe-жесты для навигации между занятиями (если возможно)

### Bottom Tab Bar (только mobile):
```
Position: fixed, bottom: 0
Height: 64px + safe-area-inset-bottom
Background: #FFFFFF
Border-top: 1px solid #E5E2DF
Box-shadow: 0 -2px 10px rgba(0,0,0,0.05)
Z-index: 900

  ┌─────────┬─────────┬─────────┬─────────┬─────────┐
  │  🏠     │  📖     │  🧘     │  📅     │  ☰      │
  │ Главная │ Курсы   │Практики │ События │  Ещё    │
  └─────────┴─────────┴─────────┴─────────┴─────────┘

  Каждая иконка: 24px
  Текст: 11px, weight 500
  Неактивный: color #9A9A9A
  Активный: color #7A1B2E

  "Ещё" раскрывает: Ретриты, Проекты, Язык, О нас
```

### Мобильные адаптации:
```
- Header: высота 56px
- Гамбургер → заменяется Bottom Tab Bar
- Карточки курсов: 1 колонка, полная ширина
- Видео: полная ширина без скруглений
- Файлы: полная ширина, более крупные touch targets
- Hero: высота 100svh (safe viewport height)
- Свайп влево-вправо между занятиями на странице урока
- Pull-to-refresh анимация (если SPA)
```

### Планшет:
```
- Карточки: 2 колонки
- Sidebar: 280px ширины
- Bottom Tab Bar: НЕ показывается (остаётся десктопный header)
- Видео: с отступами и скруглениями
```

---

## 16. АНИМАЦИИ И ПЕРЕХОДЫ

```
Глобальные:
  transition-default: all 0.2s ease
  transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

Скролл-анимации (Intersection Observer, threshold 0.2):
  fade-in-up:
    from: opacity 0, translateY(20px)
    to: opacity 1, translateY(0)
    duration: 0.6s

  fade-in-left:
    from: opacity 0, translateX(-20px)
    to: opacity 1, translateX(0)
    duration: 0.6s

  scale-in:
    from: opacity 0, scale(0.95)
    to: opacity 1, scale(1)
    duration: 0.5s

Карточки:
  hover: translateY(-4px), box-shadow усиливается
  active: translateY(0), scale(0.98)

Переход между страницами:
  fade: opacity 0→1, duration 0.3s
  Или slide: translateX(20px→0), opacity 0→1

Кнопки:
  hover: background lightens, transform scale(1.02)
  active: transform scale(0.98)
  transition: 0.15s ease

Hero параллакс:
  Видео/изображение: translateY(scrollY * 0.3)
  Текст: opacity = 1 - (scrollY / windowHeight)
```

---

## 17. ИКОНКИ И ГРАФИКА

```
Набор иконок: Lucide Icons (тонкий стиль, 1.5px stroke)
  - Не использовать emoji в продакшн-версии
  - Заменить на SVG-иконки из Lucide

Иконки для разделов:
  Главная:     Home / House
  Курсы ACI:   BookOpen
  Практики:    Lotus (кастомная) или Flower2
  Ретриты:     Mountain
  Мероприятия:  Calendar
  Проекты:     ExternalLink
  Язык:        Globe
  Меню:        Menu (hamburger)
  Закрыть:     X
  Стрелка:     ChevronRight / ChevronLeft / ChevronDown
  PDF:         FileText
  Видео:       Play

Логотип:
  Текстовый: "TEACHINGS BY SUMATI"
  Font: Playfair Display, 18px, weight 400
  Color: #7A1B2E (или #FFFFFF на тёмном фоне)
  Без графического логотипа (минимализм)
```

---

## 18. ДОСТУПНОСТЬ (Accessibility)

```
- Весь текст: контраст ≥ 4.5:1 (WCAG AA)
- Фокус: видимый outline (2px solid #7A1B2E, offset 2px) на всех интерактивных элементах
- Keyboard navigation: Tab, Enter, Escape (для меню)
- ARIA labels на кнопках-иконках
- alt-текст на всех изображениях
- Skip-to-content ссылка
- prefers-reduced-motion: отключить анимации
- Минимальный touch target: 44×44px
```

---

## 19. SEO И МЕТА-ТЕГИ

```html
<title>Teachings By Sumati — Buddhist Teachings in the Mahayana Tradition</title>
<meta name="description" content="18 ACI Foundation Courses and Practice Modules by Lama Sumati. Video teachings, transcripts, and study materials in English and Russian.">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta property="og:title" content="Teachings By Sumati">
<meta property="og:description" content="Buddhist Teachings in the Mahayana Tradition">
<meta property="og:image" content="[URL обложки]">
<meta property="og:type" content="website">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
```

---

## 20. СТРУКТУРА ФАЙЛОВ ПРОЕКТА (для Replit)

```
/
├── index.html                    ← Главная страница
├── aci-courses.html              ← Список 18 курсов
├── aci-course.html               ← Шаблон страницы курса (динамический)
├── aci-class.html                ← Шаблон страницы занятия
├── practice-modules.html         ← Практические модули
├── practice-module.html          ← Шаблон модуля
├── retreats.html                 ← Ретриты
├── events.html                   ← Мероприятия
├── projects.html                 ← Проекты
│
├── css/
│   ├── variables.css             ← Цвета, шрифты, breakpoints
│   ├── reset.css                 ← CSS reset
│   ├── layout.css                ← Grid, container, responsive
│   ├── components.css            ← Карточки, кнопки, табы
│   ├── sidebar.css               ← Боковое меню
│   ├── hero.css                  ← Hero секция
│   ├── footer.css                ← Footer
│   └── mobile.css                ← Мобильные стили + bottom tab bar
│
├── js/
│   ├── sidebar.js                ← Логика открытия/закрытия меню
│   ├── language.js               ← Переключение EN/RU
│   ├── animations.js             ← Intersection Observer + scroll анимации
│   ├── random-teaching.js        ← «Подобрать учение»
│   ├── video-tabs.js             ← Переключение ENG/RUS видео
│   └── navigation.js             ← Навигация между занятиями
│
├── data/
│   ├── courses.json              ← Данные о 18 курсах (названия, ссылки)
│   ├── videos.json               ← YouTube-ссылки (ENG + RUS)
│   ├── practice-modules.json     ← Данные о практических модулях
│   └── events.json               ← Предстоящие мероприятия
│
├── assets/
│   ├── images/                   ← Фото, обложки курсов
│   ├── video/                    ← Hero background video (горы)
│   └── icons/                    ← SVG иконки
│
└── README.md
```

---

## 21. ПРОМПТ ДЛЯ REPLIT AI (готовый к использованию)

```
Create a multi-page website called "Teachings By Sumati" — a Buddhist educational platform for 18 ACI Foundation Courses by Lama Sumati.

DESIGN SYSTEM:
- Minimalist, modern, premium feel
- Colors: White (#FFFFFF) primary, Burgundy (#7A1B2E) accent, Warm cream (#F8F6F4) sections
- Typography: "Playfair Display" (serif) for headings, "Inter" (sans-serif) for body
- Border-radius: 12-16px on cards, 8px on buttons
- Subtle animations on scroll (fade-in-up), smooth hover transitions

NAVIGATION:
- Collapsible sidebar menu (slides from left, 320px wide)
- Hamburger button fixed top-left (44x44px)
- On mobile: bottom tab bar with 5 tabs (Home, Courses, Practices, Events, More)
- Sticky header on inner pages with backdrop blur
- Language toggle EN/RU (pill switch, top-right)

PAGES:

1. HOME (index.html):
   - SCREEN 1 (100vh): Hero with background video of mountains, dark overlay gradient,
     centered text "Teachings By Sumati" in Playfair Display 72px white, subtitle below.
     Parallax effect on scroll. Scroll indicator arrow bouncing at bottom.
   - SCREEN 2: Biography section — 2 columns (photo left 40%, text right 60%).
     Photo placeholder with rounded corners and shadow. Biography text of Lama Sumati.
   - SCREEN 3: "Find a Teaching" — centered section on cream background (#F8F6F4).
     Large burgundy pill button. On click: shows random YouTube video embed with animation.
   - SCREEN 4: Projects grid (2-3 columns) — Book of Lists, 6-Times Diary, Sarahni site.
     Each card has image, title, description, external link.
   - FOOTER: Burgundy (#7A1B2E) background, white text, 3-4 columns with navigation,
     resources, contact. Copyright at bottom.

2. ACI COURSES (aci-courses.html):
   - Title: "18 ACI Foundation Courses"
   - Grid of 18 course cards (3 columns desktop, 2 tablet, 1 mobile).
   - Each card: gradient cover image with course number, title below, "Подробнее" link.
   - Clicking a card opens the course page.

3. COURSE PAGE (dynamic):
   - Header: course number, full name (EN + RU), link to ACI platform.
   - List of 10 classes + 1 review class as horizontal cards with burgundy left border.
   - Each card shows class number, topic name, "Начать →" button.

4. CLASS PAGE (dynamic):
   - Navigation bar: "← Previous" / "Next →" with neighboring class names.
   - Class title centered.
   - Video section: ENG/RUS toggle tabs, YouTube embed (16:9, rounded corners).
   - Materials section: list of PDF files (notes, reading, transcript) as downloadable cards
     with PDF icon, filename, file size, "Open" button.
   - Optional transcript text in expandable/collapsible block.

5. PRACTICE MODULES: Same structure as ACI Courses but for practice modules.

6. RETREATS: Horizontal cards with location photo, country, description, materials.

7. EVENTS: Cards with date block (day/month/year in burgundy square) + event details.

8. PROJECTS: Detailed cards for each project with descriptions and external links.

RESPONSIVE:
- Desktop (1024px+): Full layout, sidebar, 3-column grids
- Tablet (768-1023px): 2-column grids, collapsible sidebar
- Mobile (<768px): 1-column, bottom tab bar, full-width cards, app-like experience,
  swipe navigation between classes, 100svh hero

ANIMATIONS:
- Hero: parallax video, text fade-in on load, text fade-out on scroll
- Cards: hover translateY(-4px) + shadow, active scale(0.98)
- Scroll: fade-in-up with Intersection Observer (threshold 0.2, stagger delay)
- Page transitions: fade 0.3s
- Sidebar: slide-in from left 0.3s + backdrop blur overlay
- prefers-reduced-motion: disable all animations

ACCESSIBILITY: WCAG AA contrast, keyboard navigation, ARIA labels,
focus outlines, 44px minimum touch targets.

Use vanilla HTML, CSS, JavaScript. No frameworks needed.
Store course data in JSON files in /data/ folder.
```

---

*Документ готов к передаче разработчику или AI-ассистенту в Replit.*
