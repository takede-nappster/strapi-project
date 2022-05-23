'use strict';
    
module.exports = {
    async search(ctx, next) {
    try {
        console.log(ctx);
        const products = await strapi.service('api::product.product').pagesReport();
        products.filter((value, index, tab)=>{
            console.log(value);
            return true;
        });
        ctx.body = products;

    } catch (err) {
        ctx.badRequest('Page report controller error', { moreDetails: err })
    }
    }
};
