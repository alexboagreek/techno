
import './index.html';
import './cart.html';
import './card.html';
import './index.scss';


import Swiper, { Thumbs, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { startPagination } from './modules/pagination';
import { getGoods } from './modules/goodsService';
import { renderGoods } from './modules/renderGoods';



try {
    const paginationWrapper = document.querySelector('.pagination');
    const goodsList = document.querySelector('.goods__list');

    const pageURL = new URL(location); 

    const page = +pageURL.searchParams.get('page') || 1;


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


    `

    getGoods({page}).then(({goods, pages, page}) => {
        renderGoods(goodsList, goods, )
        startPagination(paginationWrapper, pages, page);
    })

    startPagination(paginationWrapper, 50, page);
 
} catch (error) {
    console.warn(error);
    console.warn('Это не главная страница');
}


const thumbSwiper = new Swiper('.card__slider-thumb', {
    spaceBetween: 44,
    slidesPerView: 3,
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
    modules: [Scrollbar]
});

new Swiper('.card__image', {
    spaceBetween: 10,
    slidesPerView: 1,
    thumbs: {
        swiper: thumbSwiper,
        slideThumbActiveClass: 'card__thumb-btn_active',
    },
    modules: [Thumbs]
});

new Swiper('.recommended__carousel', {
    spaceBetween: 30,
    slidesPerView: 5,
});