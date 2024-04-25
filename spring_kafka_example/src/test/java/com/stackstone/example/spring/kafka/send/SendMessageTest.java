package com.stackstone.example.spring.kafka.send;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.junit.jupiter.api.Test;

import java.util.Properties;

/**
 * @author lee
 */
public class SendMessageTest {

    @Test
    public void sendMessageToKafka() throws Exception {
        String topic = "dynamic_topic";
        //String topic = "test"
        Properties properties = new Properties();
        // broker的地址清单，建议至少填写两个，避免宕机
        properties.put("bootstrap.servers", "127.0.0.1:9092");
        // acks 指定必须有多少个分区副本接收消息，生产者才认为消息写入成功，用户检测数据丢失的可能性
        // acks=0 生产者在成功写入消息之前不会等待任何来自服务器的响应。无法监控数据是否发送成功，但可以以网络能够支持的最大速度发送消息，达到很高的吞吐量。
        // acks=1 只要集群的首领节点收到消息，生产者就会收到来自服务器的成功响应。
        // acks=all 只有所有参与复制的节点全部收到消息时，生产者才会收到来自服务器的成功响应。这种模式是最安全的，
        properties.put("acks", "all");
        // retries 生产者从服务器收到的错误有可能是临时性的错误的次数
        properties.put("retries", 0);
        // batch.size 该参数指定了一个批次可以使用的内存大小，按照字节数计算（而不是消息个数)
        properties.put("batch.size", 16384);
        // linger.ms 该参数指定了生产者在发送批次之前等待更多消息加入批次的时间，增加延迟，提高吞吐量
        properties.put("linger.ms", 1);
        // buffer.memory 该参数用来设置生产者内存缓冲区的大小，生产者用它缓冲要发送到服务器的消息。
        properties.put("buffer.memory", 33554432);
        // key 和 value 的序列化
        properties.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        properties.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        try (Producer<String, String> producer = new KafkaProducer<>(properties)) {
            for (int i = 0; i < 100; i++) {
                String message = "demo message number" + i;
                producer.send(new ProducerRecord<>(topic, "key" + i, message));
                Thread.sleep(1000);
            }
        }
    }
}
