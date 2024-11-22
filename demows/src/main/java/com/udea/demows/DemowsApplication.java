package com.udea.demows;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DemowsApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemowsApplication.class, args);
	}

}
