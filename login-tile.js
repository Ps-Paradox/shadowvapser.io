document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.querySelector('.login-container');

    loginContainer.addEventListener('mousemove', (e) => {
        const rect = loginContainer.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position within the element
        const y = e.clientY - rect.top;  // Y position within the element

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * 15; // Max 15 degrees tilt on X-axis
        const rotateY = (centerX - x) / centerX * 15; // Max 15 degrees tilt on Y-axis

        loginContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    loginContainer.addEventListener('mouseleave', () => {
        loginContainer.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});