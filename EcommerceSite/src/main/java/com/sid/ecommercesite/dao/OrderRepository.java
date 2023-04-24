package com.sid.ecommercesite.dao;

import com.sid.ecommercesite.entities.Order;
import com.sid.ecommercesite.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("*")
@RepositoryRestResource
public interface OrderRepository extends JpaRepository<Order, Long> {


    @Query("SELECT new Order(o.date, o.totalAmount,o.client) FROM Order o order by o.date DESC ")
    List<Order> findALLOrders();

}
