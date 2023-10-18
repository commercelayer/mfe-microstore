# Commerce Layer Microstore

The Commerce Layer Microstore application (React) provides you with a production-ready microstore website powered by Commerce Layer APIs. Microstores are self-contained and fully functional hosted stores accessible via a unique URL, which can be embedded into any online or offline (e.g. using a QR code) content. You can fork this repository and deploy it to any hosting service or use it as a reference application to build your own. A hosted version is also available.

![Commerce Layer React Microstore demo](./public/demo.png)

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

1. Create your organization and get your credentials by following one of our [onboarding tutorials](https://docs.commercelayer.io/developers/welcome).

2. Configure the `selfHostedSlug` property in `/public/config.local.js` to match your organization slug (subdomain). If this file does not exist, create it using the following content:

```
window.clAppConfig = {
  domain: "commercelayer.io",
  selfHostedSlug: "<your-org-slug>",
}
```

3. Deploy the forked repository to your preferred hosting service.

[<img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify" height="35">](https://app.netlify.com/start/deploy?repository=https://github.com/commercelayer/mfe-microstore#PUBLIC_SELF_HOSTED_SLUG) [<img src="https://vercel.com/button" alt="Deploy to Vercel" height="35">](https://vercel.com/new/clone?repository-url=https://github.com/commercelayer/mfe-microstore&build-command=pnpm%20build&output-directory=dist&env=PUBLIC_SELF_HOSTED_SLUG&envDescription=your%20organization%20slug)

4. Get an [access token](https://docs.commercelayer.io/api/authentication) for your application. You should generate this in your sales channel or use our JavaScript [authentication library](https://github.com/commercelayer/commercelayer-js-auth).

5. Create one or more [SKUs](https://commercelayer.io/docs/data-model/skus) associated with prices and inventories.

6. Create one or more [SKU Lists](https://commercelayer.io/docs/data-model/sku-lists), either manual or dynamic using a regular expression. Name and description attributes of the SKU List will be used in the Microstore application as greetings and description.

7. Open the microstore using the URL format: `<your-deployed-microstore-url>/microstore/list/<skuListId>?accessToken=<your-access-token>`. For example: `https://microstore.yourbrand.com/microstore/list/qkykhjYrGk?accessToken=eyJhbGciOiJIUzUxMiJ9`.

## Hosted version

Any Commerce Layer account comes with a hosted version of the Microstore application. You can customize it by adding your organization logo, favicon, and primary color.

You can use the hosted version of the Microstore application by building the related URL with the following format: `https://<your-organization-subdomain>.commercelayer.app/microstore/list/<skuListId>?accessToken=<your-access-token>`.

The default behavior is the _Buy Now_ mode. This means that as soon as customers add a product to the shopping bag they are redirected directly to the [Checkout application](https://github.com/commercelayer/commercelayer-react-checkout). If other line items were present in the order, they will be deleted.

### URL parameters

| Parameter     | Description                                                                                                                                                                                                                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `skuListId`   | SKU List Id. You can use the attribute quantity of SKU List Item to add a default quantity. Default quantity is **1**. Microstore will show up to 12 items of the SKU List. Name and description attributes of the SKU List will be used in the Microstore application as greetings and description. |
| `accessToken` | A valid sales channel access token.                                                                                                                                                                                                                                                                  |
| `all`         | If `true`, a _Buy All_ button is activated on top of the products list. This will clear the line items of the order and add all the items listed on the page to the order (with the quantity set in the SKU List Items).                                                                             |
| `cart`        | If `true`, the Microstore application will work together with the [Cart](https://github.com/commercelayer/commercelayer-cart) one.                                                                                                                                                                   |

`https://<your-organization-subdomain>.commercelayer.app/microstore/list/<skuListId>?accessToken=<your-access-token>`

For example: `https://yourbrand.commercelayer.app/microstore/list/qkykhjYrGk?accessToken=eyJhbGciOiJIUzUxMiJ9`

### Cart options

> When the Microstore application works in conjunction with the [Cart application](https://github.com/commercelayer/commercelayer-cart), we decided to disable the _Buy Now_ mode, so as to avoid removing previous line items from the order on the "Buy now" button click.

Enabling the Cart application will add a behavior option about how the items are added to the shopping bag:

| Parameter | Description                                                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `inline`  | If `true`, when customers click on the "Add to bag" button, they will remain on the page, otherwise they will be redirected immediately to the Cart application. |

For example: `https://yourbrand.commercelayer.app/microstore/list/qkykhjYrGk?accessToken=eyJhbGciOiJIUzUxMiJ9&cart=true&inline=true`

Any Commerce Layer account comes with a hosted version of the Cart application.

## Contributors guide

1. Fork [this repository](https://github.com/commercelayer/mfe-microstore) (you can learn how to do this [here](https://help.github.com/articles/fork-a-repo)).

2. Clone the forked repository like so:

```bash
git clone https://github.com/<your username>/mfe-microstore.git && cd mfe-microstore
```

3. First, install dependencies and run the development server:

```
pnpm install
pnpm dev
```

4. Set your environment with `.env.local` starting from `.env.local.sample`.

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can use the following format to open the Microstore: `http://localhost:3000/microstore/list/<skuListId>?accessToken=<your-access-token>`.

6. Make your changes and create a pull request ([learn how to do this](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)).

7. Someone will attend to your pull request and provide some feedback.

## Need help?

1. Join [Commerce Layer's Slack community](https://slack.commercelayer.app).

2. Create an [issue](https://github.com/commercelayer/mfe-microstore/issues) in this repository.

3. Ping us [on Twitter](https://twitter.com/commercelayer).

## License

This repository is published under the [MIT](LICENSE) license.
