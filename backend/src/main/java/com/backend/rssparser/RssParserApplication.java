package com.backend.rssparser;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@MapperScan("com.backend.rssparser.mapper")
@SpringBootApplication(exclude = {
        org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class
})
public class RssParserApplication {

    public static void main(String[] args) {
        SpringApplication.run(RssParserApplication.class, args);
    }

}
