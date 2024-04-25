package com.stackstone.example.spring.kafka.controller;

import com.stackstone.example.spring.kafka.service.KafkaConsumerConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author lee
 */
@RestController
@RequestMapping("/dynamic-manage-consumer")
@Tag(name = "动态管理Kafka消费者 DEMO", description = "example code")
public class DynamicManageConsumerController {

    public final KafkaConsumerConfigService kafkaConsumerConfigService;

    public DynamicManageConsumerController(KafkaConsumerConfigService kafkaConsumerConfigService) {
        this.kafkaConsumerConfigService = kafkaConsumerConfigService;
    }

    @GetMapping("/stopTest")
    @Operation(summary = "停止消费程序",description = "停止消费程序")
    public String testStop(Long id) {
        kafkaConsumerConfigService.stopConsumer(id);
        return "success";
    }

    @GetMapping("/startTest")
    @Operation(summary = "开启消费程序", description = "开启消费程序")
    public String testStart(Long id) {
        kafkaConsumerConfigService.startConsumer(id);
        return "success";
    }
}
