package com.sid.ecommercesite;

import com.sid.ecommercesite.dao.CategoryRepository;
import com.sid.ecommercesite.dao.ProductRepository;
import com.sid.ecommercesite.entities.Category;
import com.sid.ecommercesite.entities.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.Random;
@SpringBootApplication
public class EcommerceSiteApplication implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private RepositoryRestConfiguration repositoryRestConfiguration;
    public static void main(String[] args) {
        SpringApplication.run(EcommerceSiteApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        repositoryRestConfiguration.exposeIdsFor(Product.class,Category.class);

    }
}
/*   categoryRepository.save(new Category(null,"survettes",null,null,null));
         categoryRepository.save(new Category(null,"jackets",null,null,null));
        Random rnd=new Random();
         categoryRepository.findAll().forEach(c->{
            Product p=new Product();
            p.setName("jacket ");
            p.setCurrentPrice(150);
            p.setAvailable(false);
            p.setPromotion(false);
            p.setCategory(c);
            p.setSelected(rnd.nextBoolean());
            p.setPhotoName("unknown.png");
            productRepository.save(p);
        });*/