import {Client} from './client.model';
import {ItemProduct} from './item-product.model';

export class Order {
  public id: number=1;
  public client:Client={name:"",address:"",phoneNumber:"",email:"",username:""};
  public products:Array<ItemProduct>=[];
  public totalAmount:number=0.0;
  public date:Date= new Date();
}
