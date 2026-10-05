import { useState } from 'react';

export function usePagination(totalItems: number, limit: number = 5) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const totalPages = Math.ceil(totalItems / limit) || 1;

  const nextpage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const jumpToPage = (pageNumber: number) => {
    const pageNumberMap = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(pageNumberMap);
  };

  return {
    currentPage,
    totalPages,
    nextpage,
    prevPage,
    jumpToPage,
  };
}