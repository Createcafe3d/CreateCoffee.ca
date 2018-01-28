import Client from 'shopify-buy';

export class ShopifyService {
    private sdkClient: any;
    private checkout: Checkout;
    private products: Product[] = [];
    constructor() {
        this.sdkClient = Client.buildClient({
            domain: 'create-coffee-roasteries.myshopify.com',
            storefrontAccessToken: 'af057771bb83071cd33f87f9dcb0387a'
        });
        this.initCheckout();
    }

    get loadedProducts(): Product[] {
        return this.products;
    }

    get totals(): Totals {
        return {
            subtotal: this.checkout.subtotalPrice,
            taxes: this.checkout.totalTax,
            total: this.checkout.totalPrice
        };
    }

    get checkoutUrl(): string {
        return this.checkout ? this.checkout.webUrl : '';
    }

    fetchAllProducts(): void {
        this.sdkClient.product.fetchAll().then((products) => {
            this.processProductsFromApiResponse(products);
        });
    }

    processProductsFromApiResponse(products): void {
        if (!Array.isArray(products)) {
            return;
        }
        products.forEach(product => {
            this.products.push(
                new Product(
                    product.id,
                    product.title,
                    product.images.map((productImage) => {
                        return productImage.src;
                    }),
                    product.description,
                    product.handle,
                    product.variants
                ));
        });
        if (products[products.length - 1].hasNextPage) {
            // TODO: pagination is broken. See https://github.com/Shopify/js-buy-sdk/issues/472
            // this.sdkClient.fetchNextPage(products).then((nextProducts) => {
            //     this.processProductsFromApiResponse(nextProducts.model);
            // });
            this.products.push();
        }
    }

    private initCheckout(): void {
        if (this.checkout) {
            return;
        }
        this.sdkClient.checkout.create().then(
            this.setCheckoutFromResponse.bind(this)
        );
    }

    addProductToCart(product: Product, quantity?: number, variant?: Variant) {
        this.initCheckout();
        quantity = quantity || 1;
        let variantId: string;
        if (variant) {
            variantId = variant.id;
        } else {
            variantId = product.variants[0].id;
        }
        const lineItemsToAdd = [{
            variantId: variantId,
            quantity: quantity
        }];
        this.sdkClient.checkout.addLineItems(
            this.checkout.id, lineItemsToAdd
        ).then(this.setCheckoutFromResponse.bind(this));
    }

    updateProductInCart(productId: string, quantity?: number) {
        this.initCheckout();
        quantity = quantity || 1;
        const lineItemsToUpdate = [{
            id: productId,
            quantity: quantity
        }];
        this.sdkClient.checkout.updateLineItems(
            this.checkout.id, lineItemsToUpdate
        ).then(this.setCheckoutFromResponse.bind(this));
    }

    removeProductsFromCart(productIds: string[]) {
        this.initCheckout();
        this.sdkClient.checkout.removeLineItems(
            this.checkout.id, productIds
        ).then(this.setCheckoutFromResponse.bind(this));
    }

    updateCart() {
        this.initCheckout();
        this.sdkClient.checkout.fetch(
            this.checkout.id
        ).then(this.setCheckoutFromResponse.bind(this));
    }

    public get cartItems(): LineItem[] {
        return this.checkout ? this.checkout.lineItems : [];
    }

    private setCheckoutFromResponse(response): void {
        console.log(response);
        this.checkout = response;
    }
}

interface Checkout {
    id: string;
    lineItems: LineItem[];
    ready: boolean;
    subtotalPrice: string;
    totalPrice: string;
    totalTax: string;
    webUrl: string;
}

export interface LineItem {
    id: string;
    quantity: number;
    title: string;
    variant: {
        image: {
            altText: string;
            src: string;
        };
        price: string;
    };
}

export interface Totals {
    subtotal: string;
    taxes: string;
    total: string;
}

export class Product {
    id: string;
    name: string;
    images: string[];
    description: string;
    handle: string;
    variants: Variant[];
    constructor(
        id: string,
        name: string,
        images: string[],
        description: string,
        handle: string,
        variants: Variant[],
    ) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.description = description;
        this.handle = handle;
        this.variants = variants;
    }
    get shortName(): string {
        if (this.name.length > 44) {
            return this.name.slice(0, 40) + '...';
        }
        return this.name;
    }
    get shortDescription(): string {
        if (this.description.length > 200) {
            return this.description.slice(0, 195) + '...';
        }
        return this.description;
    }
    get primaryImage(): string {
        return this.images[0] || '';
    }
}

class Variant {
    id: string;
    title: string;
    available: boolean;
    image: string;
    price: string;
}
