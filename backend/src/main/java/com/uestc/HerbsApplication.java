package com.uestc;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class HerbsApplication {

    public static void main(String[] args) {
        SpringApplication.run(HerbsApplication.class, args);
    }

}
