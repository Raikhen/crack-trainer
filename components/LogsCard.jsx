"use client"
import { useState, useMemo } from "react"
import { Button } from "./ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Input } from "./ui/Input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../lib/utils"
import { Command, CommandEmpty, CommandList, CommandInput, CommandItem } from "./ui/Command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover"
import * as PopoverPrimitive from "@radix-ui/react-popover";
const PopoverClose = PopoverPrimitive.Close;

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/Pagination"

// Sample data
const logbookData = [
  { id: 1, climber: "Alex Honnold", date: "2023-06-15", route: "El Capitan", laps: 1 },
  { id: 2, climber: "Adam Ondra", date: "2023-06-14", route: "Silence", laps: 3 },
  { id: 3, climber: "Janja Garnbret", date: "2023-06-13", route: "Biographie", laps: 2 },
  { id: 4, climber: "Tommy Caldwell", date: "2023-06-12", route: "Dawn Wall", laps: 1 },
  { id: 5, climber: "Ashima Shiraishi", date: "2023-06-11", route: "Open Your Mind Direct", laps: 4 },
  { id: 6, climber: "Chris Sharma", date: "2023-06-10", route: "La Dura Dura", laps: 2 },
  { id: 7, climber: "Margo Hayes", date: "2023-06-09", route: "Biographie", laps: 1 },
  { id: 8, climber: "Alex Megos", date: "2023-06-08", route: "Bibliographie", laps: 3 },
  { id: 9, climber: "Sasha DiGiulian", date: "2023-06-07", route: "Pure Imagination", laps: 2 },
  { id: 10, climber: "Stefano Ghisolfi", date: "2023-06-06", route: "Perfecto Mundo", laps: 1 },
  { id: 11, climber: "Nina Williams", date: "2023-06-05", route: "Ambrosia", laps: 2 },
  { id: 12, climber: "Daniel Woods", date: "2023-06-04", route: "The Process", laps: 3 },
]

export default function Component() {
  const [climberFilter, setClimberFilter] = useState("")
  const [routeFilter, setRouteFilter] = useState("")
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "desc" })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10
  const [climbersPopoverOpen, setClimbersPopoverOpen] = useState(false);
  const [routesPopoverOpen, setRoutesPopoverOpen] = useState(false);

  const uniqueClimbers = useMemo(() => [...new Set(logbookData.map((entry) => entry.climber))], [])
  const uniqueRoutes = useMemo(() => [...new Set(logbookData.map((entry) => entry.route))], [])

  const filteredAndSortedData = useMemo(() => {
    return logbookData
      .filter(
        (entry) =>
          entry.climber.toLowerCase().includes(climberFilter.toLowerCase()) &&
          entry.route.toLowerCase().includes(routeFilter.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1
        }
        return 0
      })
  }, [climberFilter, routeFilter, sortConfig])

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedData, currentPage])

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage)

  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc",
    }))
  }

  const handleClimberSelect = (climber) => {
    console.log(climber);

    if (climberFilter !== climber) {
      setClimberFilter(climber);
    } else {
      setClimberFilter("");
    }

    setClimbersPopoverOpen(false);
  }

  const handleRouteSelect = (route) => {
    console.log(route);

    if (routeFilter !== route) {
      setRouteFilter(route);
    } else {
      setRouteFilter("");
    }

    setRoutesPopoverOpen(false);
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Logbook</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 mb-4">
          <Popover open={climbersPopoverOpen} onOpenChange={setClimbersPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {climberFilter || "Select Climber"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search climber..." />
                <CommandEmpty>No climber found.</CommandEmpty>
                <CommandList>
                  {uniqueClimbers.map((climber) => (
                    <CommandItem key={climber} onSelect={handleClimberSelect}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            climberFilter === climber ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {climber}
                    </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={routesPopoverOpen} onOpenChange={setRoutesPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-between">
                {routeFilter || "Select Route"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search route..." />
                <CommandEmpty>No route found.</CommandEmpty>
                <CommandList>
                  {uniqueRoutes.map((route) => (
                      <CommandItem key={route} onSelect={handleRouteSelect}>
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            routeFilter === route ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {route}
                      </CommandItem>
                  ))}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="cursor-pointer" onClick={() => handleSort("climber")}>
                Climber {sortConfig.key === "climber" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                Date {sortConfig.key === "date" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("route")}>
                Route {sortConfig.key === "route" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
              <TableHead className="cursor-pointer text-right" onClick={() => handleSort("laps")}>
                Laps {sortConfig.key === "laps" && (sortConfig.direction === "asc" ? "↑" : "↓")}
              </TableHead>
            </TableRow>
          </TableHeader>
          {paginatedData.length ? (
            <TableBody>
              {paginatedData.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{entry.climber}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                  <TableCell>{entry.route}</TableCell>
                  <TableCell className="text-right">{entry.laps}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center">No logs found.</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            { currentPage > 1 && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}
            { currentPage > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink isActive>{currentPage}</PaginationLink>
            </PaginationItem>
            { currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            { currentPage < totalPages && (
              <PaginationItem>
                <PaginationLink
                  className="cursor-pointer"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}