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
            try {
                this.sdkClient.fetchNextPage(products[products.length - 1]).then((nextProducts) => {
                    this.processProductsFromApiResponse(nextProducts.model);
                });
            } catch (err) {
                console.log(err);
            }
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
}
