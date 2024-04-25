package com.stackstone.example.spring.kafka.entity;

import com.alibaba.fastjson2.JSONObject;
import com.stackstone.example.spring.kafka.converter.JsonToStringConverter;
import jakarta.persistence.*;
import lombok.Data;

/**
 * @author lee
 */
@Data
@Entity
@Table(name = "kafka_consumer_config")
public class KafkaConsumerConfig {
    /**
     * 自增主键
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    /**
     * kafka broker地址
     */
    @Column(name = "kafka_broker")
    private String kafkaBroker;

    /**
     * kafka topic
     */
    @Column(name = "kafka_topic")
    private String kafkaTopic;

    /**
     * kafka consumer group id
     */
    @Column(name = "kafka_group_id")
    private String kafkaGroupId;

    /**
     * kafka group id
     */
    @Column(name = "topic_offset")
    @Convert(converter = JsonToStringConverter.class)
    private JSONObject topicOffset;

    /**
     * 消费者并发数需要和 partition 数量一致
     */
    @Column(name = "concurrency")
    private Integer concurrency;

    /**
     * 消费者 bean 方法
     */
    @Column(name = "bean_method")
    private String beanMethod;

    /**
     * kafka 配置
     */
    @Column(name = "kafka_config")
    @Convert(converter = JsonToStringConverter.class)
    private JSONObject kafkaConfig;

    /**
     * 运行状态
     */
    @Column(name = "run_status")
    private Integer runStatus;
}
