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
  Tour,
  TourProps,
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
import { LocalStorageKeys } from '../../Utilities/Constants';

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

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(null);
  const [tourOpen, setTourOpen] = React.useState(false);

  React.useEffect(() => {
    if (bookings?.length > 0 && localStorage) {
      const shown = JSON.parse(
        localStorage.getItem(LocalStorageKeys.tours.patient)
      )?.shown;
      if (!shown) {
        // do something
        localStorage.setItem(
          LocalStorageKeys.tours.patient,
          JSON.stringify({ shown: true })
        );
        setTourOpen(true);
      }
    }
  }, [bookings]);

  const tourSteps: TourProps['steps'] = [
    {
      title: 'Your Booking',
      description: 'Your bookings will appear in card formats.',
      target: () => ref1.current!
    },
    {
      title: 'Write/Edit Reply',
      description:
        'Write or edit a reply to send to your patient for this booking.',
      target: () => ref2.current!
    },
    {
      title: 'Reject Booking',
      description: 'Reject the proposed booking by your patient.',
      target: () => ref3.current!
    },
    {
      title: 'Approve Booking',
      description: 'Approve the proposed booking by your patient.',
      target: () => ref4.current!
    },
    {
      title: 'Booking Status',
      description:
        'View the status of your booking. You can change this with the approve/reject buttons',
      target: () => ref5.current!
    }
  ];

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
          bookings.map((myBooking, index) => {
            return (
              <Col
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                xl={{ span: 8 }}
                style={{ display: 'flex', justifyContent: 'center' }}
                key={myBooking.id}
              >
                <Card
                  className='customCard'
                  ref={index === 0 ? ref1 : null}
                  headStyle={{ borderBottom: '2px solid lightgray' }}
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
                    <Tooltip placement='bottom' title='Write/Edit Reply'>
                      <CommentOutlined
                        ref={index === 0 ? ref2 : null}
                        key='reply'
                        onClick={() => {
                          setBooking(myBooking);
                          setReplyText(myBooking.reply);
                          setReplyModalOpen(true);
                        }}
                      />
                    </Tooltip>,
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
                      <Tooltip placement='bottom' title='Reject Booking'>
                        <CloseCircleOutlined
                          key='reject'
                          ref={index === 0 ? ref3 : null}
                        />
                      </Tooltip>
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
                      <Tooltip placement='bottom' title='Approve Booking'>
                        <CheckCircleOutlined
                          key={'approve'}
                          ref={index === 0 ? ref4 : null}
                        />
                      </Tooltip>
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
                                  ref={index === 0 ? ref5 : null}
                                />
                              ) : myBooking.status === 'pending' ? (
                                <MinusCircleOutlined
                                  style={{ color: '#faad14' }}
                                  ref={index === 0 ? ref5 : null}
                                />
                              ) : (
                                <CloseCircleOutlined
                                  style={{ color: '#ff4d4f' }}
                                  ref={index === 0 ? ref5 : null}
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
      {/* Tour */}
      <Tour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        steps={tourSteps}
        indicatorsRender={(current, total) => (
          <span>
            {current + 1} / {total}
          </span>
        )}
      />
    </>
  );
};

export default DentistCard;
