// search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const productsList = document.getElementById('products-list');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const productItems = productsList.querySelectorAll('.product-item');

        productItems.forEach(item => {
            const productName = item.getAttribute('data-name').toLowerCase();

            if (productName.includes(query)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
