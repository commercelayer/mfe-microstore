# Commerce Layer React Checkout

The Commerce Layer Microstore application (React) provides you with a production-ready microstore website powered by Commerce Layer APIs. Microstores are a self-contained and fully functional hosted store accessed through a unique URL, which can be embedded onto any online or offline (via QR code) content. You can fork this repository and deploy it to any hosting service or use it as a reference application to build your own.

![Commerce Layer React Microstore demo](./public/demo.gif)

## What is Commerce Layer?

[Commerce Layer](https://commercelayer.io) is a multi-market commerce API and order management system that lets you add global shopping capabilities to any website, mobile app, chatbot, wearable, voice, or IoT device, with ease. Compose your stack with the best-of-breed tools you already mastered and love. Make any experience shoppable, anywhere, through a blazing-fast, enterprise-grade, and secure API.

## Table of contents

- [Getting started](#getting-started)
- [Hosted version](#hosted-version)
- [Contributors guide](#contributors-guide)
- [Help and support](#need-help)
- [License](#license)

---

## Getting started

1. Deploy the forked repository to your preferred hosting service or host it yourself. You can deploy with one click below:

2. Create your organization and get your credentials by following this [credentials guide](https://docs.commercelayer.io/developers/credentials).

3. Build your sales channel with your favorite technologies and frameworks by leveraging our [developer resources](https://commercelayer.io/developers) and [documentation](https://docs.commercelayer.io/api).

4. Get a [access token](https://docs.commercelayer.io/api/authentication) for your application. You should generate this in your sales channel or use our Javascript [authentication library](https://github.com/commercelayer/commercelayer-js-auth).

5. Create one or more [SKUs](https://commercelayer.io/docs/data-model/skus) associated with prices and inventories.

6. Open the microstore using the URL format: `<your-deployed-microstore-url>/microstore?skus=<skuCode-comma-separated>accessToken=<your-access-token>`. For example: `https://microstore.yourbrand.com/microstore?skus=TSHIRT123,TANK123&accessToken=eyJhbGciOiJIUzUxMiJ9`.

## Hosted version

There is a hosted version of the microstore application that is automatically enabled in your Commerce Layer account. You can customize it by adding your organization logo, favicon and primary color.

You can use the hosted checkout with the following URL format: `https://<your-organization-subdomain>.commercelayer.app/microstore?skus=<skuCode-comma-separated>accessToken=<your-access-token>`.

Default behaviour is with Buy now mode (as soon as a customer add a product to the shopping bag it will be redirected directly to checkout. If other line items were present on the order they will be deleted.

URL Options:

Parameters:

- **accessToken**: A sales channel access token valid for the subdomain of the organization used.
- **skus**: SKU codes comma separated, you can use colon to add a default quantity, TSHIRT123:4 is going to add an SKU to the microstore with quantity set to 4. Default quantity is 1.
- **all**: if set to true, we activate “Buy All” button on top of the products list that will clear line items of the order and add all the items in the page with the default quantity set in the url.
- **cart**: if set to true, microstore will work together with the hosted cart. We disabled the "Buy now" mode, avoiding to remove previous line items from the order when we click the "Buy now" button. Enabling the cart will add a behaviour option on how we add item to the shopping bag
  - **inline**: If set to true, when a customer click on the button add to bag, he will remain on the page, otherwise he will be redirected immediately to the hosted cart.

`https://yourbrand.commercelayer.app/microstore?skus=<skuCode-comma-separated>accessToken=<your-access-token>`

For example: `https://yourbrand.checkout.commercelayer.app/microstore?skus=TSHIRT123:4&accessToken=eyJhbGciOiJIUzUxMiJ9`

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/commercelayer-microstore) (you can learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/commercelayer-microstore.git && cd commercelayer-microstore
```

3. First, install dependencies and run the development server:

```
yarn install
yarn dev
```

4. Set your environment with `.env.local` starting from `.env.local.sample`.

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can use the following format to open the checkout: `http://localhost:3000/microstore?skus=<your-sku-code>&accessToken=<your-access-token>`.

6. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

7. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/commercelayer-microstore/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
