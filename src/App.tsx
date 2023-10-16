import React from 'react';
import LeftNavigation from './Components/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout } from 'antd';
import Account from './Pages/Account';
import NoPage from './Pages/NoPage';
import useScreenSize from './Hooks/useScreenSize';
import CustomHeader from './Components/CustomHeader';
import Contacts from './Pages/Contacts';
import Booking from './Pages/Booking';
import Feedback from './Pages/Feedback';
import { Constants, LocalStorageKeys, colors } from './Utilities/Constants';
import { themeConstant } from './Utilities/Constants';

const { Content } = Layout;

const App = () => {
  const screenSize = useScreenSize();
  const [collapsed, setCollapsed] = React.useState(false);

  const bookingTourDentist = {
    shown: false
  };
  const bookingTourPatient = {
    shown: false
  };
  if (localStorage) {
    const dentistObj = JSON.parse(
      localStorage.getItem(LocalStorageKeys.tours.dentist)
    );
    if (!dentistObj) {
      localStorage.setItem(
        LocalStorageKeys.tours.dentist,
        JSON.stringify(bookingTourDentist)
      );
    }
    const patientObj = JSON.parse(
      localStorage.getItem(LocalStorageKeys.tours.dentist)
    );
    if (!patientObj) {
      localStorage.setItem(
        LocalStorageKeys.tours.patient,
        JSON.stringify(bookingTourPatient)
      );
    }
  }

  return (
    <BrowserRouter>
      <ConfigProvider theme={themeConstant}>
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
                background: colors.bgBlack
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
                <Route path='*' element={<NoPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
