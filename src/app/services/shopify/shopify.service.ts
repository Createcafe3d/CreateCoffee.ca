import Client from 'shopify-buy';

export class ShopifyService {
    private sdkClient: any;
    private products: Product[] = [];
    constructor() {
        this.sdkClient = Client.buildClient({
            domain: 'create-coffee-roasteries.myshopify.com',
            storefrontAccessToken: 'af057771bb83071cd33f87f9dcb0387a'
        });
    }

    get loadedProducts(): Product[] {
        return this.products;
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
                    product.handle
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
}

export class Product {
    id: string;
    name: string;
    images: string[];
    description: string;
    handle: string;
    constructor(
        id: string,
        name: string,
        images: string[],
        description: string,
        handle: string,
    ) {
        this.id = id;
        this.name = name;
        this.images = images;
        this.description = description;
        this.handle = handle;
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
