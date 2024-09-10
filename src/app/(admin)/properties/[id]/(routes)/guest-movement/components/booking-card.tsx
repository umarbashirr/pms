import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, CreditCard, BedDouble, Eye } from "lucide-react";

export default function BookingCard({ booking }: { booking: any }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{booking.bookerName}</h3>
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
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
              <BedDouble className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">
                Room {booking.roomNumber} - {booking.roomType}
              </p>
              <p className="text-xs text-muted-foreground">
                Primary Guest: {booking.primaryGuestName}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
              <CalendarIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">
                {booking.checkIn} to {booking.checkOut}
              </p>
              <p className="text-xs text-muted-foreground">
                Check-in / Check-out
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
              <CreditCard className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">
                ${booking.totalAmount} - {booking.payType}
              </p>
              <p className="text-xs text-muted-foreground">Total Amount</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mr-3">
              <Users className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">Pax: {booking.pax}</p>
              <p className="text-xs text-muted-foreground">Number of Guests</p>
            </div>
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
