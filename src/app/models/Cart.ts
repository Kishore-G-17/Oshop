import { CartItem } from "./CartItem.cart";

export interface Cart {   
    dateCreated: number;
    key: string;
    items: CartItem[];
}