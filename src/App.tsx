import React from 'react';
import LeftNavigation from './Components/LeftNavigation';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout, theme } from 'antd';
import Account from './Pages/Account';
import NoPage from './Pages/NoPage';
import useScreenSize from './Hooks/useScreenSize';
import CustomHeader from './Components/CustomHeader';
import Contacts from './Pages/Contacts';
import Booking from './Pages/Booking';
import Feedback from './Pages/Feedback';
import { Constants } from './Utilities/Constants';

const { Content } = Layout;

const App = () => {
  const screenSize = useScreenSize();
  const [collapsed, setCollapsed] = React.useState(false);
  const {
    token: { colorBgContainer }
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <LeftNavigation
          collapsed={collapsed}
          hidden={screenSize.width < Constants.breakpoint}
        />
        <Layout>
          <CustomHeader collapsed={collapsed} setCollapsed={setCollapsed} />
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              background: colorBgContainer
            }}
          >
            <Routes>
              <Route path='/' element={<Account />} />
              <Route index element={<Account />} />
              <Route path='dentists' element={<Contacts />} />
              <Route path='patients' element={<Contacts />} />
              <Route path='booking' element={<Booking />} />
              <Route path='feedback' element={<Feedback />} />
              <Route path='404' element={<NoPage />} />
              <Route path='*' element={<Navigate to='/404' replace />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
