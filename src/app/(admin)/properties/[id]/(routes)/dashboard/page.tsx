import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  BedDouble,
  DollarSign,
  Users,
  CalendarDays,
  Star,
  TrendingUp,
  Clock,
  Briefcase,
} from "lucide-react";

export default function Dashboard() {
  // In a real application, this data would be fetched from an API
  const metrics = [
    { title: "Occupancy Rate", value: "75%", icon: BedDouble, change: "+5%" },
    {
      title: "Total Revenue",
      value: "$12,345",
      icon: DollarSign,
      change: "+12%",
    },
    { title: "Guests", value: "89", icon: Users, change: "+3" },
    { title: "Reservations", value: "23", icon: CalendarDays, change: "+2" },
    {
      title: "Average Daily Rate",
      value: "$120",
      icon: TrendingUp,
      change: "+$5",
    },
    { title: "RevPAR", value: "$90", icon: DollarSign, change: "+$7" },
  ];

  const recentBookings = [
    {
      id: 1,
      guest: "John Doe",
      roomType: "Deluxe",
      checkIn: "2023-06-15",
      checkOut: "2023-06-18",
      status: "Confirmed",
      payment: "$450",
      specialRequests: "Early check-in",
    },
    {
      id: 2,
      guest: "Jane Smith",
      roomType: "Suite",
      checkIn: "2023-06-16",
      checkOut: "2023-06-20",
      status: "Pending",
      payment: "$800",
      specialRequests: "Ocean view",
    },
    {
      id: 3,
      guest: "Bob Johnson",
      roomType: "Standard",
      checkIn: "2023-06-17",
      checkOut: "2023-06-19",
      status: "Checked In",
      payment: "$250",
      specialRequests: "Late check-out",
    },
    {
      id: 4,
      guest: "Alice Brown",
      roomType: "Deluxe",
      checkIn: "2023-06-18",
      checkOut: "2023-06-22",
      status: "Confirmed",
      payment: "$600",
      specialRequests: "Extra bed",
    },
    {
      id: 5,
      guest: "Charlie Wilson",
      roomType: "Suite",
      checkIn: "2023-06-19",
      checkOut: "2023-06-21",
      status: "Pending",
      payment: "$700",
      specialRequests: "Airport transfer",
    },
  ];

  const availableRooms = [
    { type: "Standard", available: 15, total: 20, price: "$100" },
    { type: "Deluxe", available: 8, total: 15, price: "$150" },
    { type: "Suite", available: 3, total: 10, price: "$250" },
    { type: "Executive", available: 2, total: 5, price: "$300" },
  ];

  const staffOverview = [
    { name: "Emma Thompson", role: "Front Desk", shift: "Morning", tasks: 5 },
    {
      name: "Michael Chen",
      role: "Housekeeping",
      shift: "Afternoon",
      tasks: 8,
    },
    { name: "Sarah Johnson", role: "Concierge", shift: "Evening", tasks: 3 },
    { name: "David Rodriguez", role: "Maintenance", shift: "Night", tasks: 2 },
  ];

  const guestReviews = [
    {
      guest: "Linda Davis",
      rating: 4.5,
      comment: "Excellent service and beautiful rooms!",
    },
    {
      guest: "Tom Wilson",
      rating: 3.8,
      comment: "Good stay overall, but the breakfast could be improved.",
    },
    {
      guest: "Emily Clark",
      rating: 5,
      comment: "Absolutely fantastic experience. Will definitely come back!",
    },
  ];

  const revenueBreakdown = [
    { category: "Room Revenue", amount: 8500 },
    { category: "F&B Revenue", amount: 2300 },
    { category: "Spa & Wellness", amount: 1200 },
    { category: "Other Services", amount: 345 },
  ];

  const tasks = [
    {
      id: 1,
      task: "Restock mini-bars in Deluxe rooms",
      assignee: "Housekeeping",
      dueTime: "11:00 AM",
    },
    {
      id: 2,
      task: "Prepare welcome package for VIP guest",
      assignee: "Front Desk",
      dueTime: "2:00 PM",
    },
    {
      id: 3,
      task: "Conduct routine maintenance check on pool area",
      assignee: "Maintenance",
      dueTime: "4:00 PM",
    },
  ];

  return (
    <div className=" space-y-6">
      <h1 className="text-3xl font-bold">Hotel Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.change.startsWith("+") ? (
                  <span className="text-green-600">{metric.change}</span>
                ) : (
                  <span className="text-red-600">{metric.change}</span>
                )}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Occupancy Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder: Room occupancy over time
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {revenueBreakdown.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/3 font-medium">{item.category}</div>
                  <div className="w-2/3 flex items-center">
                    <Progress
                      value={(item.amount / 12345) * 100}
                      className="w-full"
                    />
                    <span className="ml-2 text-sm text-muted-foreground">
                      ${item.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Rooms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {availableRooms.map((room, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-1/4 font-medium">{room.type}</div>
                  <div className="w-2/4 flex items-center">
                    <div className="w-full bg-muted rounded-full h-2.5">
                      <div
                        className="bg-primary rounded-full h-2.5"
                        style={{
                          width: `${(room.available / room.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {room.available}/{room.total}
                    </span>
                  </div>
                  <div className="w-1/4 text-right text-sm text-muted-foreground">
                    {room.price}/night
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staff Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffOverview.map((staff, index) => (
                <div key={index} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${index}`}
                      alt={staff.name}
                    />
                    <AvatarFallback>
                      {staff.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {staff.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {staff.role} - {staff.shift} shift
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{staff.tasks} tasks</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Room Type</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Special Requests</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell>{booking.guest}</TableCell>
                  <TableCell>{booking.roomType}</TableCell>
                  <TableCell>{booking.checkIn}</TableCell>
                  <TableCell>{booking.checkOut}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        booking.status === "Confirmed"
                          ? "default"
                          : booking.status === "Pending"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{booking.payment}</TableCell>
                  <TableCell>{booking.specialRequests}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Guest Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {guestReviews.map((review, index) => (
                <div
                  key={index}
                  className="border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{review.guest}</p>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span>{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks & Reminders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center">
                  <div className="mr-4">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {task.task}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Assigned to: {task.assignee} - Due: {task.dueTime}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
