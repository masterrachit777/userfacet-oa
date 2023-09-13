import styled from "styled-components";

export const HeaderWrapper = styled.div`
  color: #fff;
  background: #03090B;
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 20px;

  & .middle_content {
    & span {
      color: #0093af;
      text-shadow: 0 0 6px #1cac78;
    }
  }

  & .right_content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #0093af;
    text-shadow: 0 0 7px #1cac78;
    & div{
        margin-left: 10px;
    }
    & span {
      color: #fff;
    }
  }
`;
