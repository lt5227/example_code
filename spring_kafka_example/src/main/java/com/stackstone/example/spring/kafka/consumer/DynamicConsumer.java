package com.stackstone.example.spring.kafka.consumer;

import cn.hutool.extra.spring.SpringUtil;
import com.alibaba.fastjson2.JSONObject;
import com.stackstone.example.spring.kafka.service.KafkaConsumerConfigService;
import org.apache.kafka.common.TopicPartition;
import org.springframework.kafka.listener.ConsumerSeekAware;

import java.util.Map;

/**
 * @author lee
 */
public class DynamicConsumer implements ConsumerSeekAware {

    protected long kafkaConsumerConfigId;

    public DynamicConsumer(long kafkaConsumerConfigId) {
        this.kafkaConsumerConfigId = kafkaConsumerConfigId;
    }

    @Override
    public void onPartitionsAssigned(Map<TopicPartition, Long> assignments, ConsumerSeekCallback callback) {
        KafkaConsumerConfigService kafkaConsumerConfigService = SpringUtil.getBean(KafkaConsumerConfigService.class);
        JSONObject kafkaOffsetJson = kafkaConsumerConfigService.getKafkaOffset(kafkaConsumerConfigId);
        assignments.keySet().forEach(partition -> {
            Long offset = kafkaOffsetJson.getLong(partition.topic() + "$" + partition.partition());
            if (offset == null) {
                offset = 0L;
            }
            callback.seek(partition.topic(), partition.partition(), offset);
        });
    }
}
