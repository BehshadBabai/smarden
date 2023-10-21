import { Button, Col, List, Row, Space, Typography } from 'antd';
import React from 'react';
import { CiLocationOn } from 'react-icons/ci';
import { FaRegAddressCard } from 'react-icons/fa';
import { GrCertificate } from 'react-icons/gr';
import { IoHomeOutline } from 'react-icons/io5';
import { BsGlobe, BsPhone, BsSignpost } from 'react-icons/bs';
import { GoMail } from 'react-icons/go';
import { useAppDispatch } from '../../Redux/hooks';
import { toggleHasAccount } from '../../Redux/features/account/account-slice';
const DentistSignup: React.FC = () => {
  const dispatch = useAppDispatch();
  return (
    <Row justify={'center'} gutter={[0, 40]}>
      <Col style={{ width: '95%' }}>
        <Space direction='vertical' size={'large'}>
          <Typography.Paragraph
            style={{ fontSize: '1.1em', lineHeight: '2em' }}
          >
            Want to join SMARDEN as a dentist? We're exicted to have you on
            board! We are commited to make the registration process as smooth
            and easy as possible. All Dentist Applications are sent directly to
            BMNS's CEO, Mohammad. To register, Please send the following
            information to{' '}
            <a href='mailto: mbabai110@yahoo.com'>mbabai110@yahoo.com</a> with
            the email title of "SMARDEN Dentist Registration":
          </Typography.Paragraph>
          <List
            bordered
            header={'Requested Information'}
            pagination={false}
            dataSource={[
              {
                title: 'Full Name',
                description: 'Your full legal name as desplayed on your ID',
                icon: <FaRegAddressCard size={45} />
              },
              {
                title: 'Certificate',
                description:
                  'Your certificate of dentistry in the country of your residence',
                icon: <GrCertificate size={45} />
              },
              {
                title: 'Address',
                description:
                  'Your address where you provide services to patients',
                icon: <IoHomeOutline size={45} />
              },
              {
                title: 'Country',
                description:
                  'Your country where you provide services to patients',
                icon: <BsGlobe size={45} />
              },
              {
                title: 'Province/State',
                description:
                  'Your province/state where you provide services to patients',
                icon: <CiLocationOn size={45} />
              },
              {
                title: 'Postal/Zip Code',
                description:
                  'Your postal/zip code where you provide services to patients',
                icon: <BsSignpost size={45} />
              },
              {
                title: 'Postal/Zip Code',
                description:
                  'Your phone number for signing up with SMARDEN (not shared with patients)',
                icon: <BsPhone size={45} />
              },
              {
                title: 'Business Email',
                description:
                  'Your email for signing up with SMARDEN (not shared with patients)',
                icon: <GoMail size={45} />
              }
            ]}
            renderItem={(item, _index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={item.icon}
                  title={item.title}
                  description={item.description}
                />
              </List.Item>
            )}
          />
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

export default DentistSignup;
