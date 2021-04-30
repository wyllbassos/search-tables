import styled from 'styled-components';

type HeaderButtonProps = {
  selected?: boolean;
};

export const Header = styled.header`
  color: var(--green);
  display: flex;
  height: 2.5rem;

  align-items: center;

  background-color: var(--dark);

  span {
    margin: 0 2rem;
  }
`;

export const HeaderButton = styled.div<HeaderButtonProps>`
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 100%;
  padding: 0 1.5rem;

  span {
    font-weight: 600;
    margin: 0;
    border-bottom: ${({ selected }) =>
      selected ? '2px solid var(--green)' : ''};
  }

  &:hover {
    transition: filter 0.2s;
    filter: brightness(0.7);
  }
`;
