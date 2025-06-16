
import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { StudentsTable } from '@/components/StudentsTable';
import { StudentProfile } from '@/components/StudentProfile';
import { Dashboard } from '@/components/Dashboard';
import { Settings } from '@/components/Settings';
import { ThemeProvider } from '@/components/ThemeProvider';

export type Student = {
  id: string;
  name: string;
  email: string;
  phone: string;
  codeforcesHandle: string;
  currentRating: number;
  maxRating: number;
  lastUpdated: string;
  emailReminders: number;
  reminderEnabled: boolean;
};

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const renderContent = () => {
    if (selectedStudent) {
      return (
        <StudentProfile 
          student={selectedStudent} 
          onBack={() => setSelectedStudent(null)}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'students':
        return <StudentsTable onStudentSelect={setSelectedStudent} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 transition-all duration-500">
        <div className="flex h-screen">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-hidden">
            <div className="h-full overflow-y-auto p-6">
              <div className="animate-fade-in">
                {renderContent()}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
