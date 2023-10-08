import React from 'react';
import { Empty, Typography } from 'antd';

const NoPage: React.FC = () => (
  <Empty
    imageStyle={{ height: '300px' }}
    description={
      <Typography.Text style={{ fontSize: '1.2em' }}>
        Oops! This Page doesn't exist or was removed
      </Typography.Text>
    }
  />
);

export default NoPage;
