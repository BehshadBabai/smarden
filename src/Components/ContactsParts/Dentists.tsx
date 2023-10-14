import { FilterOutlined } from '@ant-design/icons';
import {
  Checkbox,
  Col,
  Input,
  Popconfirm,
  Row,
  Select,
  Space,
  Table
} from 'antd';
import React from 'react';
import { provinces, states } from '../../Utilities/Constants';
import { ColumnsType } from 'antd/es/table';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { changePatientDentists } from '../../Redux/features/patient/patient-slice';
import { DentistInfo } from '../../Redux/features/dentist/dentist-slice';

const { Option } = Select;

type ColType = {
  key: string;
  name: string;
  address: string;
};

export const Dentists: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showMyDentists, setShowMyDentists] = React.useState(true);
  const [showOtherDentists, setShowOtherDentists] = React.useState(true);
  const [country, setCountry] = React.useState(null);
  const [provstate, setProvstate] = React.useState(null);
  const [nameFilter, setNameFilter] = React.useState(null);
  const provStateOptions = country === 'United States' ? states : provinces;
  const allDentists = useAppSelector((state) => state.app.allDentists);
  const patientDentists = useAppSelector((state) => state.patient.dentists);
  const otherDentists = allDentists.filter(
    (el) => !patientDentists.some((pEl) => el.id === pEl.id)
  );
  const dentists: DentistInfo[] = [];
  if (showMyDentists) {
    dentists.push(...patientDentists);
  }
  if (showOtherDentists) {
    dentists.push(...otherDentists);
  }

  const filteredName = !nameFilter
    ? dentists
    : dentists.filter(
        (el) =>
          el.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
          el.surname.toLowerCase().includes(nameFilter.toLowerCase())
      );

  const countrySorted =
    !country || country === 'All'
      ? filteredName
      : filteredName.filter((el) => el.country === country);

  const tableData: ColType[] =
    !provstate || provstate === 'All'
      ? countrySorted.map((el) => {
          return {
            key: el.id,
            name: `Dr. ${el.name} ${el.surname}`,
            address: `${el.address1}, ${el.address2}, ${el.country}, ${el.province}, ${el.postalCode}`
          };
        })
      : countrySorted
          .filter((el) => el.province === provstate)
          .map((el) => {
            return {
              key: el.id,
              name: `Dr. ${el.name} ${el.surname}`,
              address: `${el.address1}, ${el.address2}, ${el.country}, ${el.province}, ${el.postalCode}`
            };
          });

  const columns: ColumnsType<ColType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const shouldRemove = patientDentists.some((el) => el.id === record.key);
        return (
          <Popconfirm
            title={shouldRemove ? 'Remove Dentist' : 'Add Dentist'}
            description={
              shouldRemove
                ? 'Are you sure you want to remove this dentist from your dentists?'
                : 'Are you sure you want to add this dentist to your dentists?'
            }
            okText='Yes'
            onConfirm={() => {
              if (shouldRemove) {
                dispatch(
                  changePatientDentists(
                    patientDentists.filter((el) => el.id !== record.key)
                  )
                );
              } else {
                const dentistToAdd = otherDentists.find(
                  (el) => el.id === record.key
                );
                dispatch(
                  changePatientDentists([dentistToAdd, ...patientDentists])
                );
              }
            }}
          >
            <a>{shouldRemove ? 'Remove' : 'Add'}</a>
          </Popconfirm>
        );
      }
    }
  ];

  return (
    <Space direction='vertical' size={'middle'} style={{ width: '100%' }}>
      <Row gutter={[20, 20]} align={'middle'}>
        <Col>
          <Checkbox
            checked={showMyDentists}
            onChange={() => {
              setShowMyDentists(!showMyDentists);
            }}
          >
            Show My Dentists
          </Checkbox>
        </Col>
        <Col>
          <Checkbox
            checked={showOtherDentists}
            onChange={() => {
              setShowOtherDentists(!showOtherDentists);
            }}
          >
            Show Other Dentists
          </Checkbox>
        </Col>
      </Row>
      <Row gutter={[20, 20]} align={'middle'}>
        <Col>
          <Input
            suffix={<FilterOutlined />}
            style={{ width: '225px' }}
            allowClear={true}
            placeholder='Filter By Dentist Name'
            value={nameFilter}
            onChange={(e) => {
              setNameFilter(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Select
            suffixIcon={<FilterOutlined />}
            allowClear={true}
            style={{ width: '225px' }}
            placeholder='Filter By Country'
            value={country}
            onChange={(newValue) => {
              setCountry(newValue);
              if (newValue === 'All' || !newValue) {
                setProvstate(null);
              }
            }}
          >
            <Option value='All'>All</Option>
            <Option value='Canada'>Canada</Option>
            <Option value='United States'>United States</Option>
          </Select>
        </Col>
        <Col>
          <Select
            suffixIcon={<FilterOutlined />}
            allowClear={true}
            style={{ width: '225px' }}
            placeholder='Filter By Province or State'
            disabled={!country || country === 'All'}
            value={provstate}
            onChange={(newValue) => {
              setProvstate(newValue);
            }}
          >
            <Option value='All'>All</Option>
            {provStateOptions.map((el) => {
              return (
                <Option key={el} value={el}>
                  {el}
                </Option>
              );
            })}
          </Select>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{ position: ['bottomCenter'], pageSize: 10 }}
      />
    </Space>
  );
};

export default Dentists;
