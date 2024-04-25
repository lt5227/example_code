package com.stackstone.example.spring.kafka.bo;

import lombok.Data;
import lombok.SneakyThrows;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


/**
 * @author lee
 */
@Data
public class ClassMethodArgs {
    private String className;
    private String method;
    private List<String> args;

    public ClassMethodArgs(String className, String method, List<String> args) {
        this.className = className;
        this.method = method;
        this.args = args;
    }

    /**
     * 解析输入字符串以创建 ClassMethodArgs 对象
     *
     * @param input 包含类名、方法名和参数列表的字符串
     * @return IndexClassMethod 对象
     */
    public static ClassMethodArgs parseMethod(String input) {
        int hashIndex = input.indexOf("#");
        String className = input.substring(0, hashIndex);
        String remainder = input.substring(hashIndex + 1);

        int parenthesisIndex = remainder.indexOf("(");
        String methodName = remainder.substring(0, parenthesisIndex);
        String paramsStr = remainder.substring(parenthesisIndex + 1, remainder.length() - 1);
        List<String> params = paramsStr.isEmpty() ? new ArrayList<>() : Arrays.asList(paramsStr.split("\\s*,\\s*"));

        return new ClassMethodArgs(className, methodName, params);
    }

    @SneakyThrows
    public Class<?>[] getArgsClasses() {
        List<Class<?>> argClasses = new ArrayList<>();
        for (String arg : this.args) {
            argClasses.add(Class.forName(arg));
        }
        return argClasses.toArray(new Class[0]);
    }
}

