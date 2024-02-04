import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  > header {
    width: 100%;
    height: 144px;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_900};

    display: flex;
    align-items: center;

    padding: 0 124px;

    svg {
      color: ${({ theme }) => theme.COLORS.GRAY_300};
      font-size: 24px;
    }
  }
`;

export const Form = styled.form`
  max-width: 340px;
  margin: -92px auto 0;

  > div:nth-child(4) {
    margin-top: 24px;
  }
`;

export const Avatar = styled.div`
  position: relative;
  margin: 0 auto 32px;

  width: 186px;
  height: 186px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};
  border-radius: 100%;

  > img {
    border-radius: 50%;

    width: ${({ $userAvatar }) => (!$userAvatar ? "98px" : "186px")};
    height: ${({ $userAvatar }) => (!$userAvatar ? "98px" : "186px")};
  }

  > label {
    width: 48px;
    height: 48px;

    background: ${({ theme }) => theme.COLORS.LIGHT_BLUE};
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    bottom: 7px;
    right: 7px;

    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;

      color: ${({ theme }) => theme.COLORS.BACKGROUND_800};
    }
  }
`;
