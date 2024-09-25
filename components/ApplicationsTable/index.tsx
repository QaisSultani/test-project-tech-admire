"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { applications_dummy_data } from "@/lib/dumy_data";
import FilterSheet from "../FilterSheet";

enum SortingKey {
  Cost = "cost",
  Deadline = "deadline",
}
enum SortingDirection {
  Ascending = "ascending",
  Descending = "descending",
}
type SortingConfig = {
  key: SortingKey | null;
  direction: SortingDirection;
};

const ApplicationsTable = () => {
  const [applications] = useState(applications_dummy_data);
  const [filteredApplication, setFilteredApplications] = useState(
    applications_dummy_data
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState<SortingConfig>({
    key: null,
    direction: SortingDirection.Ascending,
  });

  const requestSort = (key: SortingKey) => {
    let direction = SortingDirection.Ascending;
    if (
      sortConfig.key === key &&
      sortConfig.direction === SortingDirection.Ascending
    ) {
      direction = SortingDirection.Descending;
    }
    setSortConfig({ key, direction });

    const sortedApplications = [...filteredApplication].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setFilteredApplications(sortedApplications);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredApplication.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key === column) {
      return sortConfig.direction === "ascending" ? (
        <ChevronUp className="h-4 w-4 inline" />
      ) : (
        <ChevronDown className="h-4 w-4 inline" />
      );
    }
    return <ChevronsUpDown className="h-4 w-4 inline" />;
  };

  return (
    <Card className="max-w-[80vw]">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
          <CardTitle className="text-xl">Applications List</CardTitle>
          <FilterSheet
            applications={applications}
            setFilteredApplications={setFilteredApplications}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Duration (years)</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort(SortingKey.Cost)}
                    className="font-semibold"
                  >
                    Cost ($) <SortIcon column="cost" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => requestSort(SortingKey.Deadline)}
                    className="font-semibold"
                  >
                    Deadline <SortIcon column="deadline" />
                  </Button>
                </TableHead>
                <TableHead>Language</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>{application.name}</TableCell>
                  <TableCell>{application.university}</TableCell>
                  <TableCell>{application.country}</TableCell>
                  <TableCell>{application.duration}</TableCell>
                  <TableCell>${application.cost.toLocaleString()}</TableCell>
                  <TableCell>{application.deadline}</TableCell>
                  <TableCell>{application.language}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="sm:flex justify-between items-center gap-4 space-y-5 sm:space-y-0">
            <div className="flex items-center space-x-2 justify-center">
              <span className="text-sm text-gray-500">Rows per page:</span>
              <Select
                value={itemsPerPage.toString()}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent>
                  {[5, 10, 20].map((pageSize) => (
                    <SelectItem key={pageSize} value={pageSize.toString()}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center space-x-2 overflow-auto">
              {Array.from(
                {
                  length: Math.ceil(filteredApplication.length / itemsPerPage),
                },
                (_, i) => (
                  <Button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className="w-8 h-8 p-0"
                  >
                    {i + 1}
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationsTable;
