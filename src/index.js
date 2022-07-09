
import './index.html';
import './cart.html';
import './card.html';
import './index.scss';


import Swiper, { Thumbs, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { startPagination } from './modules/pagination';
import { getGoods, getGoodsItem } from './modules/goodsService';
import { renderGoods } from './modules/renderGoods';
import { renderItem } from './modules/renderItem';




try {
    const goodsList = document.querySelector('.goods__list');

    if (goodsList) {
        const paginationWrapper = document.querySelector('.pagination');
    

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
    
        startPagination(paginationWrapper, 50, page)

    }
   ;
 
} catch (error) {
    console.warn(error);
    console.warn('Это не главная страница');
}


try {
    const card = document.querySelector('.card');

    if (card) {
        const pageURL = new URL(location); 
        const id = +pageURL.searchParams.get('id');

        const preload = document.createElement('div');
        preload.className = 'card__preload';
        preload.innerHTML = `

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
        
        `;

        card.append(preload);

        getGoodsItem(id).then(item => {
            renderItem(item);
            preload.remove();
            return item.category;

        }).then(category => {
            return getGoods({ category })
        }).then(data => {
            console.log(data);
        })

    }
} catch (error) {
    console.warn(error);
}


new Swiper('.recommended__carousel', {
    spaceBetween: 30,
    slidesPerView: 5,
});