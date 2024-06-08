// dropdown.js
export function clearSelection() {
    const menus = document.querySelectorAll('.dropdown-menu');
    menus.forEach((menu) => {
        menu.style.display = 'none';
    });
}
