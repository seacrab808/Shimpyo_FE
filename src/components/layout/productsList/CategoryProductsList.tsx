/* eslint-disable  @typescript-eslint/indent */
import { css } from '@emotion/react';
import { useInfiniteQuery } from 'react-query';
import { useEffect, useRef, useState } from 'react';
import ColumnList from './ColumnList';
import { useObs, useProductsData } from '../../../hooks/useProductsData';
import { ResponseProductsData } from '../../../types';

type PropsType = {
  category: string;
};

const CategoryProductsList = ({ category }: PropsType) => {
  const [isEnd, setIsEnd] = useState(false);
  const obsRef = useRef(null);
  const pageVolume = 8;

  const { data, fetchNextPage } = useInfiniteQuery<
    unknown,
    unknown,
    ResponseProductsData[]
  >(
    category,
    ({ pageParam = 0 }) => {
      return getData(pageParam);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 100000,
      getNextPageParam: (pageParam, allPage) => {
        if (!allPage) {
          return pageParam;
        }
        return allPage.length;
      },
    },
  );

  // 페이지에 다시 돌아왔을 때 더 로딩할 페이지가 있는지 확인 로직
  useEffect(() => {
    if (data)
      if (
        data?.pages[data.pages.length - 1] < data?.pages[data.pages.length - 2]
      ) {
        setIsEnd(true);
      }
  }, []);

  const obsHandler = async (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isEnd) {
      fetchNextPage();
    }
  };

  useObs(obsHandler, obsRef);

  const getData = async (pageParam: number) => {
    try {
      const fetchData = await useProductsData(pageParam, pageVolume, category);
      if (fetchData) {
        if (fetchData.length < pageVolume) {
          setIsEnd(true);
        }
        return fetchData;
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  };

  return (
    <div css={PageBox}>
      <div css={ListBox}>
        <div css={CategoryNameBox}>
          <h2 css={CategoryName}>
            {category === 'hot' && '인기 숙소'}
            {category === '펜션,풀빌라' && '펜션, 풀빌라'}
            {category === '호텔,모텔' && '호텔, 모텔'}
          </h2>
          <p css={CategoryDesc}>
            {category === 'hot' && '가장 잘 나가는 숙소 추천'}
            {category === '펜션,풀빌라' && '크리스마스 펜션 예약하기'}
            {category === '호텔,모텔' && '지금 떠나는 도심 호캉스!'}
          </p>
        </div>
        {data && data.pages && (
          <ColumnList category={category} data={data.pages.flat()} />
        )}
        {!isEnd && <div ref={obsRef} />}
      </div>
    </div>
  );
};

export default CategoryProductsList;

const PageBox = css`
  position: relative;

  min-height: calc(100vh - 70px);

  display: flex;
  justify-content: center;

  background-color: rgba(255, 2555, 255, 0.8);
`;

const ListBox = css`
  width: 68.75rem;

  display: flex;
  flex-direction: column;

  padding: 3.125rem 0;
  gap: 3rem;
`;

const CategoryNameBox = css`
  position: relative;

  height: 6rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CategoryName = css`
  font-size: 3rem;
  font-weight: 700;
`;

const CategoryDesc = css`
  font-size: 1.5rem;
  font-weight: 400;
`;
