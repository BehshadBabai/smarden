import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  MinusCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import {
  Card,
  Col,
  Empty,
  Modal,
  Popconfirm,
  Row,
  Space,
  Tag,
  Tooltip,
  Typography,
  notification
} from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { useAppSelector } from '../../Redux/hooks';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import {
  changeBookingReply,
  changeBookingStatus
} from '../../Redux/features/account/account-slice';
import { openNotificationWithIcon } from '../../Utilities/Util';

const DentistCard: React.FC = () => {
  const dispatch = useDispatch();
  const [descModalOpen, setDescModalOpen] = React.useState(false);
  const [replyModalOpen, setReplyModalOpen] = React.useState(false);
  const [confirmReplyLoading, setReplyConfirmLoading] = React.useState(false);
  const [replyText, setReplyText] = React.useState('');

  const account = useAppSelector((state) => state.account);
  const info = useAppSelector((state) => state.dentist.info);

  const bookings = account.bookings.filter((booking) => {
    return booking.dentist.id === info.id;
  });

  const [booking, setBooking] = React.useState(null);
  const operation = booking?.reply ? 'Save' : 'Send';

  const [api, contextHolder] = notification.useNotification();

  return (
    <>
      <Row gutter={[16, 32]}>
        {bookings.length < 1 ? (
          <Col span={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Empty
              description='You have no current bookings, please check back later!'
              style={{ fontSize: '1.3em' }}
              imageStyle={{ height: '200px' }}
            />
          </Col>
        ) : (
          bookings.map((myBooking) => {
            return (
              <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                style={{ display: 'flex', justifyContent: 'center' }}
                key={myBooking.id}
              >
                <Card
                  title={
                    <Row justify={'space-between'}>
                      <Typography.Text>
                        {myBooking.patient.name +
                          ' ' +
                          myBooking.patient.surname}
                      </Typography.Text>
                      <Tag
                        color={
                          myBooking.severity === 'high'
                            ? 'error'
                            : myBooking.severity === 'medium'
                            ? 'warning'
                            : 'processing'
                        }
                      >
                        {myBooking.severity}
                      </Tag>
                    </Row>
                  }
                  style={{ width: 300 }}
                  actions={[
                    <CommentOutlined
                      key='reply'
                      onClick={() => {
                        setBooking(myBooking);
                        setReplyText(myBooking.reply);
                        setReplyModalOpen(true);
                      }}
                    />,
                    <Popconfirm
                      title='Reject Booking'
                      icon={<WarningOutlined />}
                      description='Are you sure you want to reject this booking?'
                      onConfirm={() =>
                        new Promise((resolve) => {
                          setTimeout(() => resolve(null), 3000);
                        }).then(() => {
                          dispatch(
                            changeBookingStatus({
                              id: myBooking.id,
                              data: 'rejected'
                            })
                          );
                        })
                      }
                      okText={'Yes'}
                      cancelText={'No'}
                    >
                      <CloseCircleOutlined key='reject' />
                    </Popconfirm>,
                    <Popconfirm
                      title='Approve Booking'
                      icon={<WarningOutlined />}
                      description='Are you sure you want to approve this booking?'
                      onConfirm={() =>
                        new Promise((resolve) => {
                          setTimeout(() => resolve(null), 3000);
                        }).then(() => {
                          dispatch(
                            changeBookingStatus({
                              id: myBooking.id,
                              data: 'approved'
                            })
                          );
                        })
                      }
                      okText={'Yes'}
                      cancelText={'No'}
                    >
                      <CheckCircleOutlined key={'approve'} />
                    </Popconfirm>
                  ]}
                >
                  <Space
                    direction='vertical'
                    size={'middle'}
                    style={{ width: '100%' }}
                  >
                    <Meta
                      title={
                        <Row
                          justify={'space-between'}
                          style={{ alignItems: 'baseline' }}
                        >
                          <Col>
                            <Typography.Title level={5}>
                              {myBooking.title}
                            </Typography.Title>
                          </Col>
                          <Col
                            style={{
                              display: 'flex',
                              justifyContent: 'flex-end'
                            }}
                          >
                            <Tooltip placement='top' title={myBooking.status}>
                              {myBooking.status === 'approved' ? (
                                <CheckCircleOutlined
                                  style={{ color: 'green' }}
                                />
                              ) : myBooking.status === 'pending' ? (
                                <MinusCircleOutlined
                                  style={{ color: '#faad14' }}
                                />
                              ) : (
                                <CloseCircleOutlined
                                  style={{ color: '#ff4d4f' }}
                                />
                              )}
                            </Tooltip>
                          </Col>
                        </Row>
                      }
                      description={`Booking Date: ${myBooking.time}`}
                    />
                    <Typography.Link
                      onClick={() => {
                        setBooking(myBooking);
                        setDescModalOpen(true);
                      }}
                    >
                      View Booking Description
                    </Typography.Link>
                  </Space>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {/* description modal */}

      {booking && (
        <Modal
          title={booking.title}
          open={descModalOpen}
          onOk={() => {
            setDescModalOpen(false);
          }}
          onCancel={() => {
            setDescModalOpen(false);
          }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>
            {booking.description || 'There Is No Description For This Booking'}
          </p>
        </Modal>
      )}

      {/* Reply Modal */}

      {booking && (
        <>
          {contextHolder}
          <Modal
            title={booking.reply ? 'Edit Your Reply:' : 'Write Your Reply:'}
            open={replyModalOpen}
            onOk={() => {
              setReplyConfirmLoading(true);
              setTimeout(() => {
                setReplyModalOpen(false);
                setReplyConfirmLoading(false);
                dispatch(
                  changeBookingReply({ id: booking.id, data: replyText })
                );
                // show error notification on catch or something
                openNotificationWithIcon(
                  'success',
                  api,
                  operation === 'Save' ? 'saved' : 'sent',
                  'reply'
                );
              }, 2000);
            }}
            onCancel={() => {
              setReplyModalOpen(false);
              setReplyText(booking.reply);
            }}
            okText={operation}
            confirmLoading={confirmReplyLoading}
          >
            <TextArea
              style={{ height: 120 }}
              value={replyText}
              onChange={(e) => {
                setReplyText(e.currentTarget.value);
              }}
            />
          </Modal>
        </>
      )}
    </>
  );
};

export default DentistCard;
