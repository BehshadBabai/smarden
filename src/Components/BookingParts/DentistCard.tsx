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

const DentistCard: React.FC = () => {
  const { Option } = Select;

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
              <Space
                direction='horizontal'
                size={'small'}
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center'
                }}
              >
                <Typography.Title level={5}>Add a Booking</Typography.Title>
                <PlusCircleOutlined />
              </Space>
            }
            style={{ width: 300, textAlign: 'center', cursor: 'pointer' }}
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
            <CalendarFilled style={{ fontSize: '8em' }} />
          </Card>
        </Col>
        {/* {booking card template, have to render from array} */}
        {bookings.map((myBooking) => {
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
                  <CommentOutlined
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
                  />,
                  <EditOutlined
                    key='edit'
                    onClick={() => {
                      setBooking(myBooking);
                      setDescText(myBooking.description);
                      setEditModalOpen(true);
                    }}
                  />,
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
                  >
                    <DeleteOutlined key={'delete'} />
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
                              <CheckCircleOutlined style={{ color: 'green' }} />
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
        confirmLoading={confirmNewLoading}
        okText='Add'
      >
        <Form
          form={form}
          layout='vertical'
          name='form_in_modal'
          initialValues={{
            dentist: dentists[0].id,
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
    </>
  );
};

export default DentistCard;
