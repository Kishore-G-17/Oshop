import { ShippingDetails } from "./shippingDetails.order";

export class Order{        
    public datePlaced: string = ''; 
    public key : string = '';           

    constructor( public userId: string, 
                 public shippingDetails: ShippingDetails, 
                 public items: any,
                 public totalPrice: any){
        
        this.datePlaced = new Date().getDate().toString();
    }
}