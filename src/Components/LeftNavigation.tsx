import React from 'react';
import { Avatar, Layout, Menu } from 'antd';
import {
  CalendarOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { changeRoute } from '../Redux/features/app/app-slice';
import { getInitials } from '../Utilities/Util';

type LeftNavProps = { collapsed: boolean; hidden: boolean };

const { Sider } = Layout;

const LeftNavigation: React.FC<LeftNavProps> = ({ collapsed, hidden }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const route = useAppSelector((state) => state.app.route);
  const account = useAppSelector((state) => state.account);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      hidden={hidden}
      width={210}
      collapsedWidth={100}
    >
      <div className='demo-logo-vertical' />
      <div
        style={{
          height: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Avatar shape='circle' size={53} style={{ background: 'gray' }}>
          {account.loggedIn
            ? getInitials(account?.info?.name, account?.info?.surname)
            : 'Login'}
        </Avatar>
      </div>
      <Menu
        theme='dark'
        mode='inline'
        onClick={(info) => {
          const route = info.key;
          if (route !== 'about') {
            dispatch(changeRoute(route));
            navigate(route);
          } else {
            window.open('https://bmnsgroup.com/', '_blank');
          }
        }}
        hidden={hidden}
        selectedKeys={[route]}
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
            key: account.type === 'dentist' ? 'patients' : 'dentists',
            icon: <TeamOutlined />,
            label: account.type === 'dentist' ? 'Patients' : 'Dentists',
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
    </Sider>
  );
};

export default LeftNavigation;
