import ProfileButton from './ProfileButton';
import { useState } from 'react';
import { View } from 'react-native';

export default function Tools(Props) {

  // Toggle hot/new page
  const isNew = Props.isNew;
  const toggleIsNew = Props.toggleIsNew;

  // Click button logic
  function clickNewButton() {
    if(!isNew) {
      toggleIsNew();
      UseNewButton();
      console.log("Showing New Confessions");
    }
  }
  function clickHotButton() {
    if(isNew) {
      toggleIsNew();
      UseHotButton();
      console.log("Showing Hot Confessions");
    } 
  }

  return (
    <View style = {styles.tools}>
      <ProfileButton/>
      <View className='toolsCenter'>
        <button class={ isNew ? "NewConfessionsTool NewConfessionsTool-isHotState" : "NewConfessionsTool NewConfessionsTool-isNotHotState"} onClick={clickNewButton}>
          <View class="Text">
            New
          </View>
        </button>
      
        <button class={ isNew ? "HotConfessionsTool HotConfessionsTool-isHotState" : "HotConfessionsTool HotConfessionsTool-isNotHotState"} onClick={clickHotButton}>
          <View class="Text">
            Hot
          </View>
        </button>
      </View>
    </View>
  );
}

// Page state change is triggered
async function UseNewButton() {
  return {text:"Click New"}
}
async function UseHotButton() {
  return {text:"Click Hot"}
}

const styles = StyleSheet.create({
  tools: {
    
  },
});