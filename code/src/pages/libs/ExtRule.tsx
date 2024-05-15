export const ExtRule = {
	name: [
		'.js-product-name', //Printerval
		'.product_title', //Woocommerce
		'.post-header h1', //Woocommerce
		'.product h1', //Woocommerce
		'#listing-page-cart h1[data-buy-box-listing-title=true]', //Etsy
		'.product-single__title', //Shopify
		'h4.product_name', //Shopify
		'h1.product_name', //Shopify
		'h1.title', //Shopify
		'.product__title h1', //Shopify
		'h1.product-title',
		'h1.x-item-title__mainTitle span', //Ebay
		'#alert h1',
		'.t4s-product__title', //Shopify
		'span[value="product.title"]', //ShopBase
		'._2rn4tqXP', //Other
	].join(', '),
	images: [
		// Printerval
		{
			block: '.product-gallery-box, .product-gallery-wrapper',
			loop: '.product-gallery-item picture source, .product-gallery-item picture img, .product-gallery-item picture img',
			attr: ['srcset', 'src'],
		},
		// Woocommerce
		{
			block: '.woocommerce-product-gallery__wrapper, .woocommerce-product-gallery__image, .owl-carousel, .product-gallery',
			loop: 'img',
			attr: ['data-large_image', 'srcset', 'src'],
		},
		// Etsy
		{
			block: '.listing-page-image-carousel-component .image-carousel-container .carousel-pane-list',
			loop: 'img',
			attr: ['data-src-zoom-image', 'src'],
		},
		// Shopify
		{
			block: '.product__photos, .product_gallery',
			loop: 'img',
			attr: ['data-src', 'src'],
		},
		{
			block: '.product-single__photos',
			loop: 'img.zoomImg',
			attr: ['data-src', 'src'],
		},
		{
			block: '.product__media-wrapper',
			loop: 'link[as=image]',
			attr: ['href', 'src'],
		},
		{
			block: '.owl-carousel.thumbnails, .owl-carousel, .thumbnails',
			loop: 'img',
			attr: ['srcset', 'src', 'data-src'],
		},
		{
			block: '.product__media-list.slider',
			loop: 'img',
			attr: ['srcset', 'src', 'data-src'],
		},
		{
			block: '.product-images-wrapper',
			loop: 'img',
			attr: ['src', 'srcset', 'data-src'],
		},
		{
			block: '.t4s-product__media-wrapper',
			loop: 'img',
			attr: ['srcset', 'data-src', 'src'],
		},
		// Ebay
		{
			block: '.ux-image-carousel-container .ux-image-carousel',
			loop: 'img',
			attr: ['data-zoom-src', 'src'],
		},
		// ShopBase
		{
			block: '.VueCarousel-inner',
			loop: 'img',
			attr: ['data-src', 'src'],
		},
		// Other
		{
			block: '.ALsph7jA',
			loop: 'img',
			attr: ['data-src', 'src'],
		},
	],
	id: [
		//Printerval
		{
			block: '#productId',
			attr: 'val',
		},
		// Etsy
		{
			block: "input[name='listing_id']",
			attr: 'val',
		},
	],
	items: [
		//Printerval
		{
			block: 'body',
			loop: 'div.product-item, div.product-item-box',
			url: '.product-link',
			url_attr: 'href',
			name: '.product-title',
			name_attr: 'text',
			image: '.product-link img',
			image_attr: 'src',
		},
		//Etsy
		{
			block: "div[data-appears-component-name='shop_home_listing_grid']",
			loop: '.v2-listing-card',
			url: 'a.listing-link',
			url_attr: 'href',
			name: '.v2-listing-card__title',
			name_attr: 'text',
			image: '.v2-listing-card__img img',
			image_attr: 'src',
		},
		{
			block: 'ol[data-results-grid-container]',
			loop: 'li',
			url: 'a.listing-link',
			url_attr: 'href',
			name: '.v2-listing-card__title',
			name_attr: 'text',
			image: '.v2-listing-card__img img',
			image_attr: 'src',
		},
		// Ebay
		{
			block: 'ul.srp-results',
			loop: 'li.s-item',
			url: '.s-item__image a',
			url_attr: 'href',
			name: '.s-item__info a span[role="heading"]',
			name_attr: 'text',
			image: '.s-item__image a img',
			image_attr: 'src',
		},
		// Woocommerce
		{
			block: '.products',
			loop: '.product',
			url: '.box-image a, .product-link, .wd-entities-title a',
			url_attr: 'href',
			name: '.product-title.name, .name, .product-title, .product-title a, .name a, .wd-entities-title a',
			name_attr: 'text',
			image: 'a img',
			image_attr: 'src',
		},
		// Shopify
		{
			block: '.product-list, .product-grid',
			loop: '.product-block, .grid__item',
			url: '.product-link',
			url_attr: 'href',
			name: '.product-block__title',
			name_attr: 'text',
			image: '.product-block__image img',
			image_attr: 'srcset',
		},
		{
			block: '.product-list',
			loop: '.grid__item',
			url: '.product-info__caption',
			url_attr: 'href',
			name: '.product-details .title',
			name_attr: 'text',
			image: '.image__container img',
			image_attr: 'src',
		},
		{
			block: '.product-list',
			loop: '.product-wrap',
			url: '.product-info__caption',
			url_attr: 'href',
			name: '.product-details .title',
			name_attr: 'text',
			image: '.image__container img',
			image_attr: 'src',
		},
		{
			block: '.collection-section',
			loop: '.grid-product',
			url: '.image-link',
			url_attr: 'href',
			name: '.grid-product__title',
			name_attr: 'text',
			image: 'img.product--image.image',
			image_attr: 'src',
		},
		{
			
			block: '.product-grid',
			loop: '.grid__item',
			url: '.card__heading  a.full-unstyled-link',
			url_attr: 'href',
			name: '.card__heading  a.full-unstyled-link',
			name_attr: 'text',
			image: '.card__media .media img',
			image_attr: 'src',
		},
		// ShopBase
		{
			block: '.product-grid',
			loop: '.product-col',
			url: 'a',
			url_attr: 'href',
			name: '.title[itemprop="name"]',
			name_attr: 'text',
			image: 'img.image',
			image_attr: 'srcset',
		},
		// Shopify
		{
			block: '#MainContent .t4s-container .t4s-main-collection-search',
			loop: '.t4s-product-wrapper',
			url: '.t4s-product-title a',
			url_attr: 'href',
			name: '.t4s-product-title a',
			name_attr: 'text',
			image: '.t4s-product-img img',
			image_attr: 'srcset',
		},
	],
}