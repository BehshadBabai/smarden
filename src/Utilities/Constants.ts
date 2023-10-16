import { ThemeConfig } from 'antd';

export const Constants = {
  breakpoint: 600
};

export const LocalStorageKeys = {
  tours: {
    dentist: 'dentistTour',
    patient: 'patientTour'
  }
};

export const states = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];
export const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'New Foundland and Labrador',
  'Northwest Territories',
  'Nova Scotia',
  'Nunavut',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Yukon'
];

export const colors = {
  bgBlack: '#2C2C2C',
  iBlue: '#3E61BB',
  iOrange: '#FB4D3D'
};

export const themeConstant: ThemeConfig = {
  components: {
    Input: {
      colorBgContainer: 'white',
      addonBg: 'red'
    },
    Layout: {
      siderBg: colors.bgBlack,
      colorBorder: 'white',
      bodyBg: colors.bgBlack
    },
    Menu: {
      darkItemBg: colors.bgBlack
    },
    Rate: {
      starBg: 'gray'
    },
    Select: {
      colorBgContainerDisabled: 'lightGray'
    },
    Empty: {
      fontSizeIcon: 400
    },
    Button: {
      defaultBg: colors.iOrange,
      defaultColor: 'white',
      defaultBorderColor: colors.iOrange
    },
    Radio: {
      colorText: 'white'
    },
    Typography: {
      colorText: 'white',
      colorTextHeading: 'white'
    },
    List: {
      headerBg: 'lightgray',
      itemPadding: '15px 15px'
    },
    Table: {
      headerBg: 'lightgray'
    }
  },
  token: {
    colorPrimary: colors.iBlue
  }
};
