import styled from "styled-components";

export const Loanding = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const IssusList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;
   
  li{
    display: flex;
    padding: 15px 10px;
    background: #eafde6;
   

    & + li {
        margin-top: 12px;
    }

  }

  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #911440;
  }

  div {
    flex: 1;
    margin-left: 12px;

    p{
        margin-top: 10px;
        font-size: 12px;
        color: #000;
    }
  }

  strong{
    font-size: 15px;

    a{
        text-decoration: none;
        color: #222;
        transform: 0.3s;

        &:hover{
            color: #0071db;
        }
    }

    span{
        background: #222;
        color: #fff;
        border-radius: 4px;
        font-size:12px;
        font-weight: 600;
        padding: 5px 7px;
        margin-left: 10px;
    }
  }
`;

export const BackButton = styled.div`
  padding-top: 30px;
`;
export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 0 30px;
  margin: 70px auto;
`;
export const Owner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0;
  }

  h1 {
    font-size: 30px;
    color: #0d2636;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
    margin-bottom: 20px;
  }
`;
