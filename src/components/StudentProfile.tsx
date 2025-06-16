
import React, { useState } from 'react';
import { ArrowLeft, Calendar, TrendingUp, Target, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Student } from '@/pages/Index';

type StudentProfileProps = {
  student: Student;
  onBack: () => void;
};

const mockContestData = [
  { date: '2024-06-01', rating: 1500, change: +45, rank: 234, problems: 3 },
  { date: '2024-06-03', rating: 1520, change: +20, rank: 189, problems: 2 },
  { date: '2024-06-08', rating: 1547, change: +27, rank: 156, problems: 4 },
  { date: '2024-06-12', rating: 1532, change: -15, rank: 298, problems: 1 },
  { date: '2024-06-15', rating: 1547, change: +15, rank: 201, problems: 3 },
];

const mockProblemData = [
  { rating: '800-999', count: 45 },
  { rating: '1000-1199', count: 38 },
  { rating: '1200-1399', count: 25 },
  { rating: '1400-1599', count: 12 },
  { rating: '1600+', count: 6 },
];

const heatmapData = Array.from({ length: 7 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    day: day + 1,
    week: week + 1,
    count: Math.floor(Math.random() * 8),
  }))
).flat();

export const StudentProfile = ({ student, onBack }: StudentProfileProps) => {
  const [contestFilter, setContestFilter] = useState('90');
  const [problemFilter, setProblemFilter] = useState('30');

  const getRatingColor = (rating: number) => {
    if (rating >= 1900) return 'text-red-600 dark:text-red-400';
    if (rating >= 1600) return 'text-purple-600 dark:text-purple-400';
    if (rating >= 1400) return 'text-blue-600 dark:text-blue-400';
    if (rating >= 1200) return 'text-green-600 dark:text-green-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getHeatmapColor = (count: number) => {
    if (count === 0) return 'bg-slate-100 dark:bg-slate-800';
    if (count <= 2) return 'bg-green-200 dark:bg-green-900';
    if (count <= 4) return 'bg-green-400 dark:bg-green-700';
    if (count <= 6) return 'bg-green-600 dark:bg-green-500';
    return 'bg-green-800 dark:bg-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Students
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
            {student.name}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            @{student.codeforcesHandle} • {student.email}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <TrendingUp className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Current Rating</p>
              <p className={`text-xl font-bold ${getRatingColor(student.currentRating)}`}>
                {student.currentRating}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <Target className="text-purple-600 dark:text-purple-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Max Rating</p>
              <p className={`text-xl font-bold ${getRatingColor(student.maxRating)}`}>
                {student.maxRating}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Calendar className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Problems Solved</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                126
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Clock className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400">Avg/Day</p>
              <p className="text-xl font-bold text-slate-800 dark:text-slate-100">
                2.3
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Contest History
            </h3>
            <Select value={contestFilter} onValueChange={setContestFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">365 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={mockContestData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="rating" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Problems by Rating
            </h3>
            <Select value={problemFilter} onValueChange={setProblemFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockProblemData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Submission Heatmap
        </h3>
        <div className="grid grid-cols-7 gap-1 max-w-md">
          {heatmapData.map((item, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-sm ${getHeatmapColor(item.count)} transition-all duration-200 hover:scale-110`}
              title={`${item.count} submissions`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 2, 4, 6, 8].map(count => (
              <div
                key={count}
                className={`w-3 h-3 rounded-sm ${getHeatmapColor(count)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
