// Валидация форм
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
        
        // Добавляем валидацию в реальном времени
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function validateContactForm(e) {
    e.preventDefault();
    
    const form = e.target;
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (isValid) {
        showSuccessMessage(form);
        form.reset();
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Очищаем предыдущие ошибки
    clearFieldError(e);
    
    // Проверяем обязательные поля
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Это поле обязательно для заполнения';
    }
    
    // Проверка email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Введите корректный email адрес';
        }
    }
    
    // Проверка минимальной длины для сообщения
    if (field.name === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Сообщение должно содержать минимум 10 символов';
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    } else {
        showFieldSuccess(field);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.style.borderColor = '#e74c3c';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.3rem';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function showFieldSuccess(field) {
    field.style.borderColor = '#27ae60';
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentNode.querySelector('.field-error');
    
    if (errorElement) {
        errorElement.remove();
    }
    
    field.style.borderColor = '#bdc3c7';
}

function showSuccessMessage(form) {
    // Создаем сообщение об успехе
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
        background-color: #27ae60;
        color: white;
        padding: 1rem;
        border-radius: 4px;
        margin-top: 1rem;
        text-align: center;
        animation: slideDown 0.3s ease;
    `;
    successMessage.textContent = 'Сообщение успешно отправлено! Спасибо за ваше обращение.';
    
    form.appendChild(successMessage);
    
    // Убираем сообщение через 5 секунд
    setTimeout(() => {
        successMessage.style.animation = 'slideUp 0.3s ease forwards';
        setTimeout(() => {
            successMessage.remove();
        }, 300);
    }, 5000);
    
    // Добавляем CSS анимации
    if (!document.getElementById('form-styles')) {
        const styles = `
            <style id="form-styles">
                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slideUp {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-10px); }
                }
            </style>
        `;
        document.head.insertAdjacentHTML('beforeend', styles);
    }
}