const { useState, useMemo, createElement: h } = React;
const { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } = Recharts;

// Simple SVG Icon Components
function TrendingUp({ size = 24 }) {
    return h('svg', { 
        width: size, 
        height: size, 
        viewBox: "0 0 24 24", 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "2"
    },
        h('polyline', { points: "23 6 13.5 15.5 8.5 10.5 1 18" }),
        h('polyline', { points: "17 6 23 6 23 12" })
    );
}

function TrendingDown({ size = 24 }) {
    return h('svg', { 
        width: size, 
        height: size, 
        viewBox: "0 0 24 24", 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "2"
    },
        h('polyline', { points: "23 18 13.5 8.5 8.5 13.5 1 6" }),
        h('polyline', { points: "17 18 23 18 23 12" })
    );
}

function DollarSign({ size = 24, className = "" }) {
    return h('svg', { 
        width: size, 
        height: size, 
        viewBox: "0 0 24 24", 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "2",
        className
    },
        h('line', { x1: "12", y1: "1", x2: "12", y2: "23" }),
        h('path', { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })
    );
}

function Calendar({ size = 24, className = "" }) {
    return h('svg', { 
        width: size, 
        height: size, 
        viewBox: "0 0 24 24", 
        fill: "none", 
        stroke: "currentColor", 
        strokeWidth: "2",
        className
    },
        h('rect', { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
        h('line', { x1: "16", y1: "2", x2: "16", y2: "6" }),
        h('line', { x1: "8", y1: "2", x2: "8", y2: "6" }),
        h('line', { x1: "3", y1: "10", x2: "21", y2: "10" })
    );
}

// Main Dashboard Component
function CryptoCasinoROASDashboard() {
    const channels = [
        'Paid Media',
        'Gambling Streamers',
        'Sports Cappers',
        'Influencer Affiliates',
        'Traffic Affiliates'
    ];

    const countries = ['All Countries', 'USA', 'Canada', 'UK', 'Germany', 'Brazil', 'Japan'];
    const deviceTypes = ['All Devices', 'Web', 'Mobile'];
    
    const [selectedChannel, setSelectedChannel] = useState('All Channels');
    const [selectedCountry, setSelectedCountry] = useState('All Countries');
    const [selectedDevice, setSelectedDevice] = useState('All Devices');
    const [selectedMetric, setSelectedMetric] = useState('Day 7');

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

    const channelColors = {
        'Paid Media': '#3b82f6',
        'Gambling Streamers': '#8b5cf6',
        'Sports Cappers': '#10b981',
        'Influencer Affiliates': '#f59e0b',
        'Traffic Affiliates': '#ef4444',
    };

    const getMetricKey = (channel, metric) => {
        const suffix = metric.replace('Day ', 'd');
        return `${channel}_${suffix}`;
    };

    const formatROAS = (value) => {
        return value?.toFixed(2) || '0.00';
    };

    const formatPercent = (value) => {
        return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
    };

    return h('div', { className: "w-full min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6" },
        h('div', { className: "max-w-7xl mx-auto" },
            // Header
            h('div', { className: "mb-8" },
                h('h1', { className: "text-4xl font-bold text-white mb-2 flex items-center gap-3" },
                    h(DollarSign, { size: 40, className: "text-yellow-400" }),
                    'Crypto Casino ROAS Dashboard'
                ),
                h('p', { className: "text-purple-200" }, 'Marketing Performance & Return on Ad Spend Analytics')
            ),

            // Filters
            h('div', { className: "bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-purple-500/30" },
                h('div', { className: "grid grid-cols-1 md:grid-cols-4 gap-4" },
                    h('div', null,
                        h('label', { className: "block text-sm font-medium text-purple-200 mb-2" }, 'Channel'),
                        h('select', {
                            value: selectedChannel,
                            onChange: (e) => setSelectedChannel(e.target.value),
                            className: "w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        },
                            h('option', null, 'All Channels'),
                            ...channels.map(channel => h('option', { key: channel }, channel))
                        )
                    ),
                    h('div', null,
                        h('label', { className: "block text-sm font-medium text-purple-200 mb-2" }, 'Country'),
                        h('select', {
                            value: selectedCountry,
                            onChange: (e) => setSelectedCountry(e.target.value),
                            className: "w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        },
                            ...countries.map(country => h('option', { key: country }, country))
                        )
                    ),
                    h('div', null,
                        h('label', { className: "block text-sm font-medium text-purple-200 mb-2" }, 'Device Type'),
                        h('select', {
                            value: selectedDevice,
                            onChange: (e) => setSelectedDevice(e.target.value),
                            className: "w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        },
                            ...deviceTypes.map(device => h('option', { key: device }, device))
                        )
                    ),
                    h('div', null,
                        h('label', { className: "block text-sm font-medium text-purple-200 mb-2" }, 'Time Period'),
                        h('select', {
                            value: selectedMetric,
                            onChange: (e) => setSelectedMetric(e.target.value),
                            className: "w-full bg-slate-700 text-white border border-purple-500/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        },
                            h('option', null, 'Day 7'),
                            h('option', null, 'Day 30'),
                            h('option', null, 'Day 90'),
                            h('option', null, 'Day 180')
                        )
                    )
                )
            ),

            // Quick Stats Cards
            h('div', { className: "grid grid-cols-1 md:grid-cols-5 gap-4 mb-6" },
                ...channels.map((channel) => {
                    const metrics = summaryMetrics[channel];
                    const d7Value = metrics.d7;
                    const d7Trend = metrics.d7_trend;
                    
                    return h('div', {
                        key: channel,
                        className: "bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-purple-500/30 hover:border-purple-400/60 transition-all cursor-pointer",
                        onClick: () => setSelectedChannel(channel)
                    },
                        h('div', { className: "flex items-center justify-between mb-2" },
                            h('h3', { className: "text-xs font-semibold text-purple-200 uppercase" }, channel),
                            h('div', {
                                className: "w-3 h-3 rounded-full",
                                style: { backgroundColor: channelColors[channel] }
                            })
                        ),
                        h('div', { className: "text-2xl font-bold text-white mb-1" },
                            `${formatROAS(d7Value)}x`
                        ),
                        h('div', { className: "text-xs text-purple-300 mb-2" }, 'Day 7 ROAS'),
                        h('div', { className: `flex items-center gap-1 text-xs ${d7Trend >= 0 ? 'text-green-400' : 'text-red-400'}` },
                            d7Trend >= 0 ? h(TrendingUp, { size: 14 }) : h(TrendingDown, { size: 14 }),
                            `${formatPercent(d7Trend)} vs last week`
                        )
                    );
                })
            ),

            // ROAS Comparison Table
            h('div', { className: "bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 mb-6 border border-purple-500/30" },
                h('h2', { className: "text-xl font-bold text-white mb-4 flex items-center gap-2" },
                    h(Calendar, { size: 24, className: "text-purple-400" }),
                    'ROAS Comparison by Time Period'
                ),
                h('div', { className: "overflow-x-auto" },
                    h('table', { className: "w-full text-left" },
                        h('thead', null,
                            h('tr', { className: "border-b border-purple-500/30" },
                                h('th', { className: "px-4 py-3 text-purple-200 font-semibold" }, 'Channel'),
                                h('th', { className: "px-4 py-3 text-purple-200 font-semibold text-center" }, 'Day 7'),
                                h('th', { className: "px-4 py-3 text-purple-200 font-semibold text-center" }, 'Day 30'),
                                h('th', { className: "px-4 py-3 text-purple-200 font-semibold text-center" }, 'Day 90'),
                                h('th', { className: "px-4 py-3 text-purple-200 font-semibold text-center" }, 'Day 180'),
                                h('th', { className: "px-4 py-3 text-purple-200 font-semibold text-center" }, 'Trend')
                            )
                        ),
                        h('tbody', null,
                            ...channels.map((channel) => {
                                const metrics = summaryMetrics[channel];
                                return h('tr', {
                                    key: channel,
                                    className: "border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors"
                                },
                                    h('td', { className: "px-4 py-3" },
                                        h('div', { className: "flex items-center gap-2" },
                                            h('div', {
                                                className: "w-2 h-2 rounded-full",
                                                style: { backgroundColor: channelColors[channel] }
                                            }),
                                            h('span', { className: "text-white font-medium" }, channel)
                                        )
                                    ),
                                    h('td', { className: "px-4 py-3 text-center text-white font-semibold" },
                                        `${formatROAS(metrics.d7)}x`
                                    ),
                                    h('td', { className: "px-4 py-3 text-center text-white font-semibold" },
                                        `${formatROAS(metrics.d30)}x`
                                    ),
                                    h('td', { className: "px-4 py-3 text-center text-white font-semibold" },
                                        `${formatROAS(metrics.d90)}x`
                                    ),
                                    h('td', { className: "px-4 py-3 text-center text-white font-semibold" },
                                        `${formatROAS(metrics.d180)}x`
                                    ),
                                    h('td', { className: "px-4 py-3" },
                                        h('div', { className: `flex items-center justify-center gap-1 ${metrics.d7_trend >= 0 ? 'text-green-400' : 'text-red-400'}` },
                                            metrics.d7_trend >= 0 ? h(TrendingUp, { size: 16 }) : h(TrendingDown, { size: 16 }),
                                            h('span', { className: "font-semibold" }, formatPercent(metrics.d7_trend))
                                        )
                                    )
                                );
                            })
                        )
                    )
                )
            ),

            // Charts
            h('div', { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" },
                // Trend Chart
                h('div', { className: "bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30" },
                    h('h2', { className: "text-xl font-bold text-white mb-4" },
                        'ROAS Trend by Cohort Week'
                    ),
                    h(ResponsiveContainer, { width: "100%", height: 350 },
                        h(LineChart, { data: cohortData },
                            h(CartesianGrid, { strokeDasharray: "3 3", stroke: "#475569" }),
                            h(XAxis, {
                                dataKey: "date",
                                stroke: "#94a3b8",
                                style: { fontSize: '12px' }
                            }),
                            h(YAxis, {
                                stroke: "#94a3b8",
                                style: { fontSize: '12px' },
                                label: { value: 'ROAS', angle: -90, position: 'insideLeft', fill: '#94a3b8' }
                            }),
                            h(Tooltip, {
                                contentStyle: {
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #8b5cf6',
                                    borderRadius: '8px',
                                    color: '#fff'
                                },
                                formatter: (value) => [`${formatROAS(value)}x`, '']
                            }),
                            h(Legend, { wrapperStyle: { color: '#fff' } }),
                            ...(selectedChannel === 'All Channels' ? channels : [selectedChannel]).map((channel) =>
                                h(Line, {
                                    key: channel,
                                    type: "monotone",
                                    dataKey: getMetricKey(channel, selectedMetric),
                                    stroke: channelColors[channel],
                                    strokeWidth: 2,
                                    name: channel,
                                    dot: { fill: channelColors[channel], r: 4 },
                                    activeDot: { r: 6 }
                                })
                            )
                        )
                    )
                ),

                // Bar Chart - Latest Week Performance
                h('div', { className: "bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-purple-500/30" },
                    h('h2', { className: "text-xl font-bold text-white mb-4" },
                        `Latest Week Performance (${selectedMetric})`
                    ),
                    h(ResponsiveContainer, { width: "100%", height: 350 },
                        h(BarChart, {
                            data: channels.map(channel => ({
                                channel: channel.split(' ')[0],
                                fullName: channel,
                                value: summaryMetrics[channel][selectedMetric.replace('Day ', 'd').toLowerCase()]
                            }))
                        },
                            h(CartesianGrid, { strokeDasharray: "3 3", stroke: "#475569" }),
                            h(XAxis, {
                                dataKey: "channel",
                                stroke: "#94a3b8",
                                style: { fontSize: '12px' }
                            }),
                            h(YAxis, {
                                stroke: "#94a3b8",
                                style: { fontSize: '12px' },
                                label: { value: 'ROAS', angle: -90, position: 'insideLeft', fill: '#94a3b8' }
                            }),
                            h(Tooltip, {
                                contentStyle: {
                                    backgroundColor: '#1e293b',
                                    border: '1px solid #8b5cf6',
                                    borderRadius: '8px',
                                    color: '#fff'
                                },
                                formatter: (value, name, props) => [`${formatROAS(value)}x`, props.payload.fullName]
                            }),
                            h(Bar, { dataKey: "value", radius: [8, 8, 0, 0] },
                                ...channels.map((channel, index) =>
                                    h(Cell, { key: `cell-${index}`, fill: channelColors[channel] })
                                )
                            )
                        )
                    )
                )
            ),

            // Cohort Heatmap Table
            h('div', { className: "bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 mt-6 border border-purple-500/30" },
                h('h2', { className: "text-xl font-bold text-white mb-4" },
                    `Cohort Performance Matrix - ${selectedMetric}`
                ),
                h('div', { className: "overflow-x-auto" },
                    h('table', { className: "w-full" },
                        h('thead', null,
                            h('tr', { className: "border-b border-purple-500/30" },
                                h('th', {
                                    className: "px-3 py-2 text-left text-purple-200 font-semibold sticky left-0 bg-slate-800"
                                }, 'Cohort Week'),
                                ...channels.map(channel =>
                                    h('th', {
                                        key: channel,
                                        className: "px-3 py-2 text-center text-purple-200 font-semibold text-sm"
                                    }, channel)
                                )
                            )
                        ),
                        h('tbody', null,
                            ...cohortData.slice().reverse().slice(0, 8).map((week, idx) =>
                                h('tr', { key: idx, className: "border-b border-purple-500/10" },
                                    h('td', {
                                        className: "px-3 py-2 text-white font-medium sticky left-0 bg-slate-800"
                                    }, week.date),
                                    ...channels.map(channel => {
                                        const value = week[getMetricKey(channel, selectedMetric)];
                                        const intensity = Math.min(value / 5, 1);
                                        const bgColor = `rgba(139, 92, 246, ${intensity * 0.5})`;
                                        
                                        return h('td', {
                                            key: channel,
                                            className: "px-3 py-2 text-center text-white font-semibold",
                                            style: { backgroundColor: bgColor }
                                        }, `${formatROAS(value)}x`);
                                    })
                                )
                            )
                        )
                    )
                )
            ),

            // Footer Info
            h('div', { className: "mt-6 p-4 bg-slate-800/30 rounded-lg border border-purple-500/20" },
                h('p', { className: "text-purple-200 text-sm" },
                    h('strong', null, 'Active Filters: '),
                    `${selectedChannel} | ${selectedCountry} | ${selectedDevice} | ${selectedMetric}`
                ),
                h('p', { className: "text-purple-300 text-xs mt-2" },
                    'ROAS values represent revenue multiple on advertising spend. Data updated in real-time based on cohorted user behavior.'
                )
            )
        )
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(CryptoCasinoROASDashboard));
