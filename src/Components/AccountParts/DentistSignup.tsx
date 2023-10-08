import { Button, Card, Col, Row, RowProps, Space, Typography } from 'antd';
import React from 'react';
import { MdBadge, MdPlace, MdLabel, MdEmail } from 'react-icons/md';
import { PiCertificateFill } from 'react-icons/pi';
import { AiFillHome, AiFillPhone } from 'react-icons/ai';
import { FaGlobeAmericas } from 'react-icons/fa';
import useScreenSize from '../../Hooks/useScreenSize';
import { useAppDispatch } from '../../Redux/hooks';
import { toggleHasAccount } from '../../Redux/features/account/account-slice';
const AccountRadio: React.FC = () => {
  const screenSize = useScreenSize();
  const dispatch = useAppDispatch();

  const gridStyleDesktop: React.CSSProperties = {
    width: '25%',
    textAlign: 'center'
  };
  const gridStyleMobile: React.CSSProperties = {
    width: '50%',
    textAlign: 'center'
  };
  const cardRowProps: RowProps = {
    justify: 'center',
    align: 'middle',
    gutter: 10,
    style: {
      height: '100%'
    }
  };
  return (
    <Row justify={'center'} gutter={[0, 40]}>
      <Col style={{ width: '95%' }}>
        <Space direction='vertical' size={'large'}>
          <Typography.Paragraph
            style={{ fontSize: '1.2em', lineHeight: '2em' }}
          >
            Want to join SMARDEN as a dentist? We're exicted to have you on
            board! We are commited to make the registration process as smooth
            and easy as possible. All Dentist Applications are sent directly to
            BMNS's CEO, Mohammad. To register, Please send the following
            information to{' '}
            <a href='mailto: mbabai110@yahoo.com'>mbabai110@yahoo.com</a> with
            the email title of "SMARDEN Dentist Registration":
          </Typography.Paragraph>
          <Card title='Information to Include' style={{ textAlign: 'center' }}>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              {' '}
              <Row {...cardRowProps}>
                <MdBadge size={25} />
                <Col>Full Name</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row justify={'center'} align={'middle'} gutter={10}>
                <PiCertificateFill size={25} />
                <Col>Certificate</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row {...cardRowProps}>
                <AiFillHome size={23} />
                <Col>Address</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row {...cardRowProps}>
                <FaGlobeAmericas size={23} />
                <Col>Country</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row {...cardRowProps}>
                <MdPlace size={27} />
                <Col>Province/State</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row {...cardRowProps}>
                <MdLabel size={30} />
                <Col>Postal Code</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row {...cardRowProps}>
                <AiFillPhone size={25} />
                <Col>Phone Number</Col>
              </Row>
            </Card.Grid>
            <Card.Grid
              style={
                screenSize.width < 800 ? gridStyleMobile : gridStyleDesktop
              }
            >
              <Row {...cardRowProps}>
                <MdEmail size={25} />
                <Col>Business Email</Col>
              </Row>
            </Card.Grid>
          </Card>
        </Space>
      </Col>
      <Col>
        <Typography.Text>Already have an account?</Typography.Text>
        <Button
          type='link'
          className='login-form-button'
          style={{ fontWeight: 'bold' }}
          onClick={() => {
            dispatch(toggleHasAccount());
          }}
        >
          Login
        </Button>
      </Col>
    </Row>
  );
};

export default AccountRadio;
