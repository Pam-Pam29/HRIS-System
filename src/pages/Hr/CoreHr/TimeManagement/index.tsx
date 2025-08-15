import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { TypographyH2, TypographyH3 } from '../../../../components/ui/typography';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Input } from '../../../../components/ui/input';
import { Badge } from '../../../../components/ui/badge';
import { Clock, Users, CheckCircle, AlertTriangle, XCircle, Download, Filter, Calendar, User } from 'lucide-react';

const mockAttendance = [
  { id: 1, employee: 'Jane Doe', date: '2025-07-21', clockIn: '09:00', clockOut: '17:00', status: 'Present' },
  { id: 2, employee: 'John Smith', date: '2025-07-21', clockIn: '09:10', clockOut: '17:05', status: 'Late' },
  { id: 3, employee: 'Mary Johnson', date: '2025-07-21', clockIn: '', clockOut: '', status: 'Absent' },
  { id: 4, employee: 'Jane Doe', date: '2025-07-20', clockIn: '09:01', clockOut: '17:00', status: 'Present' },
  { id: 5, employee: 'John Smith', date: '2025-07-20', clockIn: '', clockOut: '', status: 'Absent' },
];

const employees = ['Jane Doe', 'John Smith', 'Mary Johnson'];
const statuses = ['Present', 'Late', 'Absent'];

const statusConfig = {
  Present: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
  Late: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: AlertTriangle },
  Absent: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

export default function TimeManagement() {
  // Filter state
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');

  // Filter logic
  const filtered = mockAttendance.filter(row =>
    (!selectedEmployee || row.employee === selectedEmployee) &&
    (!selectedStatus || row.status === selectedStatus) &&
    (!selectedDate || row.date === selectedDate)
  );

  // Summary stats
  const summary = statuses.map(status => ({
    status,
    count: mockAttendance.filter(row => row.status === status).length,
  }));

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg">
            <Clock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <TypographyH2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Time Management
            </TypographyH2>
            <p className="text-muted-foreground text-sm">HR/Admin Dashboard</p>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <Card className="mb-8 border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <TypographyH3 className="text-lg font-semibold">Filters & Controls</TypographyH3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Employee</label>
              <Select value={selectedEmployee || "all"} onValueChange={(value) => setSelectedEmployee(value === "all" ? null : value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Employees" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  {employees.map(emp => <SelectItem key={emp} value={emp}>{emp}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Status</label>
              <Select value={selectedStatus || "all"} onValueChange={(value) => setSelectedStatus(value === "all" ? null : value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {statuses.map(status => <SelectItem key={status} value={status}>{status}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Date</label>
              <Input 
                type="date" 
                value={selectedDate} 
                onChange={e => setSelectedDate(e.target.value)}
                className="w-full"
              />
            </div>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white px-6">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {summary.map(s => {
          const config = statusConfig[s.status as keyof typeof statusConfig];
          const IconComponent = config.icon;
          return (
            <Card key={s.status} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{s.status}</p>
                    <p className="text-3xl font-bold text-foreground">{s.count}</p>
                  </div>
                  <div className={`p-3 rounded-full ${config.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Attendance Table */}
      <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <TypographyH3 className="text-lg font-semibold">Attendance Records</TypographyH3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Clock In</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Clock Out</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <Users className="h-8 w-8 text-muted-foreground/50" />
                        <p>No attendance records found</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => {
                    const config = statusConfig[row.status as keyof typeof statusConfig];
                    return (
                      <tr key={row.id} className="hover:bg-muted/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-muted rounded-full">
                              <User className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <span className="font-medium">{row.employee}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{row.date}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono">{row.clockIn || '-'}</td>
                        <td className="px-4 py-3 font-mono">{row.clockOut || '-'}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={config.color}>
                            {row.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <Button size="sm" variant="outline" className="hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700">
                            Adjust
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <Card className="mt-8 border-0 shadow-sm bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-full mt-0.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> This dashboard is for HR/admin use only.
              </p>
              <p className="text-xs text-amber-600 dark:text-amber-300 mt-1">
                Employees do not access this view or adjust attendance records.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
