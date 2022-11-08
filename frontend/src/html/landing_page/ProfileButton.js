import '../../css/LandingPage.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { border } from '@mui/system';

function ProfileButton() {



  return (
    <AccountCircleIcon class="ProfileTool" onClick={clickProfileButton} style={{fill: 'white'}} sx={{
        "&:hover": {
          stroke: "black",
          strokeWidth: 1,
          }
      }}
      />
  );
}

async function clickProfileButton() {
    window.location.href = '/profile';
}

export default ProfileButton;