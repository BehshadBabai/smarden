import React from 'react';
import { Layout, Menu } from 'antd';
import {
  CalendarOutlined,
  MedicineBoxOutlined,
  QuestionCircleOutlined,
  SolutionOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { changeRoute } from '../Redux/features/app/app-slice';

type LeftNavProps = { collapsed: boolean; hidden: boolean };

const { Sider } = Layout;

const LeftNavigation: React.FC<LeftNavProps> = ({ collapsed, hidden }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const route = useAppSelector((state) => state.app.route);
  const type = useAppSelector((state) => state.account.type);
  const loggedIn = useAppSelector((state) => state.account.loggedIn);

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
            key: 'dentistreg',
            label: 'Register as a Dentist',
            icon: <MedicineBoxOutlined />
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
