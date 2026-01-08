// src/components/Admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { Users, BarChart3, Settings, Eye, Edit, Trash2, Download, Filter, Search } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);

  // Mock data - in real app, this would come from an API
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@kenbright.com',
      role: 'Trainee',
      joinDate: '2024-01-15',
      lastActive: '2024-03-20',
      progress: 75,
      score: 88,
      modulesCompleted: 6,
      totalModules: 8,
      status: 'active'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@kenbright.com',
      role: 'Trainee',
      joinDate: '2024-02-01',
      lastActive: '2024-03-19',
      progress: 45,
      score: 92,
      modulesCompleted: 4,
      totalModules: 8,
      status: 'active'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@kenbright.com',
      role: 'Supervisor',
      joinDate: '2024-01-10',
      lastActive: '2024-03-21',
      progress: 100,
      score: 95,
      modulesCompleted: 8,
      totalModules: 8,
      status: 'completed'
    }
  ];

  const stats = {
    totalUsers: 156,
    activeUsers: 89,
    averageScore: 84,
    completionRate: '68%'
  };

  const modules = [
    { name: 'Introduction to Actuarial Science', enrolled: 145, completion: 92, avgScore: 88 },
    { name: 'Data Quality Standards', enrolled: 132, completion: 78, avgScore: 85 },
    { name: 'Valuation Models', enrolled: 118, completion: 65, avgScore: 82 },
    { name: 'Compliance & Regulations', enrolled: 98, completion: 45, avgScore: 79 }
  ];

  const UserDetailModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">User Details</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            <p className="text-white">{user.name}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Email</label>
            <p className="text-white">{user.email}</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Progress</label>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${user.progress}%` }}
              ></div>
            </div>
            <p className="text-white text-sm">{user.progress}%</p>
          </div>
          <div>
            <label className="text-gray-400 text-sm">Score</label>
            <p className="text-white">{user.score}/100</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage users, track progress, and monitor performance</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{stats.totalUsers}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-2xl font-bold text-white">{stats.averageScore}/100</p>
              </div>
              <Settings className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completion Rate</p>
                <p className="text-2xl font-bold text-white">{stats.completionRate}</p>
              </div>
              <Download className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-6 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'users' 
                ? 'bg-gray-800 text-white border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Users Management
          </button>
          <button
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'modules' 
                ? 'bg-gray-800 text-white border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Modules Analytics
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
              activeTab === 'reports' 
                ? 'bg-gray-800 text-white border-b-2 border-blue-500' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Performance Reports
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'users' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Users Management</h2>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Progress</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Score</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-gray-700 hover:bg-gray-750">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-white">{user.name}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="w-32">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{user.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all" 
                              style={{ width: `${user.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          user.score >= 90 ? 'bg-green-500/20 text-green-400' :
                          user.score >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {user.score}/100
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-sm ${
                          user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                          user.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="p-1 text-blue-400 hover:text-blue-300 transition-colors"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-yellow-400 hover:text-yellow-300 transition-colors" title="Edit">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-400 hover:text-red-300 transition-colors" title="Delete">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Modules Analytics</h2>
            <div className="space-y-4">
              {modules.map((module, index) => (
                <div key={index} className="bg-gray-750 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-white">{module.name}</h3>
                    <span className="text-sm text-gray-400">{module.enrolled} enrolled</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Completion: </span>
                      <span className="text-white">{module.completion}%</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Avg Score: </span>
                      <span className="text-white">{module.avgScore}/100</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${module.completion}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-bold text-white mb-4">Performance Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-750 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Top Performers</h3>
                <div className="space-y-2">
                  {users.filter(u => u.score >= 90).map(user => (
                    <div key={user.id} className="flex justify-between items-center">
                      <span className="text-white">{user.name}</span>
                      <span className="text-green-400">{user.score}/100</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-750 rounded-lg p-4">
                <h3 className="font-medium text-white mb-3">Need Attention</h3>
                <div className="space-y-2">
                  {users.filter(u => u.progress < 50).map(user => (
                    <div key={user.id} className="flex justify-between items-center">
                      <span className="text-white">{user.name}</span>
                      <span className="text-red-400">{user.progress}% progress</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Detail Modal */}
        {selectedUser && (
          <UserDetailModal user={selectedUser} onClose={() => setSelectedUser(null)} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;