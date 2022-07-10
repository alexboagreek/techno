import { getCategory,getGoods } from "./goodsService";
import { renderGoods } from './renderGoods';
import { startPagination } from './pagination';



export const filter = () => {
    const category = document.querySelector('#category');
    getCategory().then(categoryList => {
        for (const categoryListKey in categoryList) {
          
            const option = document.createElement('option');
            option.value = categoryListKey;
            option.textContent = categoryList[categoryListKey];
            category.append(option);
                
        }   
    });

    const filterForm = document.querySelector('.filter__form');
    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const checkboxes = new Set();

        [...filterForm.elements].forEach(elem => {
            if (elem.type === 'checkbox') {
                checkboxes.add(elem.name);
            }
        }) 

        const data = {};

        const formData = new FormData(filterForm);

        for (const [name, value] of formData) {
            if (!value) continue;

            if (checkboxes.has(name)) {
                if (Array.isArray(data[name])) {
                    data[name].push(value);
                } else {
                    data[name] = [value];
                }
            } else {
                data[name] = value;
            }
        }
        const goodsList = document.querySelector('.goods__list');
        goodsList.innerHTML = `
        <div class="goods__preload">
            <svg version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">
                <circle fill="none" stroke="#fff" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>
                <circle fill="#fff" stroke="#e74c3c" stroke-width="3" cx="8" cy="54" r="6" >
                    <animateTransform
                    attributeName="transform"
                    dur="2s"
                    type="rotate"
                    from="0 50 48"
                    to="360 50 52"
                    repeatCount="indefinite" />
                    
                </circle>
            </svg>
        </div>
        `;

        const url = new URL(location);
        const search = url.searchParams.get('search');
        url.search = '';

        for (const key in data) {
            url.searchParams.set(key, data[key]);
        }

        history.pushState(null, null, url);

        getGoods().then(({goods, pages, page}) => {
            renderGoods(goodsList, goods)
            startPagination(paginationWrapper, pages, page);
        })
    });
}