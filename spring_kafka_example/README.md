# Demo 说明

本项目为基于 Spring Kafka 的动态配置消费者的 Demo，主要实现了以下功能：

1. 动态读取数据库配置连接 Kafka 地址
2. 动态创建 Kafka 消费者，并监听指定的 Topic
3. 可以通过调用接口动态增加或删除消费者
4. 可以通过调用接口动态启动或停止 Kafka 的消费程序

项目需要依赖 MySQL 数据库，所以需要先创建数据库和表。
修改配置文件 `application.yml` 中的数据库连接信息，然后执行下面 sql 创建 database:

```sql
CREATE DATABASE IF NOT EXISTS spring_kafka_example CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

确保数据库连接正确后，由于项目使用了 Liquibase 进行数据库初始化和更新，所以只需要启动项目即可。
