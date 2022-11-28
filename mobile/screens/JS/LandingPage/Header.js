import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function Header(Props) {
  return (
    
      <View style ={styles.LandingPageHeader}>
        <View styles = { [styles.helper, (Props.isNew ? styles.NewColor : styles.HotColor)]}>
          <Text style = {styles.text}>
            { Props.isNew ? "Recent Confessions" : "Popular Confessions" }
          </Text>
          <Text>
            <Text style = {[styles.text,styles.subtext]}>
            { Props.isNew ? "See the latest gossip" : "Upvote the juicy stuff" }
            </Text>
          </Text>
        </View>
      </View>
        
  );
}

const styles = StyleSheet.create({
    LandingPageHeader: {
        position: 'relative',
        width: '90%',
        height: '10%',
        left: '5%',
        top: '10%',
        borderRadius: 15,
        flex: 1,
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
        fontSize: 36,
        lineHeight: '150%',
        display: 'flex',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFFFFF',
        //text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    },
    subtext: {
        position: 'flex',
        fontSize: 24,
        lineHeight: '100%',
    },
});