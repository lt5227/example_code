package com.stackstone.example.spring.kafka.consumer;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author lee
 */
@Slf4j
@Component
public class SimpleConsumer {

    @KafkaListener(topics = "test", groupId = "consumer01", batch = "true")
    public void consume01(String message) {
        log.info("consumer01: {}", message);
    }

    @KafkaListener(topics = "test", groupId = "consumer02", batch = "true")
    public void consume02(List<String> messages) {
        log.info("consumer02, count: {}, message: {}", messages.size(), messages);
    }

    @KafkaListener(topics = "test", groupId = "consumer03", batch = "true", autoStartup = "true")
    public void consume03(List<ConsumerRecord<String, String>> records) {
        log.info("consumer03, count: {}, message:{}", records.size(), records);
    }
}
