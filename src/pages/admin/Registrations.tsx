
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, Download, Calendar, Users } from "lucide-react";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  college: string;
  ticket_type: string;
  amount: number;
  payment_status: string;
  created_at: string;
}

const paymentStatusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  paid: "bg-green-100 text-green-800 hover:bg-green-200",
  failed: "bg-red-100 text-red-800 hover:bg-red-200",
  refunded: "bg-gray-100 text-gray-800 hover:bg-gray-200",
};

const Registrations = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    filterRegistrations();
  }, [registrations, searchTerm, statusFilter]);

  const fetchRegistrations = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setIsLoading(false);
    }
  };

  const filterRegistrations = () => {
    let filtered = [...registrations];
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (reg) =>
          reg.name.toLowerCase().includes(term) ||
          reg.email.toLowerCase().includes(term) ||
          reg.phone.toLowerCase().includes(term) ||
          (reg.college && reg.college.toLowerCase().includes(term))
      );
    }
    
    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((reg) => reg.payment_status === statusFilter);
    }
    
    setFilteredRegistrations(filtered);
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("registrations")
        .update({ payment_status: newStatus })
        .eq("id", id);
        
      if (error) throw error;
      
      // Update local state
      setRegistrations(
        registrations.map((reg) =>
          reg.id === id ? { ...reg, payment_status: newStatus } : reg
        )
      );
      
      toast.success(`Status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "College", "Ticket Type", "Amount", "Payment Status", "Registration Date"];
    
    const csvRows = [
      headers.join(','),
      ...filteredRegistrations.map((reg) => {
        const date = new Date(reg.created_at).toLocaleDateString();
        return [
          `"${reg.name}"`,
          `"${reg.email}"`,
          `"${reg.phone}"`,
          `"${reg.college || ''}"`,
          `"${reg.ticket_type}"`,
          reg.amount,
          `"${reg.payment_status}"`,
          `"${date}"`,
        ].join(',');
      }),
    ].join('\n');
    
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `registrations-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Registrations</h1>
        <Button 
          onClick={exportToCSV} 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={filteredRegistrations.length === 0}
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="flex flex-col items-center justify-center border rounded-lg py-16">
          <Users className="h-16 w-16 text-muted-foreground opacity-25 mb-4" />
          <p className="text-muted-foreground">No registrations found</p>
          {searchTerm || statusFilter !== "all" ? (
            <p className="text-sm text-muted-foreground mt-2">
              Try changing your search or filter
            </p>
          ) : null}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Ticket</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRegistrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell className="font-medium">
                      {registration.name}
                      {registration.college && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {registration.college}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>{registration.email}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {registration.phone}
                      </div>
                    </TableCell>
                    <TableCell>{registration.ticket_type}</TableCell>
                    <TableCell>₹{registration.amount}</TableCell>
                    <TableCell>
                      <Select
                        defaultValue={registration.payment_status}
                        onValueChange={(value) => handleUpdateStatus(registration.id, value)}
                      >
                        <SelectTrigger className={`w-[110px] ${paymentStatusColors[registration.payment_status] || ""}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="failed">Failed</SelectItem>
                          <SelectItem value="refunded">Refunded</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        {new Date(registration.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Registrations;
