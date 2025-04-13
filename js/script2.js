document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.products-grid');
    const leftArrow = document.querySelector('.scroll-arrow.left');
    const rightArrow = document.querySelector('.scroll-arrow.right');
    const itemWidth = 320; // 300px item + 20px gap

    leftArrow.addEventListener('click', () => {
        grid.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    });

    rightArrow.addEventListener('click', () => {
        grid.scrollBy({ left: itemWidth, behavior: 'smooth' });
    });

    // Optional: Disable scroll wheel explicitly
    grid.addEventListener('wheel', (e) => {
        e.preventDefault();
    });
});
