import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import './FlightTracker.css';

const FlightTracker = () => {
    // Estados para gestionar los datos de vuelos, estado de conexión y errores.
    const [flights, setFlights] = useState({});
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [error, setError] = useState(null);

    useEffect(() => {
        connectWebSocket(); // Inicia la conexión al WebSocket al montar el componente.
    }, []);

    const connectWebSocket = () => {
        try {
            setConnectionStatus('Connecting...');
            const socket = new SockJS('http://localhost:8080/ws-flight-tracker'); // Crea la conexión base.
            const stomp = Stomp.over(socket); // Configura el protocolo STOMP.

            stomp.debug = (str) => console.log('STOMP:', str); // Habilita logs para depuración.

            // Establece la conexión y define el comportamiento en caso de éxito o error.
            stomp.connect({}, frame => {
                setConnectionStatus('Connected');

                // Se suscribe a un canal donde recibe actualizaciones en tiempo real de los vuelos.
                stomp.subscribe('/topic/flights', message => {
                    try {
                        const flightData = JSON.parse(message.body); // Convierte el mensaje a JSON.
                        // Actualiza el estado con la información del vuelo recibido.
                        setFlights(prev => ({
                            ...prev,
                            [flightData.flightCode]: flightData
                        }));
                    } catch (e) {
                        console.error('Error parsing message:', e);
                        setError('Error parsing flight data');
                    }
                });
            }, error => {
                setConnectionStatus('Error connecting');
                setError(error.toString());
            });

            return () => stomp.disconnect(); // Limpia la conexión al desmontar el componente.
        } catch (e) {
            console.error('Error in connectWebSocket:', e);
            setConnectionStatus('Error');
            setError(e.toString());
        }
    };

    return (
        <div className="flight-tracker">
            <h1>Flight Radar Control Center</h1>
            
            {/* Muestra el estado de conexión y el total de vuelos */}
            <div className="status-panel">
                <p>Connection Status: {connectionStatus}</p>
                {error && <p className="error">Error: {error}</p>}
                <p>Total Flights: {Object.keys(flights).length}</p>
            </div>
            
            {/* Tabla dinámica que lista los datos de los vuelos */}
            <div className="flight-table-container">
                <table className="flight-table">
                    <thead>
                        <tr>
                            <th>Flight Code</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Course (°)</th>
                            <th>Speed (knots)</th>
                            <th>Altitude (ft)</th>
                            <th>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(flights).map(flight => (
                            <tr key={flight.flightCode}>
                                <td>{flight.flightCode}</td>
                                <td>{flight.latitude?.toFixed(4)}°</td>
                                <td>{flight.longitude?.toFixed(4)}°</td>
                                <td>{flight.course?.toFixed(1)}°</td>
                                <td>{flight.speed?.toFixed(0)}</td>
                                <td>{flight.altitude?.toFixed(0)}</td>
                                <td>{flight.timestamp ? new Date(flight.timestamp).toLocaleTimeString() : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FlightTracker;
