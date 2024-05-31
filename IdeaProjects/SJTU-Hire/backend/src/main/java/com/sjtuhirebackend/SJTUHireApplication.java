package com.sjtuhirebackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
//import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(exclude= {MongoAutoConfiguration.class})
//@EnableJpaRepositories(basePackages = "com.sjtuhirebackend.repository")
public class SJTUHireApplication {

	public static void main(String[] args) {
		SpringApplication.run(SJTUHireApplication.class, args);
	}

}
