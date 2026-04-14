"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import StatCard from "../../components/StatCard";
import UserChart from "../../components/UserChart";
import Table from "../../components/Table";
import styles from "./dashboard.module.css";

const USERS_STORAGE_KEY = "dashboard_users";

export default function DashboardPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("dashboard_theme") || "light";
		setTheme(savedTheme);
		document.body.classList.toggle("dark-theme", savedTheme === "dark");
	}, []);

	useEffect(() => {
		async function loadUsers() {
			try {
				const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

				if (savedUsers) {
					setUsers(JSON.parse(savedUsers));
					return;
				}

				const response = await fetch("/api/users");
				const data = await response.json();
				setUsers(data);
				localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
			} finally {
				setLoading(false);
			}
		}

		loadUsers();
	}, []);

	const companiesCount = useMemo(() => {
		return new Set(users.map((user) => user.company?.name).filter(Boolean))
			.size;
	}, [users]);

	const previewUsers = users.slice(0, 5);

	function toggleTheme() {
		const nextTheme = theme === "light" ? "dark" : "light";
		setTheme(nextTheme);
		localStorage.setItem("dashboard_theme", nextTheme);
		document.body.classList.toggle("dark-theme", nextTheme === "dark");
	}

	return (
		<main className={styles.page}>
			<Header title="Dashboard" />

			<div className={styles.topActions}>
				<button className={styles.themeButton} onClick={toggleTheme}>
					{theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
				</button>
			</div>

			<section className={styles.cards}>
				<StatCard title="Total Users" value={users.length} />
				<StatCard title="Companies" value={companiesCount} />
				<StatCard title="Preview Rows" value={previewUsers.length} />
				<StatCard title="Pages" value="4" />
			</section>

			<section className={styles.gridSection}>
				<div className={styles.chartPanel}>
					<div className={styles.panelHeader}>
						<h2>Users by Company</h2>
					</div>
					<UserChart users={users} />
				</div>

				<div className={styles.quickPanel}>
					<div className={styles.panelHeader}>
						<h2>Quick Actions</h2>
					</div>

					<div className={styles.quickActions}>
						<Link href="/dashboard/users" className={styles.quickLink}>
							Manage Users
						</Link>
						<Link href="/dashboard/orders" className={styles.quickLink}>
							View Orders
						</Link>
						<Link href="/dashboard/settings" className={styles.quickLink}>
							Open Settings
						</Link>
					</div>
				</div>
			</section>

			<section className={styles.section}>
				<div className={styles.panelHeader}>
					<h2>Recent Users</h2>
					<Link href="/dashboard/users" className={styles.viewAll}>
						View full user management →
					</Link>
				</div>

				{loading ? <p>Loading users...</p> : <Table data={previewUsers} />}
			</section>
		</main>
	);
}
