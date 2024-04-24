DROP TABLE IF EXISTS `kafka_consumer_config`;

CREATE TABLE `kafka_consumer_config`
(
    `id`             bigint       NOT NULL AUTO_INCREMENT COMMENT '自增主键',
    `kafka_broker`   varchar(255) NOT NULL COMMENT 'kafka broker地址',
    `kafka_topic`    varchar(255) NOT NULL COMMENT 'kafka topic',
    `kafka_group_id` varchar(255) NOT NULL COMMENT 'kafka group id',
    `topic_offset`   json DEFAULT NULL COMMENT 'topic 消费的 offset',
    `concurrency`    int  DEFAULT 1 COMMENT '消费者并发数需要和partition数一致',
    `bean_method`    varchar(255) NOT NULL COMMENT '消费组件bean方法',
    `kafka_config`   json DEFAULT NULL COMMENT 'kafka配置',
    `run_status`     int  DEFAULT 0 COMMENT '运行状态 0:未运行 1:运行中',
    PRIMARY KEY (`id`)
) ENGINE = InnoDB
  AUTO_INCREMENT = 1
  DEFAULT CHARSET = utf8mb4 COMMENT ='kafka消费者配置表';
