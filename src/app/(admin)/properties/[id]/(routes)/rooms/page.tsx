"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Search, SlidersHorizontal } from "lucide-react";

// In a real application, this data would come from an API
const roomsData = [
  {
    id: 101,
    type: "Standard",
    capacity: 2,
    price: 100,
    status: "Available",
    lastCleaned: "2023-06-15",
  },
  {
    id: 102,
    type: "Deluxe",
    capacity: 3,
    price: 150,
    status: "Occupied",
    lastCleaned: "2023-06-14",
  },
  {
    id: 103,
    type: "Suite",
    capacity: 4,
    price: 250,
    status: "Maintenance",
    lastCleaned: "2023-06-13",
  },
  {
    id: 201,
    type: "Standard",
    capacity: 2,
    price: 100,
    status: "Available",
    lastCleaned: "2023-06-15",
  },
  {
    id: 202,
    type: "Deluxe",
    capacity: 3,
    price: 150,
    status: "Available",
    lastCleaned: "2023-06-15",
  },
  {
    id: 203,
    type: "Suite",
    capacity: 4,
    price: 250,
    status: "Occupied",
    lastCleaned: "2023-06-14",
  },
  {
    id: 301,
    type: "Standard",
    capacity: 2,
    price: 100,
    status: "Maintenance",
    lastCleaned: "2023-06-12",
  },
  {
    id: 302,
    type: "Deluxe",
    capacity: 3,
    price: 150,
    status: "Available",
    lastCleaned: "2023-06-15",
  },
  {
    id: 303,
    type: "Suite",
    capacity: 4,
    price: 250,
    status: "Occupied",
    lastCleaned: "2023-06-13",
  },
];

export default function RoomList() {
  const [rooms, setRooms] = useState(roomsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("id");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterType = (value: string) => {
    setFilterType(value);
  };

  const handleFilterStatus = (value: string) => {
    setFilterStatus(value);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const filteredRooms = rooms
    .filter(
      (room) =>
        room.id.toString().includes(searchTerm) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((room) => filterType === "All" || room.type === filterType)
    .filter((room) => filterStatus === "All" || room.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "id") return a.id - b.id;
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "capacity") return a.capacity - b.capacity;
      return 0;
    });

  const roomTypes = ["All", ...new Set(rooms.map((room) => room.type))];
  const roomStatuses = ["All", ...new Set(rooms.map((room) => room.status))];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Room List</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Select onValueChange={handleFilterType} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              {roomTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleFilterStatus} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {roomStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSort} defaultValue="id">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id">Room Number</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="capacity">Capacity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Room Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Room No.</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Cleaned</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell className="font-medium">{room.id}</TableCell>
                  <TableCell>{room.type}</TableCell>
                  <TableCell>{room.capacity}</TableCell>
                  <TableCell>${room.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        room.status === "Available"
                          ? "outline"
                          : room.status === "Occupied"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {room.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{room.lastCleaned}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <BedDouble className="h-4 w-4 mr-2" />
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
