package com.sid.ecommercesite.web;


import com.sid.ecommercesite.dao.ClientRepository;
import com.sid.ecommercesite.dao.OrderItemRepository;
import com.sid.ecommercesite.dao.OrderRepository;
import com.sid.ecommercesite.dao.ProductRepository;
import com.sid.ecommercesite.entities.Client;
import com.sid.ecommercesite.entities.Order;
import com.sid.ecommercesite.entities.OrderItem;
import com.sid.ecommercesite.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
public class OrderController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ClientRepository clientRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderItemRepository;
    @PostMapping("/orders")
    public Order saveOrder(@RequestBody OrderForm orderForm){
        Client client=new Client();
        client.setName(orderForm.getClient().getName());
        client.setEmail(orderForm.getClient().getEmail());
        client.setAddress(orderForm.getClient().getAddress());
        client.setPhoneNumber(orderForm.getClient().getPhoneNumber());
        client.setUsername(orderForm.getClient().getUsername());
        client=clientRepository.save(client);
        System.out.println(client.getId());

        Order order=new Order();
        order.setClient(client);
        order.setDate(new Date());
        order=orderRepository.save(order);
        double total=0.0;
        for(OrderProduct p:orderForm.getProducts()){
            OrderItem orderItem=new OrderItem();
            orderItem.setOrder(order);
            Product product=productRepository.findById(p.getProduct().getId()).get();
            orderItem.setProduct(product);
            orderItem.setPrice(product.getCurrentPrice());
            orderItem.setQuantity(p.getQuantity());
            orderItemRepository.save(orderItem);
            total+=p.getQuantity()*product.getCurrentPrice();
        }
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    @GetMapping("/allOrders")
    public List<Order> getOrder(){

        List<Order> orders = orderRepository.findALLOrders();
        return orders;
    }

}