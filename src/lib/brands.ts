import data from '@/data/brands.json';
import type {Product} from './shop';
export interface Brand {name:string;slug:string;count:number;inStockCount:number;categoryNames:string[];productIds:number[];sourceUrl:string}
export const brands=data as Brand[];
export function productBrand(product:Product){return brands.find(brand=>brand.productIds.includes(product.id));}
export function isBrand(product:Product,slug:string){return brands.find(brand=>brand.slug===slug)?.productIds.includes(product.id)??false;}
