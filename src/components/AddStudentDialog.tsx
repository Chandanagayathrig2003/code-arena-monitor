
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Student } from '@/pages/Index';
import { Plus, User, Mail, Phone, Code } from 'lucide-react';

type AddStudentDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddStudent: (student: Omit<Student, 'id' | 'lastUpdated' | 'emailReminders'>) => void;
};

export const AddStudentDialog = ({ isOpen, onClose, onAddStudent }: AddStudentDialogProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    codeforcesHandle: '',
    currentRating: 0,
    maxRating: 0,
    reminderEnabled: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.codeforcesHandle.trim()) newErrors.codeforcesHandle = 'Codeforces handle is required';
    if (formData.currentRating < 0) newErrors.currentRating = 'Rating must be positive';
    if (formData.maxRating < formData.currentRating) newErrors.maxRating = 'Max rating must be >= current rating';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onAddStudent(formData);
      setFormData({
        name: '',
        email: '',
        phone: '',
        codeforcesHandle: '',
        currentRating: 0,
        maxRating: 0,
        reminderEnabled: true,
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md animate-scale-in">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Plus className="h-5 w-5 text-white" />
            </div>
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Add New Student
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User size={16} />
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
              placeholder="Enter student's full name"
            />
            {errors.name && <p className="text-sm text-red-500 animate-fade-in">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail size={16} />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
              placeholder="student@example.com"
            />
            {errors.email && <p className="text-sm text-red-500 animate-fade-in">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone size={16} />
              Phone Number
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
              placeholder="+1234567890"
            />
            {errors.phone && <p className="text-sm text-red-500 animate-fade-in">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="codeforcesHandle" className="flex items-center gap-2">
              <Code size={16} />
              Codeforces Handle
            </Label>
            <Input
              id="codeforcesHandle"
              value={formData.codeforcesHandle}
              onChange={(e) => handleInputChange('codeforcesHandle', e.target.value)}
              className="transition-all duration-200 focus:scale-[1.02]"
              placeholder="username"
            />
            {errors.codeforcesHandle && <p className="text-sm text-red-500 animate-fade-in">{errors.codeforcesHandle}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentRating">Current Rating</Label>
              <Input
                id="currentRating"
                type="number"
                value={formData.currentRating}
                onChange={(e) => handleInputChange('currentRating', parseInt(e.target.value) || 0)}
                className="transition-all duration-200 focus:scale-[1.02]"
                placeholder="1200"
                min="0"
              />
              {errors.currentRating && <p className="text-sm text-red-500 animate-fade-in">{errors.currentRating}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxRating">Max Rating</Label>
              <Input
                id="maxRating"
                type="number"
                value={formData.maxRating}
                onChange={(e) => handleInputChange('maxRating', parseInt(e.target.value) || 0)}
                className="transition-all duration-200 focus:scale-[1.02]"
                placeholder="1400"
                min="0"
              />
              {errors.maxRating && <p className="text-sm text-red-500 animate-fade-in">{errors.maxRating}</p>}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="hover-scale transition-all duration-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover-scale transition-all duration-200"
            >
              <Plus size={16} className="mr-2" />
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
