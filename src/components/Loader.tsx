'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const transformAnimation = keyframes`
  0% {
    transform: translate(-55%);
  }
  100% {
    transform: translate(55%);
  }
`;

const opacityAnimation = keyframes`
  0%, 100% {
    opacity: 0;
  }
  15% {
    opacity: 1;
  }
  65% {
    opacity: 0;
  }
`;

const letterAnim = keyframes`
  0% {
    opacity: 0;
  }
  5% {
    opacity: 1;
    text-shadow: 0 0 4px #fff;
    transform: scale(1.1) translateY(-2px);
  }
  20% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
  }
`;

// Styled components
const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  margin: 2rem;
  font-family: 'Poppins', sans-serif;
  font-size: 1.6em;
  font-weight: 600;
  user-select: none;
  color: #296a52;
  scale: 2;
`;

const Letter = styled.span<{ delay: number }>`
  display: inline-block;
  opacity: 0;
  z-index: 2;
  animation: ${letterAnim} 4s infinite linear;
  animation-delay: ${({ delay }) => `${delay}s`};
`;

// Component Props
interface NewLoaderProps {
  text?: string; // optional: default = "Generate"
}

// Loader Component
const NewLoader: React.FC<NewLoaderProps> = ({ text = 'Loading...' }) => {
  return (
    <Wrapper>
      {text.split('').map((char, index) => (
        <Letter key={index} delay={0.1 + index * 0.105}>
          {char}
        </Letter>
      ))}
    </Wrapper>
  );
};

export default NewLoader;
