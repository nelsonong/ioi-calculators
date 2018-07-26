import React from 'react';
import InstructionBox from '../../components/InstructionBox';

const Home = () => {
  const text = 'Welcome! To get started, please select a type of calculator on the top-right.';
  return (
    <InstructionBox text={text} />
  );
};

export default Home;
