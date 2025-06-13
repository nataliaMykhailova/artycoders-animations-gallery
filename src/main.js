// src/main.js

import './style.css';
import animations from './data/list.json';

const gallery       = document.getElementById('gallery');
const searchInput   = document.getElementById('search');
const typeSelect    = document.getElementById('filterType');
const subtypeSelect = document.getElementById('filterSubtype');

/**
 * Наповнює селект типів унікальними значеннями animation.type
 */
function populateTypeSelect() {
    const types = [...new Set(animations.map(a => a.type))];
    types.forEach(type => {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.append(opt);
    });
}

/**
 * Наповнює селект підтипів, залежно від вибраного типу
 */
function populateSubtypeSelect(selectedType) {
    subtypeSelect.innerHTML = '<option value="">— Усі підтипи —</option>';

    if (!selectedType) {
        subtypeSelect.disabled = true;
        return;
    }

    subtypeSelect.disabled = false;
    const subtypes = [
        ...new Set(
            animations
                .filter(a => a.type === selectedType)
                .flatMap(a => a.subtypes || [])
        )
    ];

    subtypes.forEach(sub => {
        const opt = document.createElement('option');
        opt.value = sub;
        opt.textContent = sub;
        subtypeSelect.append(opt);
    });
}

/**
 * Фільтрує animations за текстом, типом і підтипом
 * і викликає renderGallery
 */
function applyFilters() {
    const q          = searchInput.value.trim().toLowerCase();
    const selType    = typeSelect.value;
    const selSubtype = subtypeSelect.value;

    const filtered = animations.filter(a => {
        const matchSearch  = a.title.toLowerCase().includes(q);
        const matchType    = !selType    || a.type    === selType;
        const matchSubtype = !selSubtype || (a.subtypes || []).includes(selSubtype);
        return matchSearch && matchType && matchSubtype;
    });

    renderGallery(filtered);
}

/**
 * Рендерить масив items у flex-галерею
 * Підтримує width/height із JSON
 * Якщо їх нема — автоматично підганяє під вміст iframe
 */
function renderGallery(items) {
    // Очищаємо галерею перед рендером
    gallery.innerHTML = '';

    items.forEach(a => {
        const w = a.width;    // може бути '50vw', '400px' тощо
        const h = a.height;   // може бути '200px', 'auto' тощо

        // Створюємо контейнер-картку
        const card = document.createElement('div');
        card.className = 'card';

        // Інлайн-стиль для iframe: застосуємо width/height лише якщо вони задані
        card.innerHTML = `
      <h3>${a.title}</h3>
      <iframe
        src="${a.path}"
        loading="lazy"
        title="${a.title}"
        style="
          ${w  ? `width: ${w};`  : ''}
          ${h  ? `height: ${h};` : ''}
          border: none;
          display: inline-block;
        "
      ></iframe>
    `;
        gallery.append(card);

        const iframe = card.querySelector('iframe');

        // Якщо ні width, ні height не задані — підганяємо під вміст
        if (!w && !h) {
            iframe.addEventListener('load', () => {
                try {
                    const doc = iframe.contentWindow.document;
                    // Реальні розміри контенту всередині iframe
                    const iw = Math.max(
                        doc.documentElement.scrollWidth,
                        doc.body.scrollWidth
                    );
                    const ih = Math.max(
                        doc.documentElement.scrollHeight,
                        doc.body.scrollHeight
                    );
                    iframe.style.width  = iw + 'px';
                    iframe.style.height = ih + 'px';
                } catch (e) {
                    console.warn('Не вдалося виміряти iframe:', e);
                }
            });
        }
    });
}


// Ініціалізація після завантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
    populateTypeSelect();
    populateSubtypeSelect('');    // на початку без обраного типу — підтипи відключені
    renderGallery(animations);

    // Навішуємо обробники
    typeSelect.addEventListener('change', () => {
        populateSubtypeSelect(typeSelect.value);
        applyFilters();
    });
    subtypeSelect.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
});
