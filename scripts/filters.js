// Фильтрация проектов
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    // Создаем карту соответствий фильтров и технологий
    const filterMap = {
        'все': ['html', 'css', 'javascript', 'react', 'bootstrap'],
        'html': ['html', 'css'],
        'js': ['javascript'],
        'react': ['react']
    };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Убираем активный класс со всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            const filterValue = this.textContent.toLowerCase();
            
            // Получаем соответствующие технологии для фильтра
            const technologies = filterMap[filterValue] || [filterValue];
            
            // Фильтруем проекты
            projectCards.forEach(card => {
                const projectTech = card.querySelector('p').textContent.toLowerCase();
                let shouldShow = false;
                
                if (filterValue === 'все') {
                    shouldShow = true;
                } else {
                    // Проверяем совпадение с любой из технологий
                    shouldShow = technologies.some(tech => 
                        projectTech.includes(tech)
                    );
                }
                
                if (shouldShow) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.animation = 'fadeIn 0.5s ease';
                    }, 10);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Активируем кнопку "Все" по умолчанию
    const allButton = document.querySelector('.filter-btn');
    if (allButton) {
        allButton.classList.add('active');
    }
    
    // Добавляем CSS для анимации
    if (!document.getElementById('filter-styles')) {
        const style = document.createElement('style');
        style.id = 'filter-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .filter-btn.active {
                background-color: #3498db !important;
                transform: translateY(-2px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            .project-card {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
        `;
        document.head.appendChild(style);
    }
}