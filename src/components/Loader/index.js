import React from 'react';
import { LoaderWrapper, LoaderMessage } from './styles';

const Loader = () => {
  return (
    <LoaderWrapper>
      <LoaderMessage>API Initializing...</LoaderMessage>
    </LoaderWrapper>
  );
};

export default Loader;
