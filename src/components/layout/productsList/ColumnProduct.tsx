import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import theme from '../../../style/theme';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  resData: ResponseProductsData;
};

const ColumnProduct = ({ resData }: PropsType) => {
  return (
    <Link to={`/products/${resData.productId}`}>
      <div css={ProductBox}>
        <img css={ProductImg} src={resData.image} alt="숙소 대표 사진" />
        <p css={ProductName}>{resData.productName}</p>
        <p css={ProductScore}>⭐ {resData.starAvg.toFixed(1)}</p>
        <p css={ProductPrice}>{resData.price.toLocaleString()}원</p>
      </div>
    </Link>
  );
};

export default ColumnProduct;

const ProductBox = css`
  width: 20.625rem;
  height: 21.25rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 1.5625rem 1.25rem;

  border: 1px solid ${theme.colors.gray300};
  border-radius: 10px;

  background-color: ${theme.colors.white};

  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  cursor: pointer;

  transition: 0.2s all;
  &:hover {
    scale: 1.015;
  }
  &:active {
    scale: 0.985;
  }
`;

const ProductImg = css`
  width: 100%;
  height: 11.25rem;

  background-color: ${theme.colors.gray700};

  border-radius: 5px;
`;

const ProductName = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 1.25rem;
  font-weight: 600;
`;
const ProductScore = css`
  width: 100%;

  display: flex;
  justify-content: flex-start;

  font-size: 0.875rem;
`;
const ProductPrice = css`
  width: 100%;

  display: flex;
  justify-content: flex-end;

  font-size: 1.35rem;
  font-weight: 700;
`;
