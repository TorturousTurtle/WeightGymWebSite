import Navbar from './Navbar';
import Footer from './Footer';
import AppStoreFooter from './AppStoreFooter';

function Layout(props) {
  return (
    <div>
      <Navbar />
      <main >{props.children}</main>
      <AppStoreFooter />
      <Footer />
    </div>
  );
}

export default Layout;
