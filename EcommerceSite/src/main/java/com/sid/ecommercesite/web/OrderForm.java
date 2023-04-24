package com.sid.ecommercesite.web;

import com.sid.ecommercesite.entities.Client;
import com.sid.ecommercesite.entities.Product;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;
@Data
public class OrderForm {
    private Client client=new Client();
    private List<OrderProduct> products=new ArrayList<>();


}
@Data
class OrderProduct{
    //private Long id;
    private Product product;
    private int quantity;

}