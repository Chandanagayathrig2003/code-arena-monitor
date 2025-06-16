
import React, { useState } from 'react';
import { Save, Clock, Mail, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const Settings = () => {
  const [cronTime, setCronTime] = useState('02:00');
  const [cronFrequency, setCronFrequency] = useState('daily');
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [inactivityDays, setInactivityDays] = useState('7');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Configure system preferences and automation settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Clock className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Data Sync Schedule
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cronTime">Sync Time</Label>
              <Input
                id="cronTime"
                type="time"
                value={cronTime}
                onChange={(e) => setCronTime(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Daily time when Codeforces data should be synced
              </p>
            </div>

            <div>
              <Label htmlFor="cronFrequency">Sync Frequency</Label>
              <Select value={cronFrequency} onValueChange={setCronFrequency}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hourly">Every Hour</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                <Save size={16} className="mr-2" />
                Save Schedule
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Mail className="text-green-600 dark:text-green-400" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
              Email Notifications
            </h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Email Reminders</Label>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Send automatic reminders to inactive students
                </p>
              </div>
              <Switch
                checked={emailEnabled}
                onCheckedChange={setEmailEnabled}
              />
            </div>

            <div>
              <Label htmlFor="inactivityDays">Inactivity Threshold (days)</Label>
              <Input
                id="inactivityDays"
                type="number"
                value={inactivityDays}
                onChange={(e) => setInactivityDays(e.target.value)}
                className="mt-1"
                min="1"
                max="30"
              />
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Send reminder after this many days of inactivity
              </p>
            </div>

            <div className="pt-4">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                <Save size={16} className="mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <Database className="text-purple-600 dark:text-purple-400" size={20} />
          </div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Data Management
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
              Database Status
            </h4>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-slate-600 dark:text-slate-400">Connected</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
              Last Sync
            </h4>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {new Date().toLocaleString()}
            </span>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
            <h4 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
              Total Records
            </h4>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              1,247 entries
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
