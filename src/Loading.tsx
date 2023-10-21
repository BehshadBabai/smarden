import React from 'react';
import LeftNavigation from './Components/LeftNavigation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider, Layout, Spin } from 'antd';
import Account from './Pages/Account';
import NoPage from './Pages/NoPage';
import useScreenSize from './Hooks/useScreenSize';
import CustomHeader from './Components/CustomHeader';
import Contacts from './Pages/Contacts';
import Booking from './Pages/Booking';
import Feedback from './Pages/Feedback';
import { Constants, LocalStorageKeys, colors } from './Utilities/Constants';
import { themeConstant } from './Utilities/Constants';
import { LoadingOutlined } from '@ant-design/icons';

const { Content } = Layout;

const Loading = () => {
  const screenSize = useScreenSize();
  const [collapsed, setCollapsed] = React.useState(false);

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
            <Spin
              tip='Loading...'
              size='large'
              style={{
                background: colors.bgBlack,
                color: 'white'
              }}
              indicator={<LoadingOutlined />}
            >
              <Content
                style={{
                  margin: '24px 16px',
                  padding: 24,
                  minHeight: 280,
                  background: colors.bgBlack
                }}
              >
                <Routes>
                  <Route path='/' element={<></>} />
                  <Route index element={<></>} />
                  <Route path='dentists' element={<></>} />
                  <Route path='patients' element={<></>} />
                  <Route path='booking' element={<></>} />
                  <Route path='feedback' element={<></>} />
                  <Route path='404' element={<></>} />
                  <Route path='*' element={<></>} />
                </Routes>
              </Content>
            </Spin>
          </Layout>
        </Layout>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default Loading;
