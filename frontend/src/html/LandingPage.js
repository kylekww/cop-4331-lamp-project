import '../css/styles.css';
import Tools from './landing_page/Tools';
import Header from './landing_page/Header';
import NewConfessionButton from './landing_page/NewConfessionButton';
import PageTip from './landing_page/PageTip';
import Confession from './landing_page/Confession';
import { useState } from 'react';

/* Need to add logo to page */

function LandingPage() {
  const[isHot, setIsHot] = useState([false]);
  const toggleIsHot = () => {
    setIsHot(current => !current);
  }

  return (
    <>
      <div class="transitioncolor" style={{
        opacity: isHot ? '0' : '1',
        background: isHot ? 'transparent' : 'linear-gradient(180deg, rgba(238, 147, 114, 1) 0%, rgba(227, 19, 19, 0.921875) 100%) no-repeat fixed',
        backgroundSize: '100% auto',
        height: "100vh",
        width: "100%",
        margin: 0
      }}> 
      </div>
      <div class="transitioncolor" style={{
        opacity: isHot ? '0' : '1',
        background: isHot ? 'linear-gradient(180deg, rgba(238, 147, 114, 1) 0%, rgba(227, 19, 19, 0.921875) 100%) no-repeat fixed' : 'transparent',
        height: "100vh",
        width: "100%"
      }}> 
      </div>
      
      <Tools isHot={isHot} toggleIsHot={toggleIsHot}></Tools>
      <Header isHot={isHot}></Header>
      <PageTip></PageTip>
      <Confession isHot={isHot}></Confession>
      <NewConfessionButton isHot={isHot}></NewConfessionButton>
    </>
  );
}

async function logout() {
  const response = await fetch('https://hushucf.herokuapp.com/api/v1/auth/logout', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  return response.json();
}

export default LandingPage;