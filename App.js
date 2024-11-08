import { StyleSheet, Text, View  , Button } from 'react-native';
import { socket } from './socket'; // Import the socket
import { useEffect, useState } from 'react';

export default function App() {
  const name = "Ayub" ;
  const isConnected = false ; 

  function hello(){
    console.log("HEllo") ; 
  }

  function facilitateConnection(){
    socket.on("connect", hello ) ; 
  }
  return (
    <View style={styles.container}>
      <Text>Status: { isConnected ? 'connected' : 'disconnected' }</Text>
      {/* <Text>Transport: { transport }</Text> */}
      <Button
        onPress={facilitateConnection}  
        title={ isConnected ? "Disconnect" : "Connect" }
        color={ isConnected ? "red" : "green" }
      />
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
