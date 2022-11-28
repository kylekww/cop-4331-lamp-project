import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Header(Props) {
  return (
    
    //<View styles = { [styles.helper, (Props.isNew ? styles.NewColor : styles.HotColor)]}>
      <View style ={styles.LandingPageHeader}>
        <LinearGradient
            // Background Linear Gradient
            colors={Props.isNew?['rgba(128,199,239,1)', 'rgba(89,35,206,1)']:['#DE621C', 'rgba(227, 19, 19, 0.921875)']}
            style={styles.helper}
        />
        <Text style = {styles.text}>{ Props.isNew ? "Recent Confessions" : "Popular Confessions" }</Text>
        <Text><Text style = {[styles.text,styles.subtext]}>
        { Props.isNew ? "See the latest gossip" : "Upvote the juicy stuff" }
        </Text></Text>
      </View>
        
  );
}

const styles = StyleSheet.create({
    LandingPageHeader: {
        position: 'relative',
        width: '90%',
        height: '8%',
        left: '5%',
        top: '2%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    helper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0%',
        top: '0%',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center',
        zIndex: -1,
    },
    NewColor: {
        opacity: 0,
    },
    HotColor: {
        opacity: 1,
    },
    text: {
        fontStyle: 'normal',
        fontSize: 24,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
        //text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    },
    subtext: {
        position: 'flex',
        fontSize: 16,
    },
});