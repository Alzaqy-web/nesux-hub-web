"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PaginationMeta } from "@/types/pagination";

interface PaginationSectionProps extends PaginationMeta {
  setPage: (page: number) => void;
}

const PaginationSection = ({
  page,
  take,
  total,
  setPage,
}: PaginationSectionProps) => {
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    const totalPage = Math.ceil(total / take);

    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={handlePrev}>
          <PaginationPrevious />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink>{page}</PaginationLink>
        </PaginationItem>

        <PaginationItem onClick={handleNext}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSection;
