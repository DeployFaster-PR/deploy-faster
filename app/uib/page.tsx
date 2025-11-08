'use client';

import React from 'react';
import {
  Home,
  Dumbbell,
  Apple,
  User as UserIcon,
  Play,
  Activity,
  ChevronLeft,
  Clock1,
} from 'lucide-react';

// Single-file React + TypeScript component for a fitness dashboard
// Usage: drop this file into your Next.js app (e.g. /components/FitnessDashboard.tsx)
// and import it in a page: import FitnessDashboard from '@/components/FitnessDashboard';

type SummaryCard = {
  id: string;
  label: string;
  value: string;
  sub?: string;
  icon?: React.ReactNode;
};

const sampleProfile = {
  name: 'Joshua',
  initials: 'JC',
  dailyProgress: 0.62, // 62%
};

const sampleSummary: SummaryCard[] = [
  {
    id: 'cal',
    label: 'Calories',
    value: '542 kcal',
    sub: 'Burned',
    icon: <Activity className="w-5 h-5" />,
  },
  {
    id: 'min',
    label: 'Workout',
    value: '42 min',
    sub: 'Today',
    icon: <Clock1 className="w-5 h-5" />,
  },
  {
    id: 'hr',
    label: 'Heart Rate',
    value: '78 bpm',
    sub: 'Avg',
    icon: <Apple className="w-5 h-5" />,
  },
  {
    id: 'steps',
    label: 'Steps',
    value: '7,120',
    sub: 'Today',
    icon: <Dumbbell className="w-5 h-5" />,
  },
];

