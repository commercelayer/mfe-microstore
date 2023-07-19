## [1.1.2](https://github.com/commercelayer/mfe-microstore/compare/v1.1.1...v1.1.2) (2022-09-09)


### Bug Fixes

* use `location.origin` instead of `href` to properly build cart url when buy-now mode is active ([9743167](https://github.com/commercelayer/mfe-microstore/commit/9743167b54909ef369057d6967a4f394c679fc4c))

## [1.1.1](https://github.com/commercelayer/mfe-microstore/compare/v1.1.0...v1.1.1) (2022-09-08)


### Bug Fixes

* show default quantity for each SKU item in list ([a98729f](https://github.com/commercelayer/mfe-microstore/commit/a98729f33d8d69d65e6c1f01330720cd3ef9c96c))

# [1.1.0](https://github.com/commercelayer/mfe-microstore/compare/v1.0.2...v1.1.0) (2022-08-09)


### Bug Fixes

* remove root page with SKUs array in url query string ([edc522c](https://github.com/commercelayer/mfe-microstore/commit/edc522c0912ba4f9dc0104b79d4b56765e4ee071))


### Features

* add support for SKU List ([2287dc1](https://github.com/commercelayer/mfe-microstore/commit/2287dc169c638152066132f837c991374de662eb))


### Performance Improvements

* request only necessary fields to reduce api payload ([30618df](https://github.com/commercelayer/mfe-microstore/commit/30618df8db6e4f76699ca803760540e140ae71f0))

## [1.0.2](https://github.com/commercelayer/mfe-microstore/compare/v1.0.1...v1.0.2) (2022-07-28)


### Bug Fixes

* solve safari bug for disabled button ([9348824](https://github.com/commercelayer/mfe-microstore/commit/93488242eaaac1c484d0358600ddc4be879529b1))

## [1.0.1](https://github.com/commercelayer/mfe-microstore/compare/v1.0.0...v1.0.1) (2022-07-26)


### Bug Fixes

* force check slug variable on forked microstore ([43c9469](https://github.com/commercelayer/mfe-microstore/commit/43c946944b8bc5afc319049b9574d0e9bc42748c))

# 1.0.0 (2022-07-26)


### Bug Fixes

* add `Buy All` button ([7b7cd22](https://github.com/commercelayer/mfe-microstore/commit/7b7cd226321b5a269fdd340af5eb962451348a5d))
* add `Buy All` button ([e6fa3fa](https://github.com/commercelayer/mfe-microstore/commit/e6fa3faaa237b3029059522759d75925c2074378))
* add branded 404 page layout ([208f3e8](https://github.com/commercelayer/mfe-microstore/commit/208f3e890a2fc919b07b1388804ac5c4e2aed846))
* add component to show error message in case of retryable api error ([1b8cab7](https://github.com/commercelayer/mfe-microstore/commit/1b8cab721a4d8b60f1ae6a8fdeb72a9b281b56d7))
* add quantity selector ([f44f23b](https://github.com/commercelayer/mfe-microstore/commit/f44f23b9476d97546551ce96493a31046dcfe6a5))
* add redirect to checkout in buy-all when cart is not enabled ([2f4bd2c](https://github.com/commercelayer/mfe-microstore/commit/2f4bd2cf393afdb677adaf838fb893fd626716f4))
* add styled select component ([e719b13](https://github.com/commercelayer/mfe-microstore/commit/e719b13cf15231a722e490ef7b027a37b07e0c11))
* adjust buttons responsiveness and style ([be506c2](https://github.com/commercelayer/mfe-microstore/commit/be506c20e4c2a55d43d4eb288d555daf236b34c7))
* adjust led for availability ([ee98fd5](https://github.com/commercelayer/mfe-microstore/commit/ee98fd5f807c8e4501ad017e9c053bb7b148d478))
* allow different add to cart button experiences ([b5243cd](https://github.com/commercelayer/mfe-microstore/commit/b5243cd0c8902c75981ecd78248353e384a4e546))
* avoid availability container infinite loop ([f6ef117](https://github.com/commercelayer/mfe-microstore/commit/f6ef11724115c91e72d1b5ef5f38fea7aa45d538))
* change favicon path ([bf5d5ea](https://github.com/commercelayer/mfe-microstore/commit/bf5d5ea28a37b768d5b4bbc8b14f9baafe77e758))
* change persistKey in OrderStorage to work with multiple organizations ([24cdeb6](https://github.com/commercelayer/mfe-microstore/commit/24cdeb6c4b29d2f8c0f42de44ddbb56d26880fae))
* cleanup settings and retrieval of initial data from URL query ([f0e7e33](https://github.com/commercelayer/mfe-microstore/commit/f0e7e3329fb3124c9a779071023df65bca16cf45))
* Disable `AddToCartButton` when an SKU is out of stock ([0d0a7ba](https://github.com/commercelayer/mfe-microstore/commit/0d0a7ba7c8c53f9f1ce8e109a9d213ebcbff9aa9))
* dynamic primary color ([8742191](https://github.com/commercelayer/mfe-microstore/commit/87421915dd1ea8514832092d47322e00eb1d2a5c))
* enforce redirect to /404 with proper status code ([3f2bcc8](https://github.com/commercelayer/mfe-microstore/commit/3f2bcc87c6d560fab3d3d57a9a9f0511e39592b3))
* fixed layout ([308caf0](https://github.com/commercelayer/mfe-microstore/commit/308caf0e0b22b82eb44d798f105ebe240ed76536))
* improve cart icon css ([65fe857](https://github.com/commercelayer/mfe-microstore/commit/65fe857ba18da16466f8b80a15ba147074b92bc7))
* improve retryOnError logic and api error handling ([4ae39c4](https://github.com/commercelayer/mfe-microstore/commit/4ae39c41bd5f55eeadb7c9ed70b69d7aa3a74bd6))
* improve retryOnError logic in useSettings to prevent "retry" message to appear too soon ([8bc9b48](https://github.com/commercelayer/mfe-microstore/commit/8bc9b48f40f2fb0485e487f60225d3b4547283a9))
* keep cart icon vertically aligned ([e41c208](https://github.com/commercelayer/mfe-microstore/commit/e41c208d5b2c883272aed667a0d747d2315e3f10))
* mobile version ([11c9867](https://github.com/commercelayer/mfe-microstore/commit/11c9867a01cbf5d8b573fef46163359dad927e8d))
* product card layout ([32054ab](https://github.com/commercelayer/mfe-microstore/commit/32054ab162ca9d23439563b36823cdc0eeecf9b9))
* remove buyNowMode to AddToCartButton and add ui feedback on success ([a704992](https://github.com/commercelayer/mfe-microstore/commit/a704992a979a5a727b985cb03ef3bcce3e168f5b))
* remove logic to set cart url when order id is available, since hosted cart set `cart_url` itself ([db3ae19](https://github.com/commercelayer/mfe-microstore/commit/db3ae199b907e3692040be164674984faac281cb))
* set prefix for api call ([d5394cf](https://github.com/commercelayer/mfe-microstore/commit/d5394cf03863f0423ead4380ec73c244cad797e0))
* set proper cart_url once order is created and cart is enabled from query string param ([19aca9e](https://github.com/commercelayer/mfe-microstore/commit/19aca9ece24320e2208b3bbf4a520e92e6413f4d))
* show error message in case buy-all fails ([0868e12](https://github.com/commercelayer/mfe-microstore/commit/0868e12af868c5b999c970477610cd8fa9c76511))
* tablet fixes ([952217a](https://github.com/commercelayer/mfe-microstore/commit/952217a037e4f2eb5d82d4fcd3781684c071122b))
* thumb img ratio ([9fad70e](https://github.com/commercelayer/mfe-microstore/commit/9fad70eb7e599cfd63fe9b856c58d193e43240e9))
* TW config ([5192697](https://github.com/commercelayer/mfe-microstore/commit/519269728598b531422eff67083ef5ee5d93eeac))
* update makeHostedApp helper to return a different URL structure for the hosted checkout app ([6228712](https://github.com/commercelayer/mfe-microstore/commit/62287126c49b5498749586dd9d756736fc5ba557))
* use correct prop to set default buyable quantity ([eaed20e](https://github.com/commercelayer/mfe-microstore/commit/eaed20e39de468e7af1882c2f621f5ed7b647c94))


### Features

* add commerce layer favicon ([1bcd2c9](https://github.com/commercelayer/mfe-microstore/commit/1bcd2c9dc9b409a3ffeb863255eac8139885c5f6))
* add link to powered by commerce layer ([cd892ed](https://github.com/commercelayer/mfe-microstore/commit/cd892ed7319e13341eb87a518d8cc997a5e9a9c9))
* add microstore path to next config ([5ea248b](https://github.com/commercelayer/mfe-microstore/commit/5ea248b0be403f69cf6633e1f642276670823024))
* add title and description, linted ([b65e447](https://github.com/commercelayer/mfe-microstore/commit/b65e44727274c32237a2bfe58c0ef638394526cd))
* add TopNav with cart icon and line items count ([11471b5](https://github.com/commercelayer/mfe-microstore/commit/11471b5ae6173ea308acbb357fd5ad4e36e52fed))
* first import ([1ec1619](https://github.com/commercelayer/mfe-microstore/commit/1ec1619cce712338dedf2e383765ab4ae7a47e67))
* new components ([961a9fe](https://github.com/commercelayer/mfe-microstore/commit/961a9feb055705a965469c3b4e481d0d4bc8f8ef))
* skeleton loader ([f518fcc](https://github.com/commercelayer/mfe-microstore/commit/f518fcc4406f4aa819f1a4c8d90d672031c89a1e))


### Performance Improvements

* minimize network requests thanks to react components refactored ([bbe53e7](https://github.com/commercelayer/mfe-microstore/commit/bbe53e73a86ed5ddf56dd30047a2abbd05bba09c))
* reduce price calls ([8b09932](https://github.com/commercelayer/mfe-microstore/commit/8b09932146d6d018c29573da01e5b273f2fc9de4))
