import logoPath from '../assets/ssp-logo.png';

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="#hero">
        <img src={logoPath} alt="SSP" className="nav-logo" />
      </a>
      <div className="nav-links">
        <a href="#philosophy" className="nav-link">哲学</a>
        <a href="#service" className="nav-link">服务</a>
        <a href="#platform" className="nav-link">平台</a>
        <a href="#contact" className="nav-link">联系</a>
      </div>
    </nav>
  );
}
