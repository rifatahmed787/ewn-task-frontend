import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const TableSkeleteon = () => {
  return (
    <Table>
      <TableBody>
        {Array.from({ length: 5 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <button
                className={`focus:outline-none rounded-lg cursor-pointer w-12 h-12 bg-gray-100 flex items-center justify-center mx-auto
                      `}
              >
                <svg
                  className="w-5 h-5 text-gray-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
              </button>
            </TableCell>
            <TableCell className="font-medium">
              <div className="w-16 h-4 bg-gray-200 animate-pulse rounded"></div>
            </TableCell>
            <TableCell>
              <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
            </TableCell>
            <TableCell>
              <div className="w-20 h-6 bg-gray-200 animate-pulse rounded-full"></div>
            </TableCell>
            <TableCell>
              <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
            </TableCell>
            <TableCell className="text-right">
              <div className="w-12 h-4 bg-gray-200 animate-pulse rounded"></div>
            </TableCell>
            <TableCell className="text-right">
              <div className="w-12 h-4 bg-gray-200 animate-pulse rounded"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleteon;
