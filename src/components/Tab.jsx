import styled from "styled-components";

// Using shouldForwardProp to prevent 'active' from being passed to the DOM
const StyledTab = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== 'active'
})`
  list-style: none;
  margin-left: 3rem;
  font-size: 1.5rem;
  
  ${(props) =>
    props.active &&
    `
    &::after {
      content: "";
      width: 100%;
      height: 5px;
      display: block;
      background-color: #01b4e4;
    }
  `}
`;

export default StyledTab;
