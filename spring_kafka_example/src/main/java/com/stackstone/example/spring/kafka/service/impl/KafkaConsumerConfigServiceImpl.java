package com.stackstone.example.spring.kafka.service.impl;

import com.alibaba.fastjson2.JSONObject;
import com.stackstone.example.spring.kafka.entity.KafkaConsumerConfig;
import com.stackstone.example.spring.kafka.repository.KafkaConfigRepository;
import com.stackstone.example.spring.kafka.service.KafkaConsumerConfigService;
import org.springframework.kafka.config.KafkaListenerEndpointRegistry;
import org.springframework.kafka.listener.MessageListenerContainer;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author lee
 */
@Service
public class KafkaConsumerConfigServiceImpl implements KafkaConsumerConfigService {

    private final KafkaConfigRepository kafkaConfigRepository;

    private final KafkaListenerEndpointRegistry registry;

    public KafkaConsumerConfigServiceImpl(KafkaConfigRepository kafkaConfigRepository,
                                          KafkaListenerEndpointRegistry registry) {
        this.kafkaConfigRepository = kafkaConfigRepository;
        this.registry = registry;
    }

    @Override
    public KafkaConsumerConfig recordKafkaOffset(long kafkaConsumerConfigId, int partition, long offset) {
        KafkaConsumerConfig kafkaConsumerConfig = kafkaConfigRepository.findById(kafkaConsumerConfigId).orElseThrow();
        JSONObject topicOffsetJson = Optional.ofNullable(kafkaConsumerConfig.getTopicOffset()).orElse(new JSONObject());
        topicOffsetJson.put(kafkaConsumerConfig.getKafkaTopic() + "$" + partition, offset + 1);
        kafkaConsumerConfig.setTopicOffset(topicOffsetJson);
        return kafkaConfigRepository.save(kafkaConsumerConfig);
    }

    @Override
    public JSONObject getKafkaOffset(long kafkaConsumerConfigId) {
        return Optional.ofNullable(kafkaConfigRepository.findById(kafkaConsumerConfigId).orElseThrow().getTopicOffset()).orElse(new JSONObject());
    }

    @Override
    public List<KafkaConsumerConfig> findAll() {
        return kafkaConfigRepository.findAll();
    }

    @Override
    public void stopConsumer(Long id) {
        KafkaConsumerConfig kafkaConsumerConfig = kafkaConfigRepository.findById(id).orElseThrow();
        String containerId = "DynamicConsumer-" + kafkaConsumerConfig.getId();
        MessageListenerContainer container = registry.getListenerContainer(containerId);
        if (container != null) {
            container.stop();
        }
    }

    @Override
    public void startConsumer(Long id) {
        KafkaConsumerConfig kafkaConsumerConfig = kafkaConfigRepository.findById(id).orElseThrow();
        String containerId = "DynamicConsumer-" + kafkaConsumerConfig.getId();
        MessageListenerContainer container = registry.getListenerContainer(containerId);
        if (container != null) {
            container.start();
        }
    }
}
