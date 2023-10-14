import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DentistInfo } from '../dentist/dentist-slice';

interface AppState {
  route: string;
  allDentists: DentistInfo[];
}

const splitArray = window.location.href.split('/');
const path = splitArray[splitArray.length - 1] || '/';

const initialState: AppState = {
  route: path,
  allDentists: [
    {
      name: 'John',
      surname: 'Smith',
      email: 'jsmith@yahoo.com',
      id: '1',
      address1: '879 6th Street',
      address2: 'Unit 321',
      country: 'Canada',
      phone: '7781235665',
      province: 'British Columbia',
      postalCode: 'V5Y0J9'
    },
    {
      name: 'Mohammad',
      surname: 'Babai',
      email: 'mbabai110@yahoo.com',
      id: '2',
      address1: '8181 Chester',
      address2: 'Unit 1007',
      country: 'Canada',
      phone: '7781195442',
      province: 'Alberta',
      postalCode: 'A5X0J9'
    },
    {
      name: 'Brian',
      surname: 'Wang',
      email: 'bwang@yahoo.com',
      id: '3',
      address1: '9021 Hastings',
      address2: 'Unit 8090',
      country: 'Canada',
      phone: '778',
      province: 'Northwest Territories',
      postalCode: 'N5T0J9'
    },
    {
      name: 'Jay',
      surname: 'Rog',
      email: 'jrog@yahoo.com',
      id: '4',
      address1: '891 Jarvis Street',
      address2: '',
      country: 'Canada',
      phone: '778',
      province: 'Ontario',
      postalCode: 'O5X1J9'
    },
    {
      name: 'Paul',
      surname: 'Kennedy',
      email: 'pkennedy@yahoo.com',
      id: '5',
      address1: '892 Victory Way',
      address2: 'Unit 1010',
      country: 'United States',
      phone: '1235558907',
      province: 'Idaho',
      postalCode: 'NY1J9'
    },
    {
      name: 'Nina',
      surname: 'Bloom',
      email: 'nbloom@yahoo.com',
      id: '6',
      address1: '123 US Blvd',
      address2: 'Unit 509',
      country: 'United States',
      phone: '1675558932',
      province: 'California',
      postalCode: 'W5XY7'
    },
    {
      name: 'Lisa',
      surname: 'Graham',
      email: 'lgraham@yahoo.com',
      id: '7',
      address1: '100 Canada Way',
      address2: '',
      country: 'Canada',
      phone: '7788909765',
      province: 'Northwest Territories',
      postalCode: 'N1O0R9'
    },
    {
      name: 'Vivek',
      surname: 'Rami',
      email: 'vrami@yahoo.com',
      id: '8',
      address1: '8756 Whiting Road',
      address2: '',
      country: 'United States',
      phone: '3325559801',
      province: 'New York',
      postalCode: 'N0J8T'
    },
    {
      name: 'Mohit',
      surname: 'Wadhwa',
      email: 'mwadhwa@gmail.com',
      id: '9',
      address1: '1023 Marine Drive',
      address2: 'Unit 101',
      country: 'Canada',
      phone: '7788965731',
      province: 'British Columbia',
      postalCode: 'V6Q1D4'
    },
    {
      name: 'Frank',
      surname: 'Adams',
      email: 'fadams@yahoo.com',
      id: '10',
      address1: '1076 Shipyards',
      address2: '',
      country: 'Canada',
      phone: '7789038979',
      province: 'Yukon',
      postalCode: 'Y5X0W9'
    },
    {
      name: 'Andrew',
      surname: 'Tang',
      email: 'atang@hotmail.com',
      id: '11',
      address1: '1071 Shipyards',
      address2: 'Unit 32',
      country: 'Canada',
      phone: '7789038973',
      province: 'Yukon',
      postalCode: 'Y5X0W7'
    }
  ]
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    changeRoute(state, action: PayloadAction<string>) {
      state.route = action.payload;
    }
  }
});

export const { changeRoute } = appSlice.actions;
export default appSlice.reducer;
