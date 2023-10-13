import { css, styled } from 'styled-components';

export const ButtonCore = ({ children, ...props }) => {
  return <StyledButtonCore {...props}>{children}</StyledButtonCore>;
};

const StyledButtonCore = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;

  ${({ theme }) => {
    switch (theme) {
      case 'header':
        return css`
          font-size: 14px;
          background-color: transparent;
          color: white;
        `;

      case 'mainPlay':
        return css`
          font-size: 20px;
          border-radius: 5px;
          padding: 5px 30px;
        `;

      case 'mainDetail':
        return css`
          font-size: 20px;
          background: rgba(128, 128, 128, 0.6);
          color: white;
          border-radius: 5px;
          padding: 10px 25px;
          display: flex;
          justify-content: center;
          align-items: center;
        `;

      case 'replay':
        return css`
          color: blue;
          border-radius: 50%;
          width: 50px;
          height: 50px;
        `;

      default:
        break;
    }
  }}
`;
