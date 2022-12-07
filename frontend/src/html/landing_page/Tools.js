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
    <div className="Tools">
      <ProfileButton/>
      <div className='toolsCenter'>
        <button data-testid="new-button" className={ isNew ? "NewConfessionsTool NewConfessionsTool-isHotState" : "NewConfessionsTool NewConfessionsTool-isNotHotState"} onClick={clickNewButton}>
          <div className="Text">
            New
          </div>
        </button>
      
        <button data-testid="hot-button" className={ isNew ? "HotConfessionsTool HotConfessionsTool-isHotState" : "HotConfessionsTool HotConfessionsTool-isNotHotState"} onClick={clickHotButton}>
          <div className="Text">
            Hot
          </div>
        </button>
      </div>
      <img data-testid="new-icon" src={require('../../images/NewIcon.jpg')} className="HushIconLanding" style={{
        opacity: isNew ? "1" : "0"
      }}/>
      <img data-testid="hot-icon" src={require('../../images/HotIcon.jpg')} className="HushIconLanding" style={{
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