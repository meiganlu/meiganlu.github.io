const hoverBlocks = document.querySelectorAll('.hover-block');
const tooltip = document.getElementById('tooltip');

hoverBlocks.forEach((hoverBlock) => {
    hoverBlock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        const tooltipMessage = hoverBlock.getAttribute('data-tooltip');

        if (tooltip) {
            tooltip.innerHTML = tooltipMessage;
            tooltip.style.left = `${mouseX + 30}px`;
            tooltip.style.top = `${mouseY + 50}px`;
            tooltip.classList.add('visible');
        }
    });

    hoverBlock.addEventListener('mouseleave', () => {
        tooltip?.classList.remove('visible');
    });
});