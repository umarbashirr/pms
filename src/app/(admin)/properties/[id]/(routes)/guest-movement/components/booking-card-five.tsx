import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, CreditCard, BedDouble, Eye } from "lucide-react";

export default function BookingCardFive({ booking }: { booking: any }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold">{booking.bookerName}</h3>
            <p className="text-sm text-muted-foreground">
              {booking.primaryGuestName}
            </p>
          </div>
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
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <BedDouble className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              Room {booking.roomNumber} - {booking.roomType}
            </span>
          </div>
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {booking.checkIn} to {booking.checkOut}
            </span>
          </div>
          <div className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>
              {booking.payType} - ${booking.totalAmount}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
            <span>Pax: {booking.pax}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button variant="outline" size="sm" className="w-full">
          <Eye className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
