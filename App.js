import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { socket } from './socket.js';

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [isPolling, setPolling] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socket.on('serverMessage', (flag) => {
      setServerMessage(flag);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('serverMessage');
    };
  }, []);

  useEffect(() => {
    let pollInterval;

    if (isPolling) {
      const poll = () => {
        socket.emit("clientMessage", 1);
      };

      poll(); // initial call to start polling
      pollInterval = setInterval(poll, 1000);
    } else {
      console.log("Polling Complete");
    }

    return () => clearInterval(pollInterval); // Cleanup interval on unmount or stop polling
  }, [isPolling]);

  const toggleConnection = () => {
    if (isConnected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  };

  const handlePolling = () => {
    setPolling((prevIsPolling) => !prevIsPolling);
  };

  const sendMessageToServer = () => {
    socket.emit('clientMessage', 'User is not participating');
  };

  return (
    <View style={styles.container}>
      <Text>Status: {isConnected ? 'Connected' : 'Disconnected'}</Text>
      <Text>Server Message: {serverMessage}</Text>
      <Button
        onPress={toggleConnection}
        title={isConnected ? 'Disconnect' : 'Connect'}
        color={isConnected ? 'red' : 'green'}
      />
      <Button
        onPress={handlePolling}
        title={isPolling ? 'Stop Monitoring' : 'Start Monitoring'}
        color={isPolling ? 'red' : 'green'}
      />
      <Button onPress={sendMessageToServer} title="Send Message" color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
