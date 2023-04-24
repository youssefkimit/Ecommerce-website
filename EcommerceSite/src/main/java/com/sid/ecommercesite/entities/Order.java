package com.sid.ecommercesite.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;


import java.util.Collection;
import java.util.Date;
@Entity
@Table(name="orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    @OneToMany(mappedBy = "order")
    private Collection<OrderItem> orderItems;
    @ManyToOne
    private Client client;

    private double totalAmount;
    @OneToOne
    private Payment payment;
    public Order(Date date, Double totalAmount,Client client) {
        this.client=client;
        this.date = date;
        this.totalAmount = totalAmount;
    }

}