// 7 days of sample progress data (0..100)
const weeklyData = [30, 45, 60, 55, 70, 80, 62];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function FitnessDashboard() {
  // scaled path generation for simple sparkline-style line chart
  const width = 560; // base svg width for desktop
  const height = 160;
  const padding = 12;
  const max = Math.max(...weeklyData);
  const min = Math.min(...weeklyData);
  const points = weeklyData.map((v, i) => {
    const x = (i / (weeklyData.length - 1)) * (width - padding * 2) + padding;
    // normalize to bottom->top
    const y =
      height -
      padding -
      ((v - min) / (max - min || 1)) * (height - padding * 2);
    return [x, y];
  });
  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`)
    .join(' ');

  const gradientId = 'grad-line';

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 antialiased">
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar - desktop only */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-6 space-y-6">
              <div className="p-4 rounded-2xl bg-white shadow">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-lg">
                    {sampleProfile.initials}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Welcome back</div>
                    <div className="font-semibold text-lg">
                      {sampleProfile.name}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-gray-500">Daily Goal</div>
                  <div className="w-full bg-gray-100 rounded-full h-3 mt-2 overflow-hidden">
                    <div
                      className="h-3 rounded-full"
                      style={{
                        width: `${Math.round(sampleProfile.dailyProgress * 100)}%`,
                        background: 'linear-gradient(90deg,#16a34a,#06b6d4)',
                      }}
                      aria-valuenow={Math.round(
                        sampleProfile.dailyProgress * 100
                      )}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      role="progressbar"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    {Math.round(sampleProfile.dailyProgress * 100)}% complete
                  </div>
                </div>
              </div>

              <nav className="p-4 rounded-2xl bg-white shadow space-y-1">
                <NavItem
                  label="Home"
                  icon={<Home className="w-5 h-5" />}
                  active
                />
                <NavItem
                  label="Workouts"
                  icon={<Dumbbell className="w-5 h-5" />}
                />
                <NavItem
                  label="Nutrition"
                  icon={<Apple className="w-5 h-5" />}
                />
                <NavItem
                  label="Profile"
                  icon={<UserIcon className="w-5 h-5" />}
                />
              </nav>

              <div className="p-4 rounded-2xl bg-white shadow text-sm">
                <div className="font-medium">Quick Start</div>
                <div className="mt-3 flex items-center gap-3">
                  <button className="flex-1 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-indigo-300 inline-flex items-center justify-center gap-2">
                    <Play className="w-4 h-4" />
                    Start Workout
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="lg:col-span-9">
            <div className="space-y-6">
              {/* Header - mobile shows condensed profile + start button */}
              <header className="flex items-center justify-between lg:hidden bg-white p-4 rounded-2xl shadow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                    {sampleProfile.initials}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Good morning</div>
                    <div className="font-medium">{sampleProfile.name}</div>
                  </div>
                </div>
                <button className="py-2 px-3 rounded-lg bg-indigo-600 text-white font-semibold inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <Play className="w-4 h-4" />
                  Start
                </button>
              </header>

              {/* Summary cards */}
              <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {sampleSummary.map((s) => (
                  <article
                    key={s.id}
                    className="bg-white p-4 rounded-2xl shadow flex flex-col gap-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="text-xs text-gray-500">{s.label}</div>
                      <div className="bg-gray-100 p-2 rounded-lg">{s.icon}</div>
                    </div>
                    <div className="text-lg font-semibold">{s.value}</div>
                    <div className="text-xs text-gray-400">{s.sub}</div>
                  </article>
                ))}
              </section>

              {/* Chart + details */}
              <section className="bg-white p-4 rounded-2xl shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">7-Day Activity</h3>
                    <p className="text-xs text-gray-500">
                      Workout progress this week
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    Total active:{' '}
                    <span className="font-semibold">
                      {weeklyData.reduce((a, b) => a + b, 0)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <svg
                    viewBox={`0 0 ${width} ${height}`}
                    className="w-full h-40"
                    role="img"
                    aria-label="Weekly workout progress"
                  >
                    <defs>
                      <linearGradient id={gradientId} x1="0" x2="1">
                        <stop
                          offset="0%"
                          stopColor="#06b6d4"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="#16a34a"
                          stopOpacity="0.4"
                        />
                      </linearGradient>
                      <linearGradient id="strokeGrad" x1="0" x2="1">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#16a34a" />
                      </linearGradient>
                    </defs>

                    {/* area under line */}
                    <path
                      d={`${pathD} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`}
                      fill={`url(#${gradientId})`}
                      opacity={0.6}
                    />

                    {/* grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                      <line
                        key={i}
                        x1={padding}
                        x2={width - padding}
                        y1={padding + t * (height - padding * 2)}
                        y2={padding + t * (height - padding * 2)}
                        stroke="#e6e9ee"
                        strokeWidth={1}
                      />
                    ))}

                    {/* stroke path */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="url(#strokeGrad)"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* points */}
                    {points.map((p, i) => (
                      <circle
                        key={i}
                        cx={p[0]}
                        cy={p[1]}
                        r={3.5}
                        fill="#fff"
                        stroke="#06b6d4"
                        strokeWidth={2}
                      />
                    ))}
                  </svg>

                  {/* x axis labels */}
                  <div className="mt-2 grid grid-cols-7 text-[11px] text-gray-500">
                    {days.map((d) => (
                      <div key={d} className="text-center">
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Last workout: <span className="font-medium">45 min</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Avg intensity: <span className="font-medium">Moderate</span>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <div className="bg-white p-4 rounded-2xl shadow flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-500">Ready to sweat?</div>
                  <div className="font-semibold">
                    Start a guided workout now
                  </div>
                </div>
                <button className="py-3 px-5 rounded-xl bg-indigo-600 text-white font-semibold inline-flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-indigo-300">
                  <Play className="w-4 h-4" />
                  Start Workout
                </button>
              </div>

              {/* Footer spacing for mobile nav */}
              <div className="h-24 lg:hidden" />
            </div>
          </main>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[92%] max-w-3xl bg-white rounded-2xl shadow-lg p-2 lg:hidden flex items-center justify-between">
        <MobileNavItem
          icon={<Home className="w-5 h-5" />}
          label="Home"
          active
        />
        <MobileNavItem
          icon={<Dumbbell className="w-5 h-5" />}
          label="Workouts"
        />
        <div className="-translate-y-2">
          <button className="bg-indigo-600 text-white rounded-full p-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 inline-flex items-center">
            <Play className="w-5 h-5" />
          </button>
        </div>
        <MobileNavItem icon={<Apple className="w-5 h-5" />} label="Nutrition" />
        <MobileNavItem
          icon={<UserIcon className="w-5 h-5" />}
          label="Profile"
        />
      </nav>
    </div>
  );
}

function NavItem({
  label,
  icon,
  active = false,
}: {
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full text-left py-2 px-3 rounded-lg flex items-center gap-3 ${active ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
    >
      <span className="w-6 h-6 inline-flex items-center justify-center">
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function MobileNavItem({
  icon,
  label,
  active = false,
}: {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`flex-1 py-2 px-2 rounded-lg text-center ${active ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
      aria-current={active ? 'page' : undefined}
    >
      <div className="flex items-center justify-center">{icon}</div>
      <div className="text-[10px] mt-1">{label}</div>
    </button>
  );
}
