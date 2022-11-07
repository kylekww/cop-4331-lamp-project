import '../css/LandingPage.css';
import Tools from './landing_page/Tools';
import Header from './landing_page/Header';
import NewConfessionButton from './landing_page/NewConfessionButton';
import PageTip from './landing_page/PageTip';
import Confession from './landing_page/Confession';

/* Need to add logo to page */

function LandingPage() {
  return (
    <html>
    <Tools></Tools>
    <Header></Header>
    <PageTip></PageTip>
    <Confession></Confession>
    <NewConfessionButton></NewConfessionButton>
    </html>
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

/* This is for testing

async function login(username, password) {
  const response = await fetch('https://hushucf.herokuapp.com/api/v1/auth/login', {
    mode: 'no-cors',
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "username": username,
      "password": password
  })
  });
  return response.json();
}

*/

export default LandingPage;