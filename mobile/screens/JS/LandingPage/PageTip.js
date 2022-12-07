import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function PageTip() {
  return (
    <View style = {styles.PageTip}>
      <View>
        <Text style ={styles.text}>
          Don't worry. It's all anonymous...
        </Text>
      </View>
      <View style = {styles.line}/>
    </View>
  );
}

const styles = StyleSheet.create({
    PageTip: {
        position: 'relative',
        justifyContent: 'center',
        justifyItems: 'center',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'column',
        top: '2%',
        width: '80%',
        left: '10%',
    },
    line: {
        width: '80%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
        zIndex: -1,
    },
    text: {
        fontStyle: 'normal',
        fontSize: 18,
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        //text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    },
});