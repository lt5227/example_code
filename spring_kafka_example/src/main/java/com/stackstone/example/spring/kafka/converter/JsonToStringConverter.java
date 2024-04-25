package com.stackstone.example.spring.kafka.converter;

import com.alibaba.fastjson2.JSONObject;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

/**
 * @author lee
 */
@Converter
public class JsonToStringConverter implements AttributeConverter<JSONObject, String> {

    @Override
    public String convertToDatabaseColumn(JSONObject attribute) {
        return attribute == null ? null : attribute.toJSONString();
    }

    @Override
    public JSONObject convertToEntityAttribute(String dbData) {
        return dbData == null ? null : JSONObject.parseObject(dbData);
    }
}
