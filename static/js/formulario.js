document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Crear mensajes de error
    inputs.forEach(input => {
        const error = document.createElement('div');
        error.className = 'text-red-600 text-sm mt-1 hidden';
        error.setAttribute('data-error', input.name);
        input.insertAdjacentElement('afterend', error);
    });

    function validateInput(input) {
        const error = form.querySelector(`[data-error="${input.name}"]`);
        let valid = true;
        let message = '';

        if (!input.value.trim()) {
            valid = false;
            message = 'Este campo es obligatorio';
        } else if (input.name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                valid = false;
                message = 'Correo electrónico inválido';
            }
        }

        if (!valid) {
            error.textContent = message;
            error.classList.remove('hidden');
        } else {
            error.textContent = '';
            error.classList.add('hidden');
        }

        return valid;
    }

    function validateForm() {
        let allValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                allValid = false;
            }
        });
        submitBtn.disabled = !allValid;
        submitBtn.classList.toggle('opacity-50', !allValid);
        submitBtn.classList.toggle('cursor-not-allowed', !allValid);
    }

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            validateForm();
        });
    });

    validateForm();

    form.addEventListener('submit', function (e) {
        let allValid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                allValid = false;
            }
        });
        if (!allValid) {
            e.preventDefault();
        }
    });
});
