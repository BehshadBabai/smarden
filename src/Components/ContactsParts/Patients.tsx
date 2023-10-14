import React from 'react';
import { Avatar, Empty, Input, List, Space } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { useAppSelector } from '../../Redux/hooks';
import { getInitials } from '../../Utilities/Util';
import { FcPhoneAndroid } from 'react-icons/fc';
import { BsGenderMale } from 'react-icons/bs';
import { FiMail } from 'react-icons/fi';
import { AiOutlineIdcard } from 'react-icons/ai';

export const Patients: React.FC = () => {
  const allPatients = useAppSelector((state) => state.dentist.patients);
  const [patients, setPatients] = React.useState(allPatients);
  const filteredDisabled = !(allPatients.length > 0);
  return (
    <Space direction='vertical' size={'middle'} style={{ width: '100%' }}>
      <Input
        placeholder='filter by name'
        allowClear
        onChange={(e) => {
          const term = e.target.value;
          if (term) {
            const filtered = allPatients.filter(
              (info) =>
                info.name.toLowerCase().includes(term.toLowerCase()) ||
                info.surname.toLowerCase().includes(term.toLowerCase())
            );
            setPatients(filtered);
          } else {
            setPatients(allPatients);
          }
        }}
        style={{ width: 200 }}
        addonAfter={<FilterOutlined />}
        disabled={filteredDisabled}
      />
      {allPatients?.length > 0 ? (
        <List
          pagination={{
            position: 'bottom',
            align: 'center',
            onChange() {
              // change to focus on top
            }
          }}
          dataSource={patients}
          renderItem={(item, _index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar shape='circle' style={{ background: 'gray' }}>
                    {getInitials(item.name, item.surname)}
                  </Avatar>
                }
                title={`${item.name} ${item.surname}`}
                description={
                  <Space
                    direction='horizontal'
                    size={'large'}
                    wrap={true}
                    style={{ width: '95%' }}
                  >
                    <Space direction='horizontal' size={'small'}>
                      <FiMail size={20} />
                      <p>{item.email}</p>
                    </Space>
                    <Space direction='horizontal' size={'small'}>
                      <FcPhoneAndroid size={20} />
                      <p>{item.phone}</p>
                    </Space>
                    {item.gender && (
                      <Space direction='horizontal' size={'small'}>
                        <BsGenderMale size={20} />
                        <p>{item.gender}</p>
                      </Space>
                    )}
                    {item.dob && (
                      <Space direction='horizontal' size={'small'}>
                        <AiOutlineIdcard size={25} />
                        <p>{item.dob}</p>
                      </Space>
                    )}
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty
          description='You currently have no patients, please check back later!'
          style={{ fontSize: '1.3em' }}
          imageStyle={{ height: '200px' }}
        />
      )}
    </Space>
  );
};

export default Patients;
