import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Users, CreditCard, BedDouble, Eye } from "lucide-react";

export default function BookingCardThree({ booking }: { booking: any }) {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <BedDouble className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">{booking.bookerName}</h3>
            <p className="text-sm text-muted-foreground">
              Room {booking.roomNumber} - {booking.roomType}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm font-medium">{booking.checkIn}</p>
            <p className="text-sm text-muted-foreground">
              ${booking.totalAmount}
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
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
