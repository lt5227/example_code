package com.stackstone.example.spring.kafka.config;

import jakarta.annotation.PostConstruct;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.stereotype.Component;

/**
 * The type Kafka config.
 *
 * @author lee
 */
@Component
public class KafkaConfig {

    private final KafkaListenerEndpointRegistry registry;

    /**
     * 此处 IDEA 如果提示：Could not autowire. No beans of 'KafkaListenerEndpointRegistry' type found.
     * 可以忽略，KafkaListenerEndpointRegistry 是 Spring Boot 自动配置的，不需要手动配置
     * <p>
     * 详情请参考：<a href="https://blog.csdn.net/lt5227/article/details/138085715?spm=1001.2014.3001.5502">KafkaListenerEndpointRegistry 隐式注册分析</a>
     *
     * @param registry the registry
     */
    public KafkaConfig(KafkaListenerEndpointRegistry registry) {
        this.registry = registry;
    }

    /**
     * Init.
     */
    @PostConstruct
    public void init() {
        System.out.println(registry);
    }

}
