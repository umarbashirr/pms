import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, CreditCard, BedDouble, Eye } from "lucide-react";

export default function BookingCardTwo({ booking }: { booking: any }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="bg-primary text-primary-foreground p-4">
          <h3 className="text-lg font-semibold">{booking.bookerName}</h3>
          <p className="text-sm opacity-90">{booking.primaryGuestName}</p>
        </div>
        <div className="p-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Room</p>
            <p className="font-medium">
              {booking.roomNumber} - {booking.roomType}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Check-in</p>
            <p className="font-medium">{booking.checkIn}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Amount</p>
            <p className="font-medium">${booking.totalAmount}</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground">Pax</p>
            <p className="font-medium">{booking.pax}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-muted/50">
        <Badge
          variant={
            booking.status === "Confirmed"
              ? "default"
              : booking.status === "Checked In"
              ? "outline"
              : booking.status === "Pending"
              ? "secondary"
              : "destructive"
          }
        >
          {booking.status}
        </Badge>
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
