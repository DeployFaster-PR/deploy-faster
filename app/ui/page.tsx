/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import {
  Home,
  Dumbbell,
  Apple,
  User,
  Activity,
  Clock,
  Heart,
  Footprints,
  TrendingUp,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const FitnessDashboard = () => {
  const [activeNav, setActiveNav] = useState('home');

  // Mock data for the chart
  const workoutData = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 50 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 65 },
  ];

  const statsCards = [
    {
      icon: Activity,
      label: 'Calories',
      value: '542',
      unit: 'kcal',
      color: 'bg-orange-500',
    },
    {
      icon: Clock,
      label: 'Workout',
      value: '65',
      unit: 'min',
      color: 'bg-blue-500',
    },
    {
      icon: Heart,
      label: 'Heart Rate',
      value: '128',
      unit: 'bpm',
      color: 'bg-red-500',
    },
    {
      icon: Footprints,
      label: 'Steps',
      value: '8,547',
      unit: 'steps',
      color: 'bg-green-500',
    },
  ];

  const navItems = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: Dumbbell, label: 'Workouts', id: 'workouts' },
    { icon: Apple, label: 'Nutrition', id: 'nutrition' },
    { icon: User, label: 'Profile', id: 'profile' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">FitTrack</span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeNav === item.id
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">
        <div className="max-w-6xl mx-auto p-4 lg:p-8">
          {/* User Profile Section */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  JD
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Welcome back, John!
                  </h1>
                  <p className="text-gray-500">Let's crush today's goals</p>
                </div>
              </div>
            </div>

            {/* Daily Goal Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">
                  Daily Goal Progress
                </span>
                <span className="font-bold text-blue-600">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                You're doing great! Just 15 more minutes to hit your goal.
              </p>
            </div>
          </div>

          {/* Stats Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {statsCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm">
                <div
                  className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}
                >
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-500">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Workout Progress Chart */}
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Weekly Progress
              </h2>
              <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+12%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="#9ca3af"
                  style={{ fontSize: '12px' }}
                />
                <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '14px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="minutes"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Start Workout CTA */}
          <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-5 px-6 rounded-2xl shadow-lg shadow-blue-500/30 transition-all duration-200 flex items-center justify-center space-x-3">
            <Dumbbell className="w-6 h-6" />
            <span className="text-lg">Start Workout</span>
          </button>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center space-y-1 transition-colors ${
                activeNav === item.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default FitnessDashboard;
