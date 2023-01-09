import './header.scss';
import Logo from '../../assets/images/logo.svg'
import University from '../../assets/images/header-desktop-img.svg'
import UniversityMobile from '../../assets/images/header-mobile-img.svg'
import Hat from '../../assets/images/header-hat.svg'

const Header = () => { 
return(
<div className="header-wrapper">
<div className="content-holder"> 
<div id='logo-container'>
<img id='logo' src={Logo} alt='logo'></img>
</div>
<div id='nav-container'>

</div>
</div>

<div className="content-holder">
<div id='university-image-holder'>
<img id='uni-img' src={University} alt='university image'></img>
<img id='uni-img-mobile' src={UniversityMobile} alt='university image'></img>
</div>
<div id='hat-holder'>
<img id='hat-img' src={Hat} alt='hat image'></img>
</div>

</div>

</div>
)
}

export default Header;
