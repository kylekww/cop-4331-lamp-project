import '../../css/styles.css';
import ProfileButton from './ProfileButton';
import { useState } from 'react';

function Tools(Props) {

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
    <div class="Tools">
      <ProfileButton/>
      <div className='toolsCenter'>
        <button class={ isNew ? "NewConfessionsTool NewConfessionsTool-isHotState" : "NewConfessionsTool NewConfessionsTool-isNotHotState"} onClick={clickNewButton}>
          <div class="Text">
            New
          </div>
        </button>
      
        <button class={ isNew ? "HotConfessionsTool HotConfessionsTool-isHotState" : "HotConfessionsTool HotConfessionsTool-isNotHotState"} onClick={clickHotButton}>
          <div class="Text">
            Hot
          </div>
        </button>
      </div>
      <img src={require('../../images/NewIcon.jpg')} class="HushIconLanding" style={{
        opacity: isNew ? "1" : "0"
      }}/>
      <img src={require('../../images/HotIcon.jpg')} class="HushIconLanding" style={{
        opacity: isNew ? "0" : "1"
      }}/>
    </div>
  );
}

// Page state change is triggered
async function UseNewButton() {
  return {text:"Click New"}
}
async function UseHotButton() {
  return {text:"Click Hot"}
}

export default Tools;