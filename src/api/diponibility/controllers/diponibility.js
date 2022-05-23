'use strict';

/**
 *  diponibility controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::diponibility.diponibility', ({strapi}) =>({
    async search(ctx, next) {
        try {
            if(ctx.request.body.key){
                let key = ctx.request.body.key;
                console.log("#### !");
                let disponibilities = await strapi.entityService.findMany('api::diponibility.diponibility', {
                    populate: {product: {
                        filters: {
                            $or:[
                                {
                                    name: { $containsi: key }
                                },
                                {
                                    description: { $containsi: key }
                                }
                            ]
                        }
                    }, 
                    pharmcy: true},
                    filters: {
                        quantity: { $gt: 0 }
                    }
                });
                disponibilities = disponibilities.filter((val, i, ob)=> {return val.product!=null && val.product!=undefined});
                ctx.send(disponibilities);
            }else{
                throw new Error("Invalid input");
            }
        } catch (err) {
            console.log(err);
            ctx.badRequest('Page report controller error', { moreDetails: err })
        }
    }
}));
