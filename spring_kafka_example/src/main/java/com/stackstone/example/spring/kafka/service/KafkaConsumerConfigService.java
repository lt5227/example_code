package com.stackstone.example.spring.kafka.service;

import com.alibaba.fastjson2.JSONObject;
import com.stackstone.example.spring.kafka.entity.KafkaConsumerConfig;

import java.util.List;

/**
 * The interface Kafka consumer config service.
 *
 * @author lee
 */
public interface KafkaConsumerConfigService {

    /**
     * Record kafka offset.
     *
     * @param kafkaConsumerConfigId the kafka consumer config id
     * @param partition             the partition
     * @param offset                the offset
     * @return the kafka consumer config
     */
    KafkaConsumerConfig recordKafkaOffset(long kafkaConsumerConfigId, int partition, long offset);

    /**
     * Gets kafka offset.
     *
     * @param kafkaConsumerConfigId the kafka consumer config id
     * @return the kafka offset
     */
    JSONObject getKafkaOffset(long kafkaConsumerConfigId);

    /**
     * Find all list.
     *
     * @return the list
     */
    List<KafkaConsumerConfig> findAll();

    /**
     * Stop consumer boolean.
     *
     * @param id the id
     */
    void stopConsumer(Long id);

    /**
     * Start consumer.
     *
     * @param id the id
     */
    void startConsumer(Long id);
}
