import '../../css/LandingPage.css';
import MenuIcon from '@mui/icons-material/Menu';

/* Needs to be added:
    - Prevention of pressing "New" when on New page
    - Prevention of pressing "Hot" when on Hot page
    - Menu from the settings page
    - "Knight" mode
    - Redirect for edit profile
    - If we're doing something with karma... not sure if we're actually doing that or not
*/

function Tools() {
  return (
    <div class="Tools">
      <div>
        <button class="SettingsTool" onClick={clickOptionsButton}>
            <MenuIcon sx={{ color: "#BABABA", "&:hover":{ color: "#80C7EF"}, fontSize: "5vmin"}}></MenuIcon>
        </button>
      </div>
      <div>
        <button class="NewConfessionsTool" onClick={clickNewButton}>
          <div class="Text">
            New
          </div>
        </button>
      </div>
      <div>
        <button class="HotConfessionsTool" onClick={clickHotButton}>
          <div class="Text">
            Hot
          </div>
        </button>
      </div>
    </div>
  );
}

async function clickOptionsButton() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"Click Options"}
}

async function clickNewButton() {
  const response = await fetch('url', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return {text:"Click New"}
}

async function clickHotButton() {
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