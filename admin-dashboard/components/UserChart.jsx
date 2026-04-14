"use client";

import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

export default function UserChart({ users }) {
	const companyCounts = users.reduce((acc, user) => {
		const companyName = user.company?.name || "Unknown";
		acc[companyName] = (acc[companyName] || 0) + 1;
		return acc;
	}, {});

	const chartData = Object.entries(companyCounts).map(([company, count]) => ({
		company,
		count,
	}));

	return (
		<div style={{ width: "100%", height: 280 }}>
			<ResponsiveContainer>
				<BarChart data={chartData}>
					<XAxis dataKey="company" hide />
					<YAxis allowDecimals={false} stroke="#9ca3af" />
					<CartesianGrid strokeDasharray="3 3" stroke="#374151" />
					<Tooltip />
					<Bar dataKey="count" fill="#60a5fa" radius={[8, 8, 0, 0]} />
				</BarChart>
			</ResponsiveContainer>
		</div>
	);
}
