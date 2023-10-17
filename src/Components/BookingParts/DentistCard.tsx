import {
  CalendarFilled,
  CheckCircleOutlined,
  CloseCircleOutlined,
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  WarningOutlined
} from '@ant-design/icons';
import {
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Tour,
  TourProps,
  Typography,
  notification
} from 'antd';
import React from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { useDispatch } from 'react-redux';
import {
  Booking,
  addBooking,
  chnageBookingDescription,
  deleteBooking
} from '../../Redux/features/account/account-slice';
import TextArea from 'antd/es/input/TextArea';
import Meta from 'antd/es/card/Meta';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';
import { openNotificationWithIcon } from '../../Utilities/Util';
import { LocalStorageKeys } from '../../Utilities/Constants';
import { FcCalendar } from 'react-icons/fc';
import useScreenSize from '../../Hooks/useScreenSize';

const DentistCard: React.FC = () => {
  const { Option } = Select;

  const ref1 = React.useRef(null);
  const ref2 = React.useRef(null);
  const ref3 = React.useRef(null);
  const ref4 = React.useRef(null);
  const ref5 = React.useRef(null);

  const [tourOpen, setTourOpen] = React.useState(false);
  const screenSize = useScreenSize();
  const [descModalOpen, setDescModalOpen] = React.useState(false);
  const [replyModalOpen, setReplyModalOpen] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [confirmEditLoading, setEditConfirmLoading] = React.useState(false);
  const [newModalOpen, setNewModalOpen] = React.useState(false);
  const [confirmNewLoading, setNewConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();
  const account = useAppSelector((state) => state.account);
  const patient = useAppSelector((state) => state.patient);
  const bookings = account.bookings.filter(
    (booking) => booking.patient.id === patient.info.id
  );
  const dentists = patient.dentists;
  const [booking, setBooking] = React.useState<Booking>(null);

  const [descText, setDescText] = React.useState('');
  const dispatch = useDispatch();

  const [api, contextHolder] = notification.useNotification();

  React.useEffect(() => {
    if (bookings?.length > 0 && localStorage) {
      const shown = JSON.parse(
        localStorage.getItem(LocalStorageKeys.tours.dentist)
      )?.shown;
      if (!shown && screenSize.width >= 550) {
        // do something
        localStorage.setItem(
          LocalStorageKeys.tours.dentist,
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
      title: 'View Reply',
      description: 'View the reply from your dentist for this booking.',
      target: () => ref2.current!
    },
    {
      title: 'Edit Description',
      description: 'Edit the description of your booking.',
      target: () => ref3.current!
    },
    {
      title: 'Delete Booking',
      description: 'Delete your booking.',
      target: () => ref4.current!
    },
    {
      title: 'Booking Status',
      description:
        'View the status of your booking. This will be chnaged by your dentist.',
      target: () => ref5.current!
    }
  ];

  return (
    <>
      <Row gutter={[16, 32]}>
        {/* Add new booking card */}
        <Col
          xs={{ span: 24 }}
          lg={{ span: 12 }}
          xl={{ span: 8 }}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card
            title={
              <Row justify={'center'} align={'middle'} gutter={10}>
                <Col>
                  <Typography.Text className='darkText'>
                    Add a Booking
                  </Typography.Text>
                </Col>
                <Col>
                  <PlusCircleOutlined />
                </Col>
              </Row>
            }
            headStyle={{ borderBottom: '2px solid lightgray' }}
            style={{ width: 300, textAlign: 'center', cursor: 'pointer' }}
            className='customCard'
            onClick={() => {
              if (dentists.length > 0) {
                setNewModalOpen(true);
              } else {
                Modal.error({
                  title: 'Unable to add a new booking',
                  content:
                    'Please add a dentist to your account first via the dentists page!'
                });
              }
            }}
          >
            <FcCalendar size={120} />
          </Card>
        </Col>
        {bookings.map((myBooking, index) => {
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
                    <Typography.Text className='darkText'>
                      {'Dr. ' +
                        myBooking.dentist.name +
                        ' ' +
                        myBooking.dentist.surname}
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
                  <Tooltip
                    placement='bottom'
                    title={screenSize.width >= 750 ? 'View Dentist Reply' : ''}
                  >
                    <CommentOutlined
                      ref={index === 0 ? ref2 : null}
                      key='reply'
                      onClick={() => {
                        if (myBooking.reply) {
                          setBooking(myBooking);
                          setReplyModalOpen(true);
                        } else {
                          Modal.info({
                            title: 'No Reply Yet!',
                            content: `There is no text reply from Dr. ${myBooking.dentist.name} ${myBooking.dentist.surname} for this booking right now, check back later to see their reply.`
                          });
                        }
                      }}
                    />
                  </Tooltip>,
                  <Tooltip
                    placement='bottom'
                    title={screenSize.width >= 750 ? 'Edit Description' : ''}
                  >
                    <EditOutlined
                      ref={index === 0 ? ref3 : null}
                      key='edit'
                      onClick={() => {
                        setBooking(myBooking);
                        setDescText(myBooking.description);
                        setEditModalOpen(true);
                      }}
                    />
                  </Tooltip>,
                  <Popconfirm
                    title='Delete Booking'
                    icon={<WarningOutlined />}
                    description='Are you sure you want to delete this booking?'
                    onConfirm={() =>
                      new Promise((resolve) => {
                        setTimeout(() => resolve(null), 3000);
                      }).then(() => {
                        dispatch(deleteBooking(myBooking.id));
                      })
                    }
                    okText={'Yes'}
                    cancelText={'No'}
                    cancelButtonProps={{ className: 'defaultButton' }}
                  >
                    <Tooltip
                      placement='bottom'
                      title={screenSize.width >= 750 ? 'Remove Booking' : ''}
                    >
                      <DeleteOutlined
                        key={'delete'}
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
                          <Typography.Title className='darkText' level={5}>
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
        })}
      </Row>

      {/* reply modal */}
      {booking && (
        <Modal
          title={`Dr. ${booking.dentist.name} ${booking.dentist.surname} Replied: `}
          open={replyModalOpen}
          onOk={() => {
            setReplyModalOpen(false);
          }}
          onCancel={() => {
            setReplyModalOpen(false);
          }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <p>{booking.reply}</p>
        </Modal>
      )}
      {contextHolder}
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

      {/* edit modal */}
      {booking && (
        <Modal
          title={'Edit Your Booking Description'}
          open={editModalOpen}
          confirmLoading={confirmEditLoading}
          okText='Edit'
          cancelButtonProps={{ className: 'defaultButton' }}
          onOk={() => {
            setEditConfirmLoading(true);
            setTimeout(() => {
              setEditConfirmLoading(false);
              setEditModalOpen(false);
              dispatch(
                chnageBookingDescription({
                  data: descText,
                  id: booking.id
                })
              );
              // show error notification on catch or something
              openNotificationWithIcon('success', api, 'edited', 'description');
            }, 2000);
          }}
          onCancel={() => {
            setEditModalOpen(false);
            setDescText(booking.description);
          }}
        >
          <TextArea
            style={{ height: 120 }}
            value={descText}
            onChange={(e) => {
              setDescText(e.currentTarget.value);
            }}
          />
        </Modal>
      )}

      {/* new booking modal */}
      <Modal
        title={'Add a New Booking'}
        open={newModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              setNewConfirmLoading(true);
              setTimeout(() => {
                form.resetFields();
                setNewModalOpen(false);
                setNewConfirmLoading(false);
                const newId = uuidv4();
                const result: Booking = {
                  dentist: dentists.find((el) => el.id === values.dentist),
                  patient: patient.info,
                  title: values.title,
                  description: values.description,
                  id: newId,
                  severity: values.severity,
                  status: 'pending',
                  reply: '',
                  time: values.date.format('YYYY-MM-DD')
                };
                dispatch(addBooking(result));
                openNotificationWithIcon('success', api, 'added', 'booking');
                // error notifaction on failed or something
              }, 2000);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
        onCancel={() => {
          setNewModalOpen(false);
        }}
        cancelButtonProps={{ className: 'defaultButton' }}
        confirmLoading={confirmNewLoading}
        okText='Add'
      >
        <Form
          form={form}
          layout='vertical'
          name='form_in_modal'
          className='addBookingForm'
          initialValues={{
            dentist: dentists[0]?.id,
            date: dayjs(),
            severity: 'low'
          }}
        >
          <Form.Item
            name='dentist'
            label='Dentist'
            rules={[
              {
                required: true,
                message: 'Please select a dentist!'
              }
            ]}
          >
            <Select placeholder='Select a dentist'>
              {dentists.map((dentist) => {
                return (
                  <Option
                    value={dentist.id}
                    key={dentist.id}
                  >{`${dentist.name} ${dentist.surname}`}</Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name='date'
            label='Date'
            rules={[
              { required: true, message: 'Please pick your booking date!' }
            ]}
          >
            <DatePicker
              style={{ width: '100%' }}
              allowClear={false}
              disabledDate={(current) => {
                return current && current.valueOf() < Date.now();
              }}
            />
          </Form.Item>
          <Form.Item
            name='severity'
            label='Severity'
            rules={[
              {
                required: true,
                message: 'Please select a severity!'
              }
            ]}
          >
            <Select placeholder='Select a severity'>
              <Option value='low' key={'low'}>
                low
              </Option>
              <Option value='medium' key={'medium'}>
                medium
              </Option>
              <Option value='high' key={'high'}>
                high
              </Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='title'
            label='Title'
            rules={[
              {
                required: true,
                message: 'Please input the title of your booking!'
              }
            ]}
          >
            <Input maxLength={29} showCount />
          </Form.Item>
          <Form.Item name='description' label='Description'>
            <TextArea style={{ height: 120 }} />
          </Form.Item>
        </Form>
      </Modal>

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
