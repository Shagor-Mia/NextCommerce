import { product } from "./schemas/product";
import { productCategory } from "./schemas/product-category";
import { promotionCode } from "./schemas/promotion-codes";
import { type SchemaTypeDefinition } from "sanity";
import { promotionCampaign } from "./schemas/promotion.ts-campaign";
import { order, orderItem, shippingAddress } from "./schemas/order";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    promotionCode,
    promotionCampaign,

    productCategory,
    product,

    shippingAddress,
    orderItem,
    order,
  ],
};
