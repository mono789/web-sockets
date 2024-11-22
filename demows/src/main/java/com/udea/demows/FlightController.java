package com.udea.demows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.time.LocalDateTime;
import java.util.Random;

@Controller
public class FlightController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/flight/update")
    @SendTo("/topic/flights")
    public FlightData handleFlightUpdate(FlightData flightData) {
        flightData.setTimestamp(LocalDateTime.now());
        return flightData;
    }

    // Método de simulación para testing
    @Scheduled(fixedRate = 5000) // Actualiza cada 5 segundos
    public void sendSimulatedData() {
        FlightData simulatedFlight = new FlightData(
                "AA" + (100 + new Random().nextInt(900)),  // Código de vuelo aleatorio
                40.7128 + (new Random().nextDouble() - 0.5) * 0.1,  // Latitud cerca de NYC
                -74.0060 + (new Random().nextDouble() - 0.5) * 0.1, // Longitud cerca de NYC
                new Random().nextDouble() * 360,  // Curso aleatorio
                400 + new Random().nextDouble() * 100,  // Velocidad entre 400-500 nudos
                30000 + new Random().nextDouble() * 5000,  // Altitud entre 30000-35000 pies
                LocalDateTime.now()
        );

        messagingTemplate.convertAndSend("/topic/flights", simulatedFlight);
    }
}
