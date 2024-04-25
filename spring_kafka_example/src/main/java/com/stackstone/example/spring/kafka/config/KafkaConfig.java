package com.stackstone.example.spring.kafka.config;

import com.alibaba.fastjson2.JSONObject;
import com.stackstone.example.spring.kafka.bo.ClassMethodArgs;
import com.stackstone.example.spring.kafka.consumer.DynamicConsumer;
import com.stackstone.example.spring.kafka.entity.KafkaConsumerConfig;
import com.stackstone.example.spring.kafka.service.KafkaConsumerConfigService;
import jakarta.annotation.PostConstruct;
import lombok.Getter;
import lombok.SneakyThrows;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.annotation.KafkaListenerAnnotationBeanPostProcessor;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.config.MethodKafkaListenerEndpoint;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.messaging.handler.annotation.support.MessageHandlerMethodFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

/**
 * The type Kafka config.
 *
 * @author lee
 */
@Component
public class KafkaConfig {

    private final KafkaConsumerConfigService kafkaConsumerConfigService;

    private final KafkaListenerEndpointRegistry registry;

    private final KafkaListenerAnnotationBeanPostProcessor<String, String> postProcessor;

    @Getter
    private Map<String, DefaultKafkaConsumerFactory<String, String>> consumerFactoryMap = new ConcurrentHashMap<>();

    /**
     * 此处 IDEA 如果提示：Could not autowire. No beans of 'KafkaListenerEndpointRegistry' type found.
     * 可以忽略，KafkaListenerEndpointRegistry 是 Spring Boot 自动配置的，不需要手动配置
     * <p>
     * 详情请参考：<a href="https://blog.csdn.net/lt5227/article/details/138085715?spm=1001.2014.3001.5502">KafkaListenerEndpointRegistry 隐式注册分析</a>
     *
     * @param registry the registry
     */
    public KafkaConfig(KafkaListenerEndpointRegistry registry,
                       KafkaListenerAnnotationBeanPostProcessor postProcessor,
                       KafkaConsumerConfigService kafkaConsumerConfigService) {
        this.registry = registry;
        this.postProcessor = postProcessor;
        this.kafkaConsumerConfigService = kafkaConsumerConfigService;
    }

    /**
     * Init.
     */
    @PostConstruct
    @SneakyThrows
    public void init() {
        List<KafkaConsumerConfig> kafkaConsumerConfigs = kafkaConsumerConfigService.findAll();
        MessageHandlerMethodFactory methodFactory = postProcessor.getMessageHandlerMethodFactory();
        for (KafkaConsumerConfig kafkaConsumerConfig : kafkaConsumerConfigs) {
            String kafkaBroker = kafkaConsumerConfig.getKafkaBroker();
            if (!consumerFactoryMap.containsKey(kafkaBroker)) {
                JSONObject props = Optional.of(kafkaConsumerConfig.getKafkaConfig()).orElse(new JSONObject());
                props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, kafkaBroker);
                props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
                props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
                DefaultKafkaConsumerFactory<String, String> consumerFactory = new DefaultKafkaConsumerFactory<>(props);
                consumerFactoryMap.put(kafkaBroker, consumerFactory);
            }
            DefaultKafkaConsumerFactory<String, String> consumerFactory = consumerFactoryMap.get(kafkaBroker);
            ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
            factory.setConsumerFactory(consumerFactory);
            factory.setConcurrency(kafkaConsumerConfig.getConcurrency());

            MethodKafkaListenerEndpoint<String, String> endpoint = new MethodKafkaListenerEndpoint<>();
            ClassMethodArgs classMethodArgs = ClassMethodArgs.parseMethod(kafkaConsumerConfig.getBeanMethod());
            Class<? extends DynamicConsumer> clazz = (Class<? extends DynamicConsumer>) Class.forName(classMethodArgs.getClassName());
            // 获取构造函数
            Constructor<?> constructor = clazz.getDeclaredConstructor(long.class);
            endpoint.setBean(constructor.newInstance(kafkaConsumerConfig.getId()));
            Method method = ReflectionUtils.findMethod(clazz, classMethodArgs.getMethod(), classMethodArgs.getArgsClasses());
            endpoint.setMethod(method);
            endpoint.setMessageHandlerMethodFactory(methodFactory);
            endpoint.setId("DynamicConsumer-" + kafkaConsumerConfig.getId());
            endpoint.setGroupId(kafkaConsumerConfig.getKafkaGroupId());
            endpoint.setTopicPartitions();
            endpoint.setTopics(kafkaConsumerConfig.getKafkaTopic());
            endpoint.setConcurrency(kafkaConsumerConfig.getConcurrency());
            endpoint.setBatchListener(true);
            registry.registerListenerContainer(endpoint, factory, false);
        }
        registry.start();
    }

}
