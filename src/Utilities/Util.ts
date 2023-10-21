import { NotificationInstance } from 'antd/es/notification/interface';
import { NotificationType } from './types';
import {
  AccountType,
  changeType
} from '../Redux/features/account/account-slice';
import {
  DentistInfo,
  changeDentistInfo,
  changeDentistPatients
} from '../Redux/features/dentist/dentist-slice';
import {
  PatientInfo,
  changePatientInfo
} from '../Redux/features/patient/patient-slice';
import { AppDispatch } from '../Redux/store';

export const capitalizeFirstLetter = (raw: string) => {
  const firstLetter = raw[0].toUpperCase();
  const rest = raw.substring(1);
  return firstLetter + rest;
};

export const getInitials = (raw: string, raw2: string) => {
  const firstLetter = raw?.[0]?.toUpperCase();
  const secondLetter = raw2?.[0]?.toUpperCase();
  return firstLetter + secondLetter || 'Undefined';
};

export const getSuccessMessage = (verb: string, thing: string) => {
  return `Successfully ${verb} your ${thing}`;
};

export const openNotificationWithIcon = (
  type: NotificationType,
  api: NotificationInstance,
  verb: string,
  thing: string
) => {
  api[type]({
    message: capitalizeFirstLetter(type),
    description: getSuccessMessage(verb, thing),
    placement: 'top'
  });
};

export const filterObject = (raw: { [x: string]: string }) => {
  const result = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value) {
      result[key] = value;
    }
  }
  return result;
};

export const syncRedux = (raw: { [x: string]: any }, dispatch: AppDispatch) => {
  const accType = raw.type as AccountType;
  dispatch(changeType(accType));
  // fetch and set bookings later
  // add patients and dentists array when signing up and modify them later as well, here need to fetch appropriately later
  const action = accType === 'dentist' ? changeDentistInfo : changePatientInfo;
  const result = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value && key !== 'type') {
      result[key] = value;
    }
  }
  dispatch(action(result as DentistInfo & PatientInfo));
};
