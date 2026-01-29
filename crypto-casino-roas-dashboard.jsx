import React, { useState, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Calendar } from 'lucide-react';

const CryptoCasinoROASDashboard = () => {
  // Channel configuration
  const channels = [
    'Paid Media',
    'Gambling Streamers',
    'Sports Cappers',
    'Influencer Affiliates',
    'Traffic Affiliates'
  ];

  const countries = ['All Countries', 'USA', 'Canada', 'UK', 'Germany', 'Brazil', 'Japan'];
  const deviceTypes = ['All Devices', 'Web', 'Mobile'];
  
  // State management
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedDevice, setSelectedDevice] = useState('All Devices');
  const [selectedMetric, setSelectedMetric] = useState('Day 7');

  // Generate mock cohort data
  const generateCohortData = () => {
    const weeks = [];
    const startDate = new Date('2024-10-01');
    
    for (let i = 0; i < 12; i++) {
      const weekDate = new Date(startDate);
      weekDate.setDate(startDate.getDate() + (i * 7));
      
      const weekData = {
        week: `Week ${i + 1}`,
        date: weekDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        'Paid Media_d7': 0.8 + Math.random() * 0.6,
        'Paid Media_d30': 1.2 + Math.random() * 0.8,
        'Paid Media_d90': 1.8 + Math.random() * 1.2,
        'Paid Media_d180': 2.5 + Math.random() * 1.5,
        'Gambling Streamers_d7': 1.2 + Math.random() * 0.8,
        'Gambling Streamers_d30': 2.0 + Math.random() * 1.0,
        'Gambling Streamers_d90': 3.2 + Math.random() * 1.5,
        'Gambling Streamers_d180': 4.5 + Math.random() * 2.0,
        'Sports Cappers_d7': 0.9 + Math.random() * 0.5,
        'Sports Cappers_d30': 1.5 + Math.random() * 0.7,
        'Sports Cappers_d90': 2.3 + Math.random() * 1.0,
        'Sports Cappers_d180': 3.2 + Math.random() * 1.3,
        'Influencer Affiliates_d7': 1.0 + Math.random() * 0.7,
        'Influencer Affiliates_d30': 1.8 + Math.random() * 0.9,
        'Influencer Affiliates_d90': 2.8 + Math.random() * 1.3,
        'Influencer Affiliates_d180': 3.8 + Math.random() * 1.8,
        'Traffic Affiliates_d7': 0.6 + Math.random() * 0.4,
        'Traffic Affiliates_d30': 1.0 + Math.random() * 0.6,
        'Traffic Affiliates_d90': 1.5 + Math.random() * 0.8,
        'Traffic Affiliates_d180': 2.0 + Math.random() * 1.0,
      };
      
      weeks.push(weekData);
    }
    
    return weeks;
  };

  const cohortData = useMemo(() => generateCohortData(), []);

  // Calculate summary metrics
  const calculateSummaryMetrics = () => {
    const metrics = {};
    
    channels.forEach(channel => {
      const latestWeek = cohortData[cohortData.length - 1];
      const previousWeek = cohortData[cohortData.length - 2];
      
      metrics[channel] = {
        d7: latestWeek[`${channel}_d7`],
        d30: latestWeek[`${channel}_d30`],
        d90: latestWeek[`${channel}_d90`],
        d180: latestWeek[`${channel}_d180`],
        d7_trend: ((latestWeek[`${channel}_d7`] - previousWeek[`${channel}_d7`]) / previousWeek[`${channel}_d7`]) * 100,
        d30_trend: ((latestWeek[`${channel}_d30`] - previousWeek[`${channel}_d30`]) / previousWeek[`${channel}_d30`]) * 100,
      };
    });
    
    return metrics;
  };

  const summaryMetrics = calculateSummaryMetrics();

  // Color scheme for channels
  const channelColors = {
    'Paid Media': '#3b82f6',
    'Gambling Streamers': '#8b5cf6',
    'Sports Cappers': '#10b981',
    'Influencer Affiliates': '#f59e0b',
    'Traffic Affiliates': '#ef4444',
  };

  // Get metric suffix
  const getMetricKey = (channel, metric) => {
    const suffix = metric.replace('Day ', 'd');
    return `${channel}_${suffix}`;
  };

  // Format ROAS value
  const formatROAS = (value) => {
    return value?.toFixed(2) || '0.00';
  };

  // Format percentage
  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <DollarSign className="text-yellow-400" size={40} />
            Crypto Casino ROAS Dashboard
          </h1>
          <p className="text-purple-200">Marketing Performance & Return on Ad Spend Analytics</p>
        </div>

        {/* Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-purple-500/30">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Channel</label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>All Channels</option>
                {channels.map(channel => (
                  <option key={channel}>{channel}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Country</label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {countries.map(country => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Device Type</label>
              <select
                value={selectedDevice}
                onChange={(e) => setSelectedDevice(e.target.value)}
                className="w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {deviceTypes.map(device => (
                  <option key={device}>{device}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Time Period</label>
              <select
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option>Day 7</option>
                <option>Day 30</option>
                <option>Day 90</option>
                <option>Day 180</option>
              </select>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          {channels.map((channel) => {
            const metrics = summaryMetrics[channel];
            const d7Value = metrics.d7;
            const d7Trend = metrics.d7_trend;
            
            return (
              <div
                key={channel}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/60 transition-all cursor-pointer"
                onClick={() => setSelectedChannel(channel)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-purple-200 uppercase">{channel}</h3>
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: channelColors[channel] }}
                  />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {formatROAS(d7Value)}x
                </div>
                <div className="text-xs text-purple-300 mb-2">Day 7 ROAS</div>
                <div className={`flex items-center gap-1 text-xs ${d7Trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {d7Trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {formatPercent(d7Trend)} vs last week
                </div>
              </div>
            );
          })}
        </div>

        {/* ROAS Comparison Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Calendar className="text-purple-400" size={24} />
            ROAS Comparison by Time Period
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="px-4 py-3 text-purple-200 font-semibold">Channel</th>
                  <th className="px-4 py-3 text-purple-200 font-semibold text-center">Day 7</th>
                  <th className="px-4 py-3 text-purple-200 font-semibold text-center">Day 30</th>
                  <th className="px-4 py-3 text-purple-200 font-semibold text-center">Day 90</th>
                  <th className="px-4 py-3 text-purple-200 font-semibold text-center">Day 180</th>
                  <th className="px-4 py-3 text-purple-200 font-semibold text-center">Trend</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((channel) => {
                  const metrics = summaryMetrics[channel];
                  return (
                    <tr
                      key={channel}
                      className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: channelColors[channel] }}
                          />
                          <span className="text-white font-medium">{channel}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center text-white font-semibold">
                        {formatROAS(metrics.d7)}x
                      </td>
                      <td className="px-4 py-3 text-center text-white font-semibold">
                        {formatROAS(metrics.d30)}x
                      </td>
                      <td className="px-4 py-3 text-center text-white font-semibold">
                        {formatROAS(metrics.d90)}x
                      </td>
                      <td className="px-4 py-3 text-center text-white font-semibold">
                        {formatROAS(metrics.d180)}x
                      </td>
                      <td className="px-4 py-3">
                        <div className={`flex items-center justify-center gap-1 ${metrics.d7_trend >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {metrics.d7_trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                          <span className="font-semibold">{formatPercent(metrics.d7_trend)}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Trend Chart */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-4">
              ROAS Trend by Cohort Week
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={cohortData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="date"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'ROAS', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value) => [`${formatROAS(value)}x`, '']}
                />
                <Legend wrapperStyle={{ color: '#fff' }} />
                {(selectedChannel === 'All Channels' ? channels : [selectedChannel]).map((channel) => (
                  <Line
                    key={channel}
                    type="monotone"
                    dataKey={getMetricKey(channel, selectedMetric)}
                    stroke={channelColors[channel]}
                    strokeWidth={2}
                    name={channel}
                    dot={{ fill: channelColors[channel], r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Latest Week Performance */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30">
            <h2 className="text-xl font-bold text-white mb-4">
              Latest Week Performance ({selectedMetric})
            </h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={channels.map(channel => ({
                  channel: channel.split(' ')[0],
                  fullName: channel,
                  value: summaryMetrics[channel][selectedMetric.replace('Day ', 'd').toLowerCase()]
                }))}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis
                  dataKey="channel"
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#94a3b8"
                  style={{ fontSize: '12px' }}
                  label={{ value: 'ROAS', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #8b5cf6',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  formatter={(value, name, props) => [`${formatROAS(value)}x`, props.payload.fullName]}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                  {channels.map((channel, index) => (
                    <Cell key={`cell-${index}`} fill={channelColors[channel]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cohort Heatmap Table */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 mt-6 border border-purple-500/30">
          <h2 className="text-xl font-bold text-white mb-4">
            Cohort Performance Matrix - {selectedMetric}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-purple-500/30">
                  <th className="px-3 py-2 text-left text-purple-200 font-semibold sticky left-0 bg-slate-800">
                    Cohort Week
                  </th>
                  {channels.map(channel => (
                    <th key={channel} className="px-3 py-2 text-center text-purple-200 font-semibold text-sm">
                      {channel}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cohortData.slice().reverse().slice(0, 8).map((week, idx) => (
                  <tr key={idx} className="border-b border-purple-500/10">
                    <td className="px-3 py-2 text-white font-medium sticky left-0 bg-slate-800">
                      {week.date}
                    </td>
                    {channels.map(channel => {
                      const value = week[getMetricKey(channel, selectedMetric)];
                      const intensity = Math.min(value / 5, 1);
                      const bgColor = `rgba(139, 92, 246, ${intensity * 0.5})`;
                      
                      return (
                        <td
                          key={channel}
                          className="px-3 py-2 text-center text-white font-semibold"
                          style={{ backgroundColor: bgColor }}
                        >
                          {formatROAS(value)}x
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-purple-500/20">
          <p className="text-purple-200 text-sm">
            <strong>Active Filters:</strong> {selectedChannel} | {selectedCountry} | {selectedDevice} | {selectedMetric}
          </p>
          <p className="text-purple-300 text-xs mt-2">
            ROAS values represent revenue multiple on advertising spend. Data updated in real-time based on cohorted user behavior.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCasinoROASDashboard;
