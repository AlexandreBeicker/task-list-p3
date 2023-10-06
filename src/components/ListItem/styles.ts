import styled from "styled-components";

export type ContainerProps = {
  done: boolean;
};

export const Container = styled.div<ContainerProps>`
  display: flex;
  background-color: #434190;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  align-items: center;

  input {
    width: 25px;
    height: 25px;
    margin-right: 5px;
    border-radius: 5px;
  }

  label {
    text-decoration: ${({ done }) => (done ? "line-through" : "initial")};
  }

  .editButtons {
    button {
      background-color: transparent;
      border: 1px solid #FFF;
      padding: 5px 10px;
      color: #FFF;
      cursor: pointer;
    }
  }
`;