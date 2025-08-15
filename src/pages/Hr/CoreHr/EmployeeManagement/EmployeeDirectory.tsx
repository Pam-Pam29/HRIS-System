import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TypographyH2 } from '@/components/ui/typography';
import { AtomicTanstackTable } from '@/components/TanstackTable/TanstackTable';
import { ColumnDef } from '@tanstack/react-table';
import { StatCard } from '@/components/molecules/StatCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PlusCircle, Users, UserPlus, ArrowRightLeft, UserMinus } from 'lucide-react';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeProfileDrawer } from './components/EmployeeProfileDrawer';
import { EmployeeTableToolbar } from './components/EmployeeTableToolbar';
import { StatCardsRow } from './components/StatCardsRow';
import { Employee, employeeService } from './types';

// Comment out existing mock employees - now using service
// const mockEmployees: Employee[] = [
//   {
//     id: 1,
//     avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
//     name: "Jane Doe",
//     email: "jane.doe@example.com",
//     role: "Software Engineer",
//     department: "Engineering",
//     employmentType: "Full-time",
//     status: "Active",
//     dateStarted: "2022-01-15",
//     phone: "555-123-4567",
//     address: "123 Main St, Springfield",
//     location: "Lagos",
//     gender: "Female",
//     dob: "1990-05-10",
//     nationalId: "A123456789",
//     manager: "John Smith",
//     documents: [
//       { name: "Offer Letter.pdf", url: "#" },
//       { name: "ID Card.jpg", url: "#" }
//     ],
//     emergencyContact: {
//       name: "Mary Doe",
//       phone: "555-987-6543",
//       relationship: "Mother"
//     },
//     notes: "Excellent performer."
//   },
//   // ... other employees commented out
// ];

export default function EmployeeDirectory() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [showProfileDrawer, setShowProfileDrawer] = useState(false);

  // Load employees from service
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await employeeService.getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error loading employees:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employeeData: Omit<Employee, 'id'>) => {
    try {
      const newEmployee = await employeeService.createEmployee(employeeData);
      setEmployees(prev => [...prev, newEmployee]);
      setShowAddDialog(false);
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdateEmployee = async (id: string, employeeData: Partial<Employee>) => {
    try {
      const updatedEmployee = await employeeService.updateEmployee(id, employeeData);
      setEmployees(prev => prev.map(emp => emp.id === id ? updatedEmployee : emp));
      setShowProfileDrawer(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    try {
      const success = await employeeService.deleteEmployee(id);
      if (success) {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      await loadEmployees();
      return;
    }
    
    try {
      const results = await employeeService.searchEmployees(query);
      setEmployees(results);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'avatar',
      header: 'Avatar',
      cell: ({ row }) => (
        <div className="flex items-center">
          <img
            src={row.original.avatar || 'https://via.placeholder.com/40'}
            alt={row.original.name}
            className="w-10 h-10 rounded-full"
          />
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.original.name}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => row.original.email || 'N/A',
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => row.original.role,
    },
    {
      accessorKey: 'department',
      header: 'Department',
      cell: ({ row }) => row.original.department,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.original.status === 'Active' ? 'bg-green-100 text-green-800' :
          row.original.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedEmployee(row.original);
              setShowProfileDrawer(true);
            }}
          >
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDeleteEmployee(row.original.id.toString())}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="p-8 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="text-center">Loading employees...</div>
      </div>
    );
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <TypographyH2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Employee Management
            </TypographyH2>
            <p className="text-muted-foreground text-sm">Manage your workforce efficiently</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatCardsRow employees={employees} />

      {/* Actions Bar */}
      <div className="mb-8 flex justify-between items-center">
        <EmployeeTableToolbar onSearch={handleSearch} />
        <Button onClick={() => setShowAddDialog(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Employee Table */}
      <AtomicTanstackTable
        data={employees}
        columns={columns}
        searchKey="name"
        showPagination={true}
        showSearch={false}
      />

      {/* Add Employee Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Employee</DialogTitle>
          </DialogHeader>
          <EmployeeForm
            onSubmit={handleAddEmployee}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Employee Profile Drawer */}
      {selectedEmployee && (
        <EmployeeProfileDrawer
          open={showProfileDrawer}
          onClose={() => {
            setShowProfileDrawer(false);
            setSelectedEmployee(null);
          }}
          employee={selectedEmployee}
          onUpdate={handleUpdateEmployee}
        />
      )}
    </div>
  );
} 