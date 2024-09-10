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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  SlidersHorizontal,
  Eye,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";

// In a real application, this data would come from an API
const guestsData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    address: "123 Main St, City, Country",
    status: "Checked In",
    lastStay: "2023-06-15",
    totalStays: 5,
    totalSpent: 1500,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1987654321",
    address: "456 Elm St, Town, Country",
    status: "Checked Out",
    lastStay: "2023-06-10",
    totalStays: 3,
    totalSpent: 900,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    phone: "+1122334455",
    address: "789 Oak St, Village, Country",
    status: "Reserved",
    lastStay: "2023-05-20",
    totalStays: 2,
    totalSpent: 600,
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    phone: "+1555666777",
    address: "101 Pine St, Town, Country",
    status: "Cancelled",
    lastStay: "2023-04-05",
    totalStays: 1,
    totalSpent: 300,
  },
  {
    id: 5,
    name: "Charlie Wilson",
    email: "charlie@example.com",
    phone: "+1999888777",
    address: "202 Maple St, City, Country",
    status: "Checked In",
    lastStay: "2023-06-18",
    totalStays: 4,
    totalSpent: 1200,
  },
];

export default function GuestList() {
  const [guests, setGuests] = useState(guestsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("name");
  const [selectedGuest, setSelectedGuest] = useState<any>(null);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatus = (value: string) => {
    setFilterStatus(value);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const filteredGuests = guests
    .filter(
      (guest) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.phone.includes(searchTerm)
    )
    .filter((guest) => filterStatus === "All" || guest.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "lastStay")
        return new Date(b.lastStay).getTime() - new Date(a.lastStay).getTime();
      if (sortBy === "totalStays") return b.totalStays - a.totalStays;
      if (sortBy === "totalSpent") return b.totalSpent - a.totalSpent;
      return 0;
    });

  const guestStatuses = [
    "All",
    "Checked In",
    "Checked Out",
    "Reserved",
    "Cancelled",
  ];

  const handleViewGuest = (guest: any) => {
    setSelectedGuest(guest);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Guest List</h1>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search guests..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-8"
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <Select onValueChange={handleFilterStatus} defaultValue="All">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              {guestStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleSort} defaultValue="name">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="lastStay">Last Stay</SelectItem>
              <SelectItem value="totalStays">Total Stays</SelectItem>
              <SelectItem value="totalSpent">Total Spent</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Guest Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Stay</TableHead>
                <TableHead>Total Stays</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell className="font-medium">{guest.name}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        guest.status === "Checked In"
                          ? "outline"
                          : guest.status === "Checked Out"
                          ? "default"
                          : guest.status === "Reserved"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {guest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{guest.lastStay}</TableCell>
                  <TableCell>{guest.totalStays}</TableCell>
                  <TableCell>${guest.totalSpent}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewGuest(guest)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedGuest && (
        <Dialog
          open={!!selectedGuest}
          onOpenChange={() => setSelectedGuest(null)}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Guest Details</DialogTitle>
              <DialogDescription>
                Detailed information about the selected guest.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={selectedGuest.name}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={selectedGuest.email}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="phone"
                  value={selectedGuest.phone}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input
                  id="address"
                  value={selectedGuest.address}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  value={selectedGuest.status}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastStay" className="text-right">
                  Last Stay
                </Label>
                <Input
                  id="lastStay"
                  value={selectedGuest.lastStay}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalStays" className="text-right">
                  Total Stays
                </Label>
                <Input
                  id="totalStays"
                  value={selectedGuest.totalStays}
                  className="col-span-3"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalSpent" className="text-right">
                  Total Spent
                </Label>
                <Input
                  id="totalSpent"
                  value={`$${selectedGuest.totalSpent}`}
                  className="col-span-3"
                  readOnly
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedGuest(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
