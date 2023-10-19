import Navbar from './Navbar';
import Footer from './Footer';
import AppStoreFooter from './AppStoreFooter';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <div>
      <Navbar />
      <main>{props.children}</main>
      <AppStoreFooter />
      <Footer />
    </div>
  );
}

export default Layout;
