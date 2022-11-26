import '../../css/styles.css';

function Header(Props) {
  return (
    
      <div class="LandingPageHeader">
        <span class={ Props.isNew ? "LandingPageHeader-helper LandingPageHeader-NewColor" : "LandingPageHeader-helper LandingPageHeader-HotColor"}></span>
        <div>
          <element class="Text">
            { Props.isNew ? "Recent Confessions" : "Popular Confessions" }
          </element>
          <element class="Text">
            <element class="Subtext">
            { Props.isNew ? "See the latest gossip" : "Upvote the juicy stuff" }
            </element>
          </element>
        </div>
      </div>
        
  );
}

export default Header;