package com.stackstone.example.spring.kafka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;

/**
 * @author lee
 */
@SpringBootApplication
@EntityScan(basePackages = "com.stackstone.example")
@EnableJpaRepositories(basePackages = "com.stackstone.example")
@Import(cn.hutool.extra.spring.SpringUtil.class)
public class SpringKafkaExampleApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringKafkaExampleApplication.class, args);
    }
}
