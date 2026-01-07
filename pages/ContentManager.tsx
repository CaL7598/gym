
import React, { useState } from 'react';
import { Announcement, UserRole } from '../types';
import { Plus, Trash2, Edit2, Bell, Save, AlertTriangle, X } from 'lucide-react';
import { announcementsService } from '../lib/database';
import { useToast } from '../contexts/ToastContext';
import ConfirmModal from '../components/ConfirmModal';

interface ContentManagerProps {
  announcements: Announcement[];
  setAnnouncements: any;
  role: UserRole;
}

const ContentManager: React.FC<ContentManagerProps> = ({ announcements, setAnnouncements, role }) => {
  const { showSuccess, showError } = useToast();
  
  // Announcement states
  const [showAnnModal, setShowAnnModal] = useState(false);
  const [editingAnn, setEditingAnn] = useState<Announcement | null>(null);
  const [annForm, setAnnForm] = useState({
    title: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    priority: 'low' as 'low' | 'medium' | 'high'
  });
  const [deleteAnnConfirm, setDeleteAnnConfirm] = useState<string | null>(null);

  if (role !== UserRole.SUPER_ADMIN) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mb-4">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Access Restricted</h2>
        <p className="text-slate-500 max-w-sm">Website content management is reserved for Super Administrators only. Please contact IT support if you believe this is an error.</p>
      </div>
    );
  }

  // Announcement handlers
  const handleAddAnn = () => {
    setEditingAnn(null);
    setAnnForm({
      title: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      priority: 'low'
    });
    setShowAnnModal(true);
  };

  const handleEditAnn = (ann: Announcement) => {
    setEditingAnn(ann);
    setAnnForm({
      title: ann.title,
      content: ann.content,
      date: ann.date,
      priority: ann.priority
    });
    setShowAnnModal(true);
  };

  const handleSaveAnn = async () => {
    if (!annForm.title.trim() || !annForm.content.trim()) {
      showError('Please fill in both title and content');
      return;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        if (editingAnn) {
          // Update existing
          const updated = await announcementsService.update(editingAnn.id, annForm);
          setAnnouncements(prev => prev.map(a => a.id === editingAnn.id ? updated : a));
          showSuccess('Announcement updated successfully');
        } else {
          // Create new
          const created = await announcementsService.create(annForm);
          setAnnouncements(prev => [created, ...prev]);
          showSuccess('Announcement created successfully');
        }
      } else {
        // Local state only
        if (editingAnn) {
          setAnnouncements(prev => prev.map(a => 
            a.id === editingAnn.id 
              ? { ...a, ...annForm }
              : a
          ));
          showSuccess('Announcement updated successfully');
        } else {
          const newAnn: Announcement = {
            id: Date.now().toString(),
            ...annForm
          };
          setAnnouncements(prev => [newAnn, ...prev]);
          showSuccess('Announcement created successfully');
        }
      }

      setShowAnnModal(false);
      setEditingAnn(null);
    } catch (error: any) {
      console.error('Error saving announcement:', error);
      showError(error.message || 'Failed to save announcement');
    }
  };

  const handleDeleteAnn = async (id: string) => {
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseKey) {
        await announcementsService.delete(id);
      }
      
      setAnnouncements(prev => prev.filter(a => a.id !== id));
      showSuccess('Announcement deleted successfully');
      setDeleteAnnConfirm(null);
    } catch (error: any) {
      console.error('Error deleting announcement:', error);
      showError(error.message || 'Failed to delete announcement');
      setDeleteAnnConfirm(null);
    }
  };



  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Website CMS</h2>
          <p className="text-slate-500 text-xs sm:text-sm">Update content on the public-facing website.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <button 
                onClick={handleAddAnn} 
                className="bg-rose-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold flex items-center gap-2 hover:bg-rose-700 transition-colors"
              >
                <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span>New Notice</span>
              </button>
            </div>
            {announcements.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <Bell size={48} className="mx-auto mb-4 text-slate-300" />
                <p className="text-sm">No announcements yet. Click "New Notice" to create one.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:gap-4">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3 sm:p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">{ann.title}</h4>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                          ann.priority === 'high' ? 'bg-rose-100 text-rose-700' :
                          ann.priority === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-700'
                        }`}>
                          {ann.priority}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 line-clamp-2">{ann.content}</p>
                      <p className="text-[10px] text-slate-400 mt-2">Date: {ann.date}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button 
                        onClick={() => handleEditAnn(ann)}
                        className="p-2 text-slate-400 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => setDeleteAnnConfirm(ann.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Announcement Modal */}
      {showAnnModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-2 sm:p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200 flex flex-col max-h-[95vh] sm:max-h-[90vh]">
            <div className="flex items-center justify-between p-4 border-b shrink-0">
              <h3 className="text-lg font-bold text-slate-900">
                {editingAnn ? 'Edit Announcement' : 'New Announcement'}
              </h3>
              <button
                onClick={() => {
                  setShowAnnModal(false);
                  setEditingAnn(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={annForm.title}
                  onChange={(e) => setAnnForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                  placeholder="Enter announcement title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Content *</label>
                <textarea
                  value={annForm.content}
                  onChange={(e) => setAnnForm(prev => ({ ...prev, content: e.target.value }))}
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm resize-none"
                  placeholder="Enter announcement content"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={annForm.date}
                    onChange={(e) => setAnnForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                  <select
                    value={annForm.priority}
                    onChange={(e) => setAnnForm(prev => ({ ...prev, priority: e.target.value as 'low' | 'medium' | 'high' }))}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 outline-none text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-4 border-t shrink-0">
              <button
                onClick={() => {
                  setShowAnnModal(false);
                  setEditingAnn(null);
                }}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 font-medium text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAnn}
                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors font-medium text-sm flex items-center gap-2"
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteAnnConfirm && (
        <ConfirmModal
          isOpen={true}
          title="Delete Announcement"
          message="Are you sure you want to delete this announcement? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          type="danger"
          onConfirm={() => handleDeleteAnn(deleteAnnConfirm)}
          onCancel={() => setDeleteAnnConfirm(null)}
        />
      )}
    </div>
  );
};

export default ContentManager;
