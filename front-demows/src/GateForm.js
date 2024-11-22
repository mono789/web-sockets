import React, { useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const GateForm = () => {
    const [gate, setGate] = useState('');
    const [flightNumber, setFlightNumber] = useState('');
    const [destination, setDestination] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, () => {
            const gateInfo = {
                gate,
                flightNumber,
                destination,
                departureTime,
                status,
            };
            stompClient.send('/app/updateGate', {}, JSON.stringify(gateInfo));
        });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            {/* Título del formulario */}
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
                Update Gate Information
            </h1>
            {/* Formulario para actualizar la información de la puerta */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {/* Campo para la puerta */}
                <input
                    type="text"
                    placeholder="Gate"
                    value={gate}
                    onChange={(e) => setGate(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {/* Campo para el número de vuelo */}
                <input
                    type="text"
                    placeholder="Flight Number"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {/* Campo para el destino */}
                <input
                    type="text"
                    placeholder="Destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {/* Campo para la hora de salida */}
                <input
                    type="text"
                    placeholder="Departure Time"
                    value={departureTime}
                    onChange={(e) => setDepartureTime(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {/* Campo para el estado del vuelo */}
                <input
                    type="text"
                    placeholder="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{ padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                {/* Botón para enviar el formulario */}
                <button
                    type="submit"
                    style={{
                        padding: '10px',
                        fontSize: '16px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        cursor: 'pointer',
                    }}
                >
                    Update Gate
                </button>
            </form>
        </div>
    );
};

export default GateForm;
