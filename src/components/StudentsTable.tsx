
import React, { useState } from 'react';
import { Plus, Search, Download, Edit, Trash, Eye, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Student } from '@/pages/Index';
import { AddStudentDialog } from './AddStudentDialog';

type StudentsTableProps = {
  onStudentSelect: (student: Student) => void;
};

const mockStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    codeforcesHandle: 'johndoe123',
    currentRating: 1547,
    maxRating: 1652,
    lastUpdated: '2024-06-15 14:30:00',
    emailReminders: 2,
    reminderEnabled: true,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1234567891',
    codeforcesHandle: 'janesmith456',
    currentRating: 1823,
    maxRating: 1823,
    lastUpdated: '2024-06-15 12:15:00',
    emailReminders: 0,
    reminderEnabled: true,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1234567892',
    codeforcesHandle: 'mikej789',
    currentRating: 1234,
    maxRating: 1456,
    lastUpdated: '2024-06-14 09:45:00',
    emailReminders: 5,
    reminderEnabled: false,
  },
];

export const StudentsTable = ({ onStudentSelect }: StudentsTableProps) => {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.codeforcesHandle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'lastUpdated' | 'emailReminders'>) => {
    const newStudent: Student = {
      ...newStudentData,
      id: String(students.length + 1),
      lastUpdated: new Date().toISOString().replace('T', ' ').slice(0, 19),
      emailReminders: 0,
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Codeforces Handle', 'Current Rating', 'Max Rating', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...students.map(student => [
        student.name,
        student.email,
        student.phone,
        student.codeforcesHandle,
        student.currentRating,
        student.maxRating,
        student.lastUpdated
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 1900) return 'text-red-600 dark:text-red-400';
    if (rating >= 1600) return 'text-purple-600 dark:text-purple-400';
    if (rating >= 1400) return 'text-blue-600 dark:text-blue-400';
    if (rating >= 1200) return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                Students Management
              </h1>
              <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <TrendingUp size={16} />
                Track progress and manage competitive programming students
              </p>
            </div>
          </div>
        </div>
        <Button
          onClick={downloadCSV}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white hover-scale shadow-lg"
        >
          <Download size={20} className="mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800 hover-scale">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Students</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{students.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-xl border border-green-200 dark:border-green-800 hover-scale">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500 rounded-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Avg Rating</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                {Math.round(students.reduce((sum, s) => sum + s.currentRating, 0) / students.length)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-200 dark:border-purple-800 hover-scale">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500 rounded-lg">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Active Today</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                {students.filter(s => new Date(s.lastUpdated).toDateString() === new Date().toDateString()).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden hover-scale-102">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50/50 to-indigo-50/50 dark:from-slate-800/50 dark:to-indigo-900/50">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 transition-colors duration-200" size={20} />
              <Input
                placeholder="Search students by name, email, or handle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-slate-300 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 focus:scale-[1.02]"
              />
            </div>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover-scale shadow-lg transition-all duration-200"
            >
              <Plus size={20} className="mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Student Info
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Codeforces
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Ratings
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 cursor-pointer animate-fade-in hover-scale-102"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredRow(student.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {student.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800 dark:text-slate-100 transition-colors duration-200">
                          {student.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          ID: {student.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                        <Mail size={14} />
                        {student.email}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Phone size={14} />
                        {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full border transition-colors duration-200">
                      {student.codeforcesHandle}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Current:</span>
                        <span className={`font-bold text-sm ${getRatingColor(student.currentRating)}`}>
                          {student.currentRating}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500">Max:</span>
                        <span className={`font-bold text-sm ${getRatingColor(student.maxRating)}`}>
                          {student.maxRating}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {new Date(student.lastUpdated).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-500">
                      {new Date(student.lastUpdated).toLocaleTimeString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onStudentSelect(student)}
                        className={`hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 ${
                          hoveredRow === student.id ? 'scale-110' : ''
                        }`}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-200 ${
                          hoveredRow === student.id ? 'scale-110' : ''
                        }`}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className={`hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700 hover:border-red-300 dark:hover:border-red-600 transition-all duration-200 ${
                          hoveredRow === student.id ? 'scale-110' : ''
                        }`}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Users className="mx-auto h-12 w-12 text-slate-400 mb-4" />
            <h3 className="text-lg font-medium text-slate-600 dark:text-slate-400 mb-2">No students found</h3>
            <p className="text-slate-500 dark:text-slate-500 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by adding your first student'}
            </p>
            {!searchTerm && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover-scale"
              >
                <Plus size={16} className="mr-2" />
                Add First Student
              </Button>
            )}
          </div>
        )}
      </div>

      <AddStudentDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onAddStudent={handleAddStudent}
      />
    </div>
  );
};
