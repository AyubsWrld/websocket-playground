import React, { useEffect, useState } from 'react';
import { View , Text , Button , StyleSheet } from 'react-native' ; 

import { socket } from './socket.js' ; 

// Initialize the socket connection

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [serverMessage, setServerMessage] = useState('');
  const [ participation , setParticipation ] = useState(false) ; 
  const [ isPolling , setPolling ] = useState(true) ; 

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    // Listen for server messages
    socket.on('serverMessage', (flag) => {
      // console.log('Message from server:', flag);
      setServerMessage(flag);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('serverMessage');
    };
  }, []);

  const sendMessageToServer = () => {
    socket.emit('clientMessage', 'User is not participating');
  };

  const toggleConnection = () => {
    if (isConnected) {
      socket.disconnect();
    } else {
      socket.connect();
    }
  };

  function polling(){
    setPolling(isPolling => !isPolling)
    if(isPolling && socket.connected){
      socket.emit("clientMessage" , 1 )
      setTimeout(() => {
       polling()
      }, 4000);
    }else{
      console.log("Polling Complete") ; 
    }
  }

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
        onPress={polling}
        title={'Start Monitoring' }
        color={'blue'}
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
