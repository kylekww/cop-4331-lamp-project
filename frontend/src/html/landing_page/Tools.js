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
    </div>
  );
}

// Page state change is triggered
async function UseNewButton() {
  const searchVal = 1;
  const oid = "";
  const data = await fetch("/api/v1/confessions/searchConfession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      searchVal,
      oid,
            }),
        })
        .then(res => {
          res.json().then((data) => {
            console.log(data);
          }) 
        })
        .catch(err => {
          console.log(err);
        });
        //console.log("yeaa");
}
async function UseHotButton() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"Click Hot"}
}

export default Tools;