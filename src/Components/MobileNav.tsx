import React from 'react';
import {
  CalendarOutlined,
  LockOutlined,
  MenuOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Drawer, MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import useScreenSize from '../Hooks/useScreenSize';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { changeRoute } from '../Redux/features/app/app-slice';
import { Constants, colors } from '../Utilities/Constants';
import { capitalizeFirstLetter, getInitials } from '../Utilities/Util';

const MobileNav: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const route = useAppSelector((state) => state.app.route);
  const account = useAppSelector((state) => state.account);
  const patientInfo = useAppSelector((state) => state.patient.info);
  const dentistInfo = useAppSelector((state) => state.dentist.info);

  const info = account.type === 'dentist' ? dentistInfo : patientInfo;

  const screenSize = useScreenSize();
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
        style={{ background: colors.bgBlack }}
        open={open}
        headerStyle={{ borderColor: 'white' }}
      >
        <div
          style={{
            height: '64px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Avatar
            shape='circle'
            size={64}
            style={{ background: colors.iOrange }}
          >
            {account.loggedIn ? getInitials(info.name, info.surname) : 'Login'}
          </Avatar>
        </div>
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
              key: account.loggedIn
                ? account.type === 'patient'
                  ? 'dentists'
                  : 'patients'
                : 'dentists/patients',
              icon: <TeamOutlined />,
              label: account.loggedIn
                ? capitalizeFirstLetter(
                    account.type === 'patient' ? 'dentists' : 'patients'
                  )
                : 'Dentists/Patients',
              disabled: !account.loggedIn
            },
            {
              key: 'booking',
              icon: <CalendarOutlined />,
              label: 'Booking',
              disabled: !account.loggedIn
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
