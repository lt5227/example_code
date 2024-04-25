package com.stackstone.example.spring.kafka.repository;

import com.stackstone.example.spring.kafka.entity.KafkaConsumerConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author lee
 */
@Repository
public interface KafkaConfigRepository extends JpaRepository<KafkaConsumerConfig, Long> {
}
