import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import './GateBoard.css'; 
import GateForm from './GateForm';
const GateBoard = () => {
    const [gateData, setGateData] = useState([]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/gates', (message) => {
                if (message.body) {
                    const updatedGate = JSON.parse(message.body);
                    setGateData(prevData => {
                        const updatedData = prevData.filter(data => data.gate !== updatedGate.gate);
                        return [...updatedData, updatedGate];
                    });
                }
            });
        });

        return () => {
            stompClient.disconnect();
        };
    }, []);

    return (
        <div className="gate-board">
            <GateForm />
            
            <table className="gate-table">
                <thead>
                    <tr>
                        <th>Gate</th>
                        <th>Flight Number</th>
                        <th>Destination</th>
                        <th>Departure Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {gateData.map((gateInfo, index) => (
                        <tr key={index}>
                            <td>{gateInfo.gate}</td>
                            <td>{gateInfo.flightNumber}</td>
                            <td>{gateInfo.destination}</td>
                            <td>{gateInfo.departureTime}</td>
                            <td>{gateInfo.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GateBoard;