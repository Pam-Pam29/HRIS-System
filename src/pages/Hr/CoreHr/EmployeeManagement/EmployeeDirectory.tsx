import React, { useMemo, useState } from "react";
import type { Employee } from "./types";
import { Button } from '@/components/ui/button';
import { TypographyH2 } from '@/components/ui/typography';
import { Avatar } from '@/components/ui/avatar';
import { AtomicTanstackTable } from '@/components/TanstackTable/TanstackTable';
import { ColumnDef } from "@tanstack/react-table";
import { StatCard } from '@/components/molecules/StatCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/atoms/Select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { EmployeeForm } from './components/EmployeeForm';
import { EmployeeProfileDrawer } from './components/EmployeeProfileDrawer';
import { StatCardsRow } from './components/StatCardsRow';
import { EmployeeTableToolbar } from './components/EmployeeTableToolbar';

const mockEmployees: Employee[] = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: "Jane Doe",
    email: "jane.doe@example.com",
    role: "Software Engineer",
    department: "Engineering",
    employmentType: "Full-time",
    status: "Active",
    dateStarted: "2022-01-15",
    phone: "555-123-4567",
    address: "123 Main St, Springfield",
    location: "Lagos",
    gender: "Female",
    dob: "1990-05-10",
    nationalId: "A123456789",
    manager: "John Smith",
    documents: [
      { name: "Offer Letter.pdf", url: "#" },
      { name: "ID Card.jpg", url: "#" }
    ],
    emergencyContact: {
      name: "Mary Doe",
      phone: "555-987-6543",
      relationship: "Mother"
    },
    notes: "Excellent performer."
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: "John Smith",
    email: "john.smith@example.com",
    role: "Product Manager",
    department: "Product",
    employmentType: "Part-time",
    status: "On Leave",
    dateStarted: "2021-08-01",
    phone: "555-222-3333",
    address: "456 Oak Ave, Springfield",
    location: "Abuja",
    gender: "Male",
    dob: "1985-11-20",
    nationalId: "B987654321",
    manager: "Sarah Lee",
    documents: [
      { name: "Contract.pdf", url: "#" }
    ],
    emergencyContact: {
      name: "Anna Smith",
      phone: "555-444-5555",
      relationship: "Wife"
    },
    notes: "On paternity leave."
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: "Sarah Lee",
    email: "sarah.lee@example.com",
    role: "Designer",
    department: "Design",
    employmentType: "Contract",
    status: "Active",
    dateStarted: "2023-03-10",
    phone: "555-333-4444",
    address: "789 Pine Rd, Springfield",
    location: "Lagos",
    gender: "Female",
    dob: "1992-07-15",
    nationalId: "C456789123",
    manager: "Michael Brown",
    documents: [
      { name: "Contract.pdf", url: "#" }
    ],
    emergencyContact: {
      name: "Tom Lee",
      phone: "555-666-7777",
      relationship: "Brother"
    },
    notes: "Remote contractor."
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "HR Specialist",
    department: "HR",
    employmentType: "Full-time",
    status: "Active",
    dateStarted: "2020-05-20",
    phone: "555-555-8888",
    address: "321 Maple St, Springfield",
    location: "Port Harcourt",
    gender: "Male",
    dob: "1988-02-28",
    nationalId: "D321654987",
    manager: "Jane Doe",
    documents: [
      { name: "Offer Letter.pdf", url: "#" }
    ],
    emergencyContact: {
      name: "Lisa Brown",
      phone: "555-888-9999",
      relationship: "Wife"
    },
    notes: "Handles onboarding."
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: "Emily White",
    email: "emily.white@example.com",
    role: "QA Analyst",
    department: "Engineering",
    employmentType: "Full-time",
    status: "Terminated",
    dateStarted: "2019-09-05",
    phone: "555-777-0000",
    address: "654 Cedar Ln, Springfield",
    location: "Lagos",
    gender: "Female",
    dob: "1995-12-01",
    nationalId: "E654321789",
    manager: "Jane Doe",
    documents: [
      { name: "Termination Letter.pdf", url: "#" }
    ],
    emergencyContact: {
      name: "Paul White",
      phone: "555-111-2222",
      relationship: "Father"
    },
    notes: "Left for another opportunity."
  }
];

