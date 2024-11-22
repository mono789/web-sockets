package com.udea.demows;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FlightData {
    private String flightCode;
    private double latitude;
    private double longitude;
    private double course;     // en grados
    private double speed;      // en nudos
    private double altitude;   // en pies
    private LocalDateTime timestamp;
}