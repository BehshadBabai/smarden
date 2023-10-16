import React from 'react';
import { Button, Col, Layout, Row, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useScreenSize from '../Hooks/useScreenSize';
import MobileNav from './MobileNav';
import { Constants, colors } from '../Utilities/Constants';

const { Header } = Layout;
type CustomHeaderProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomHeader: React.FC<CustomHeaderProps> = ({
  collapsed,
  setCollapsed
}) => {
  const screenSize = useScreenSize();
  return (
    <Header
      style={{
        padding: 0,
        background: colors.bgBlack,
        borderBottom: '1.5px solid white'
      }}
    >
      <Row
        gutter={screenSize.width < Constants.breakpoint ? 10 : 0}
        align={'middle'}
      >
        <Col>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='iCollapseButton'
            style={{
              display: screenSize.width < Constants.breakpoint ? 'none' : '',
              width: 64,
              height: 64
            }}
          />
        </Col>
        <Col>
          <MobileNav />
        </Col>
        <Col flex={'auto'}>
          <Row justify={'center'} align={'middle'}>
            <Typography.Title
              level={screenSize.width < Constants.breakpoint ? 3 : 2}
              style={{
                margin: 0
              }}
            >
              SMARDEN
            </Typography.Title>
            <Typography.Text
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                paddingTop: '20px',
                paddingLeft: '10px'
              }}
            >
              by BMNS
            </Typography.Text>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

export default CustomHeader;
