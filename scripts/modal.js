// Управление модальными окнами
function initModal() {
    // Создаем модальное окно для проектов
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectTitle = this.querySelector('h3').textContent;
            const projectTech = this.querySelector('p').textContent;
            
            showProjectModal(projectTitle, projectTech);
        });
    });
    
    // Модальное окно для добавления записи в дневник
    const addEntryBtn = document.querySelector('.add-entry-btn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', showDiaryModal);
    }
}

function showProjectModal(title, tech) {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>${title}</h2>
                <p><strong>Технологии:</strong> ${tech}</p>
                <p>Здесь будет подробное описание проекта. Этот функционал можно расширить для отображения дополнительной информации о проекте.</p>
                <div class="modal-actions">
                    <button class="btn btn-primary">Посмотреть код</button>
                    <button class="btn btn-secondary">Демо</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
    
    // Добавляем стили для модального окна
    addModalStyles();
}

function showDiaryModal() {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>Добавить запись в дневник</h2>
                <form class="diary-form">
                    <div class="form-group">
                        <label for="entryDate">Дата:</label>
                        <input type="date" id="entryDate" required>
                    </div>
                    <div class="form-group">
                        <label for="entryTask">Задача:</label>
                        <input type="text" id="entryTask" placeholder="Опишите задачу" required>
                    </div>
                    <div class="form-group">
                        <label for="entryStatus">Статус:</label>
                        <select id="entryStatus" required>
                            <option value="completed">✓ Выполнено</option>
                            <option value="in-progress">⏳ В процессе</option>
                            <option value="planned">📅 Запланировано</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary">Добавить запись</button>
                </form>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.querySelector('.modal-overlay');
    const closeBtn = document.querySelector('.modal-close');
    const form = document.querySelector('.diary-form');
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        addDiaryEntry();
        closeModal();
    });
    
    addModalStyles();
}

function addDiaryEntry() {
    const date = document.getElementById('entryDate').value;
    const task = document.getElementById('entryTask').value;
    const status = document.getElementById('entryStatus').value;
    
    const statusIcons = {
        'completed': '✓',
        'in-progress': '⏳',
        'planned': '📅'
    };
    
    const progressList = document.querySelector('.progress-list');
    const newEntry = document.createElement('div');
    newEntry.className = 'progress-item';
    newEntry.innerHTML = `
        <span class="date">${formatDate(date)} - </span>
        <span class="task">${task} ${statusIcons[status]}</span>
    `;
    
    progressList.prepend(newEntry);
    
    // Анимация появления новой записи
    newEntry.style.opacity = '0';
    newEntry.style.transform = 'translateY(-10px)';
    setTimeout(() => {
        newEntry.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        newEntry.style.opacity = '1';
        newEntry.style.transform = 'translateY(0)';
    }, 100);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const styles = `
        <style id="modal-styles">
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                transform: translateY(-20px);
                animation: slideUp 0.3s ease forwards;
            }
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #7f8c8d;
            }
            .modal-close:hover {
                color: #e74c3c;
            }
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
            }
            .btn {
                padding: 0.8rem 1.5rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            .btn-primary {
                background-color: #3498db;
                color: white;
            }
            .btn-primary:hover {
                background-color: #2980b9;
            }
            .btn-secondary {
                background-color: #95a5a6;
                color: white;
            }
            .btn-secondary:hover {
                background-color: #7f8c8d;
            }
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            @keyframes slideUp {
                to { transform: translateY(0); }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}