import '../../css/styles.css';

function Header(Props) {
  return (
    <body>
      <div class="LandingPageHeader">
        <span class={ Props.isHot ? "LandingPageHeader-helper LandingPageHeader-NewColor" : "LandingPageHeader-helper LandingPageHeader-HotColor"}></span>
        <div>
          <element class="Text">
            { Props.isHot ? "Recent Confessions" : "Popular Confessions" }
          </element>
          <element class="Text">
            <element class="Subtext">
            { Props.isHot ? "See the latest gossip" : "Upvote the juicy stuff" }
            </element>
          </element>
        </div>
      </div>
    </body>
  );
}

export default Header;