
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

interface RegistrationSuccessProps {
  registrationId: string;
}

const RegistrationSuccess = ({ registrationId }: RegistrationSuccessProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1 text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl font-bold">Registration Successful!</CardTitle>
        <CardDescription>
          Your registration for Manfete 2025 has been confirmed
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted p-4">
          <p className="text-center text-sm mb-2 text-muted-foreground">Your Registration ID</p>
          <p className="text-center font-mono text-lg font-bold">{registrationId}</p>
          <p className="text-center text-sm mt-2 text-muted-foreground">Please save this ID for future reference</p>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• A confirmation email has been sent to your registered email</p>
          <p>• You can use your Registration ID to check in at the event</p>
          <p>• For any questions, contact tickets@manfete.com</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full bg-festival-purple hover:bg-festival-purple/90" asChild>
          <Link to="/">Return to Home</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/events">Explore Events</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegistrationSuccess;
