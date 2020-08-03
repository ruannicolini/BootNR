import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

const Input: React.FC<InputProps> = (props) => (
  <Container>
    <input type="text" {...props} />
  </Container>
);

export default Input;
