package com.stackstone.example.spring.kafka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author lee
 */
@SpringBootApplication
@EntityScan(basePackages = "com.stackstone.example")
@EnableJpaRepositories(basePackages = "com.stackstone.example")
public class SpringKafkaExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringKafkaExampleApplication.class, args);
    }

}
