import React from 'react';
import {
  CalendarOutlined,
  MedicineBoxOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Drawer, MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../Hooks/useScreenSize';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { changeRoute } from '../Redux/features/app/app-slice';
import { Constants } from '../Utilities/Constants';

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const route = useAppSelector((state) => state.app.route);

  const screenSize = useScreenSize();

  const type = useAppSelector((state) => state.account.type);
  const loggedIn = useAppSelector((state) => state.account.loggedIn);
  const [open, setOpen] = React.useState(false);

  const onClick: MenuProps['onClick'] = (e) => {
    const route = e.key;
    if (route !== 'about') {
      setOpen(false);
      navigate(route);
      dispatch(changeRoute(route));
    } else {
      window.open('https://bmnsgroup.com/', '_blank');
    }
  };

  return (
    <div
      style={{ display: screenSize.width < Constants.breakpoint ? '' : 'none' }}
    >
      <Button
        type='primary'
        onClick={() => {
          setOpen(true);
        }}
      >
        <MenuOutlined />
      </Button>
      <Drawer
        placement='left'
        onClose={() => {
          setOpen(false);
        }}
        style={{ background: '#001529' }}
        open={open}
        headerStyle={{ borderColor: 'white' }}
      >
        <Menu
          onClick={onClick}
          style={{ width: '100%' }}
          selectedKeys={[route]}
          mode='inline'
          theme='dark'
          items={[
            {
              key: 'dashboard',
              label: 'Dashboard',
              type: 'group'
            },
            {
              key: '/',
              icon: <UserOutlined />,
              label: 'Account'
            },
            {
              key: type === 'dentist' ? 'patients' : 'dentists',
              icon: <TeamOutlined />,
              label: type === 'dentist' ? 'Patients' : 'Dentists',
              disabled: !loggedIn
            },
            {
              key: 'booking',
              icon: <CalendarOutlined />,
              label: 'Booking',
              disabled: !loggedIn
            },
            { type: 'divider', style: { background: 'white' } },
            {
              key: 'bmns',
              label: 'BMNS',
              type: 'group'
            },
            {
              key: 'feedback',
              label: 'Feedback',
              icon: <SolutionOutlined />
            },
            {
              key: 'about',
              icon: <QuestionCircleOutlined />,
              label: 'About BMNS'
            }
          ]}
        />
      </Drawer>
    </div>
  );
};

export default MobileNav;
