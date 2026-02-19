package com.ongconnet.ongconnect;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class OngconnectApplication {

	public static void main(String[] args) {
		SpringApplication.run(OngconnectApplication.class, args);
	}

}
