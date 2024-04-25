package com.stackstone.example.spring.kafka.consumer;

import cn.hutool.extra.spring.SpringUtil;
import com.stackstone.example.spring.kafka.service.KafkaConsumerConfigService;
import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.TopicPartition;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author lee
 */
@Slf4j
public class DemoDynamicConsumer extends DynamicConsumer {

    public DemoDynamicConsumer(long kafkaConsumerConfigId) {
        super(kafkaConsumerConfigId);
    }

    public void consumeMessage01(@Payload List<ConsumerRecord<String, String>> consumerRecords) {
        log.info("consumer01 received message count:{}", consumerRecords.size());
        processMessage(consumerRecords);
    }

    public void consumeMessage02(@Payload List<ConsumerRecord<String, String>> consumerRecords) {
        log.info("consumer02 received message count:{}", consumerRecords.size());
        processMessage(consumerRecords);
    }

    private void processMessage(List<ConsumerRecord<String, String>> consumerRecords) {
        Map<TopicPartition, Long> seekConfiguration = new HashMap<>();
        for (ConsumerRecord<String, String> consumerRecord : consumerRecords) {
            log.info("message content: {}", consumerRecord);
            updateTopicPartitionOffset(consumerRecord, seekConfiguration);
        }
        KafkaConsumerConfigService kafkaConsumerConfigService = SpringUtil.getBean(KafkaConsumerConfigService.class);
        seekConfiguration.forEach((topicPartition, offset) -> {
            kafkaConsumerConfigService.recordKafkaOffset(kafkaConsumerConfigId, topicPartition.partition(), offset);
        });
    }

    private static void updateTopicPartitionOffset(ConsumerRecord<String, String> consumerRecord, Map<TopicPartition, Long> seekConfiguration) {
        String topic = consumerRecord.topic();
        int partition = consumerRecord.partition();
        TopicPartition topicPartition = new TopicPartition(topic, partition);
        Long offset = seekConfiguration.get(topicPartition);
        if (offset == null) {
            seekConfiguration.put(topicPartition, consumerRecord.offset());
        } else {
            seekConfiguration.put(topicPartition, Math.max(offset, consumerRecord.offset()));
        }
    }
}
