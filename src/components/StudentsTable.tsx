
import React, { useState } from 'react';
import { Plus, Search, Download, Edit, Trash, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Student } from '@/pages/Index';

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

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.codeforcesHandle.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            Students
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage student profiles and track their progress
          </p>
        </div>
        <Button
          onClick={downloadCSV}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
        >
          <Download size={20} className="mr-2" />
          Export CSV
        </Button>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <Plus size={20} className="mr-2" />
              Add Student
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Codeforces Handle
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Current Rating
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Max Rating
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Last Updated
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600 dark:text-slate-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800 dark:text-slate-100">
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {student.email}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-500">
                      {student.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                      {student.codeforcesHandle}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${getRatingColor(student.currentRating)}`}>
                      {student.currentRating}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${getRatingColor(student.maxRating)}`}>
                      {student.maxRating}
                    </span>
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
                        className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 hover:text-red-700"
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
      </div>
    </div>
  );
};
