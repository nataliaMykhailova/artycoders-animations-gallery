
import './style.css';
import animations from './data/list.json';

const gallery       = document.getElementById('gallery');
const searchInput   = document.getElementById('search');
const typeSelect    = document.getElementById('filterType');
const subtypeSelect = document.getElementById('filterSubtype');

function populateTypeSelect() {
    const types = [...new Set(animations.map(a => a.type))];
    types.forEach(type => {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSelect.append(opt);
    });
}

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


function renderGallery(items) {
    gallery.innerHTML = '';

    items.forEach(a => {
        const w = a.width;
        const h = a.height;

        const card = document.createElement('div');
        card.className = 'card';

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

        if (!w && !h) {
            iframe.addEventListener('load', () => {
                try {
                    const doc = iframe.contentWindow.document;
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


document.addEventListener('DOMContentLoaded', () => {
    populateTypeSelect();
    populateSubtypeSelect('');
    renderGallery(animations);

    typeSelect.addEventListener('change', () => {
        populateSubtypeSelect(typeSelect.value);
        applyFilters();
    });
    subtypeSelect.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
});
