import { NotificationInstance } from 'antd/es/notification/interface';
import { NotificationType } from './types';
import {
  AccountType,
  changeType,
  setBookings
} from '../Redux/features/account/account-slice';
import {
  DentistInfo,
  changeDentistInfo,
  changeDentistPatients
} from '../Redux/features/dentist/dentist-slice';
import {
  PatientInfo,
  changePatientDentists,
  changePatientInfo
} from '../Redux/features/patient/patient-slice';
import { AppDispatch } from '../Redux/store';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { firestore } from '../Firebase/firebase';

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

export const syncUser = (
  raw: { [x: string]: any },
  dispatch: AppDispatch,
  additional: { [x: string]: string }
) => {
  // sync user info
  const accType = raw.type as AccountType;
  dispatch(changeType(accType));
  const action = accType === 'dentist' ? changeDentistInfo : changePatientInfo;
  const result = {};
  for (const [key, value] of Object.entries(raw)) {
    if (value && key !== 'type' && key !== 'dentists' && key !== 'patients') {
      result[key] = value;
    }
  }
  dispatch(
    action({
      ...result,
      id: additional.id,
      email: additional.email
    } as DentistInfo & PatientInfo)
  );

  // sync user contacts
  const arrayAction =
    accType === 'dentist' ? changeDentistPatients : changePatientDentists;
  const payload = accType === 'dentist' ? raw.patients : raw.dentists;

  dispatch(arrayAction(payload));
};

export const syncBooking = async (dispatch: AppDispatch) => {
  const docs = await fetchAllDocuments('bookings');
  const allBookings = [];
  docs.forEach((doc) => {
    const booking = doc.data();
    const id = doc.id;
    allBookings.push({ ...booking, id });
  });
  dispatch(setBookings(allBookings));
};

const addFieldsFromReference = (
  fields: string[],
  ref: object,
  result: object
) => {
  console.log(ref);
  fields.forEach((field) => {
    if (ref[field]) {
      result[field] = ref[field];
    } else {
      if (field !== 'country' && field !== 'province') {
        result[field] = '';
      }
    }
  });
};

export const parseValues = (
  raw: { [x: string]: string },
  saving: boolean,
  isPatient: boolean
) => {
  const result = !saving
    ? {
        name: raw.name,
        surname: raw.surname,
        phone: raw.phone
      }
    : {
        name: raw.name,
        surname: raw.surname
      };
  const fields = isPatient
    ? [
        'dob',
        'gender',
        'address1',
        'address2',
        'country',
        'province',
        'postalCode'
      ]
    : ['address1', 'address2', 'country', 'province', 'postalCode'];
  addFieldsFromReference(fields, raw, result);
  return result;
};

export const patientStateToDb = (raw: PatientInfo) => {
  return {
    name: raw.name,
    surname: raw.surname,
    phone: raw.phone,
    address1: raw?.address1 || '',
    address2: raw?.address2 || '',
    country: raw?.country || '',
    dob: raw?.dob || '',
    province: raw?.province || '',
    postalCode: raw?.postalCode || '',
    type: 'patient',
    gender: raw?.gender || ''
  };
};

export const addDocWithoutId = async (tableName: string, data: any) => {
  const iCollection = collection(firestore, tableName);
  const ref = await addDoc(iCollection, data);
  return ref;
};

export const addOrEditDoc = async (
  operation: 'add' | 'edit',
  tableName: string,
  id: string,
  data: any
) => {
  const operatingFunction = operation === 'add' ? setDoc : updateDoc;
  const iCollection = collection(firestore, tableName);
  const ref = doc(iCollection, id);
  return await operatingFunction(ref, data);
};

export const fetchAllDocuments = (table: string) => {
  const iCollection = collection(firestore, table);
  return getDocs(iCollection);
};

export const fetchSingleDocument = (table: string, id: string) => {
  const ref = doc(firestore, table, id);
  return getDoc(ref);
};

export const deleteDocument = async (table: string, id: string) => {
  const ref = doc(firestore, table, id);
  await deleteDoc(ref);
};
