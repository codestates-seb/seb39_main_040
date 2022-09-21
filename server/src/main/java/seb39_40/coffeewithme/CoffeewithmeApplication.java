package seb39_40.coffeewithme;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CoffeewithmeApplication {

	public static void main(String[] args) {
		SpringApplication.run(CoffeewithmeApplication.class, args);
	}

}