export default function EmployeeDirectory() {
  // Stat calculations
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(e => e.status === 'Active').length;
  const onLeave = mockEmployees.filter(e => e.status === 'On Leave').length;
  const terminated = mockEmployees.filter(e => e.status === 'Terminated').length;
  const departments = Array.from(new Set(mockEmployees.map(e => e.department))).length;

  // Filter state
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showNewEmployeeForm, setShowNewEmployeeForm] = useState(false);
  const [showExistingEmployeeForm, setShowExistingEmployeeForm] = useState(false);
  const [form, setForm] = useState({
    email: '',
    name: '',
    role: '',
    department: '',
    employmentType: '',
    offerLetter: undefined as File | undefined,
    contractLetter: undefined as File | undefined,
    dateStarted: '',
    location: '',
  });
  const [sending, setSending] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [documentsOpen, setDocumentsOpen] = useState(false);

  // Filtered employee list for the drawer
  const filteredEmployeeList = mockEmployees.filter(e =>
    e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
    (e.email && e.email.toLowerCase().includes(employeeSearch.toLowerCase()))
  );

  // Unique filter options
  const departmentOptions = Array.from(new Set(mockEmployees.map(e => e.department)));
  const employmentTypeOptions = Array.from(new Set(mockEmployees.map(e => e.employmentType)));
  const statusOptions = Array.from(new Set(mockEmployees.map(e => e.status)));
  const locationOptions = Array.from(new Set(mockEmployees.map(e => e.location).filter(Boolean)));

  const departmentOptionsList = departmentOptions.map(opt => ({ value: opt, label: opt }));
  const employmentTypeOptionsList = employmentTypeOptions.map(opt => ({ value: opt, label: opt }));
  const locationOptionsList = locationOptions.map(opt => ({ value: opt, label: opt }));

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, type: 'offerLetter' | 'contractLetter') {
    if (e.target.files && e.target.files[0]) {
      setForm(f => ({ ...f, [type]: e.target.files![0] }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setDialogOpen(false);
      setShowNewEmployeeForm(false);
      setShowExistingEmployeeForm(false);
      // Here you would send the email/invite
      alert('Invite sent to ' + form.email);
    }, 1200);
  }

  // Filtered employees
  const filteredEmployees = mockEmployees.filter(e =>
    (!departmentFilter || e.department === departmentFilter) &&
    (!employmentTypeFilter || e.employmentType === employmentTypeFilter) &&
    (!statusFilter || e.status === statusFilter) &&
    (!locationFilter || e.location === locationFilter)
  );

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        header: "Employee ID",
        accessorKey: "id",
        cell: ({ row }) => <span className="font-mono text-xs text-muted-foreground">{row.original.id}</span>,
      },
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              {row.original.avatar ? (
                <img src={row.original.avatar} alt={row.original.name} className="w-full h-full object-cover rounded-full" />
              ) : (
                <span className="text-xs font-semibold bg-muted rounded-full w-full h-full flex items-center justify-center">
                  {row.original.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </Avatar>
            <span>{row.original.name}</span>
          </div>
        ),
      },
      {
        header: "Location",
        accessorKey: "location",
      },
      {
        header: "Role",
        accessorKey: "role",
      },
      {
        header: "Department",
        accessorKey: "department",
      },
      {
        header: "Employment Type",
        accessorKey: "employmentType",
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => (
          <span className={`px-2 py-1 rounded text-xs font-medium
            ${row.original.status === 'Active' ? 'bg-green-100 text-green-800' :
              row.original.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'}`}
          >
            {row.original.status}
          </span>
        ),
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
          <Button
            size="sm"
            className="bg-violet-600 hover:bg-violet-700 text-white"
            onClick={() => {
              setSelectedEmployee(row.original);
              setProfileDrawerOpen(true);
            }}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  const onLeaveEmployees = mockEmployees.filter(e => e.status === 'On Leave');

  return (
    <div className="p-8 min-h-screen bg-background text-foreground">
      <StatCardsRow
        totalEmployees={totalEmployees}
        activeEmployees={activeEmployees}
        onLeave={onLeave}
        terminated={terminated}
        departments={departments}
        onLeaveEmployees={onLeaveEmployees}
      />
      <Dialog open={dialogOpen} onOpenChange={open => { setDialogOpen(open); if (!open) { setShowNewEmployeeForm(false); setShowExistingEmployeeForm(false); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{showNewEmployeeForm ? 'Add New Employee' : showExistingEmployeeForm ? 'Add Existing Employee' : 'Add Employee'}</DialogTitle>
          </DialogHeader>
          {(!showNewEmployeeForm && !showExistingEmployeeForm) ? (
            <div className="flex flex-col gap-4 mt-4">
              <Button
                className="w-full bg-violet-600 hover:bg-violet-700 text-white py-6 text-lg"
                onClick={() => setShowNewEmployeeForm(true)}
              >
                New Employee
              </Button>
              <Button
                className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground py-6 text-lg border border-violet-200 dark:border-violet-800"
                onClick={() => setShowExistingEmployeeForm(true)}
              >
                Existing Employee
              </Button>
            </div>
          ) : showNewEmployeeForm ? (
            <EmployeeForm
              mode="new"
              form={form}
              setForm={setForm}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              departmentOptionsList={departmentOptionsList}
              employmentTypeOptionsList={employmentTypeOptionsList}
              locationOptionsList={locationOptionsList}
              sending={sending}
            />
          ) : (
            <EmployeeForm
              mode="existing"
              form={form}
              setForm={setForm}
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              departmentOptionsList={departmentOptionsList}
              employmentTypeOptionsList={employmentTypeOptionsList}
              locationOptionsList={locationOptionsList}
              sending={sending}
            />
          )}
        </DialogContent>
      </Dialog>
      <EmployeeProfileDrawer
        open={profileDrawerOpen}
        onOpenChange={setProfileDrawerOpen}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        employeeList={filteredEmployeeList}
        employeeSearch={employeeSearch}
        setEmployeeSearch={setEmployeeSearch}
        documentsOpen={documentsOpen}
        setDocumentsOpen={setDocumentsOpen}
      />
      <div className="flex items-center justify-between mb-8">
        <TypographyH2>Employee Directory</TypographyH2>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setDialogOpen(true)}>
          Add Employee
        </Button>
      </div>
      <div className="overflow-x-auto rounded-xl shadow border border-border bg-card">
        <AtomicTanstackTable
          data={filteredEmployees}
          columns={columns}
          showGlobalFilter
          globalFilterPlaceholder="Search employees..."
          pageSizeOptions={[5, 10, 20]}
          initialPageSize={5}
          tableClassName="min-w-full divide-y divide-border"
          rowClassName={(row: { index: number }) =>
            `transition-colors ${row.index % 2 === 0 ? 'bg-muted/50' : 'bg-background'} hover:bg-violet-50 dark:hover:bg-violet-900`}
          headerClassName="bg-muted text-foreground font-semibold text-sm uppercase tracking-wide"
          filterDropdowns={
            <>
              <select
                value={departmentFilter}
                onChange={e => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="">All Departments</option>
                {departmentOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select
                value={employmentTypeFilter}
                onChange={e => setEmploymentTypeFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="">All Employee Types</option>
                {employmentTypeOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="">All Statuses</option>
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                <option value="">All Locations</option>
                {locationOptions.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </>
          }
        />
      </div>
    </div>
  );
} 