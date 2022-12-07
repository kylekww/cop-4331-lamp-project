import '../css/styles.css';
import Tools from './landing_page/Tools';
import Header from './landing_page/Header';
import NewConfessionButton from './landing_page/NewConfessionButton';
import PageTip from './landing_page/PageTip';
import Confession from './landing_page/Confession';
import { useEffect, useState } from 'react';

/* Need to add logo to page */

function LandingPage() {
  const[isNew, setIsNew] = useState(true);
  const toggleIsNew = () => {
    setIsNew(current => !current);
  }

  return (
    <>
      <div class="transitioncolor" data-testid="red" style={{
        opacity: isNew ? '0' : '1',
        background: isNew ? 'transparent' : 'linear-gradient(180deg, rgba(238, 147, 114, 1) 0%, rgba(227, 19, 19, 0.921875) 100%) no-repeat fixed',
        backgroundSize: '100% auto',
        height: "100vh",
        width: "100%",
        margin: 0
      }}> 
      </div>
      <div class="transitioncolor" data-testid="blue" style={{
        opacity: isNew ? '0' : '1',
        background: isNew ? 'linear-gradient(180deg, rgba(238, 147, 114, 1) 0%, rgba(227, 19, 19, 0.921875) 100%) no-repeat fixed' : 'transparent',
        height: "100vh",
        width: "100%"
      }}> 
      </div>
      
      <Tools isNew={isNew} toggleIsNew={toggleIsNew}></Tools>
      <Header isNew={isNew}></Header>
      <PageTip></PageTip>
      <Confession isNew={isNew}></Confession>
      <NewConfessionButton isNew={isNew}></NewConfessionButton>
    </>
  );
}

export default LandingPage;