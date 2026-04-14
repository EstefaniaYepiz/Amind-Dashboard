"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Table from "../../../components/Table";
import UserForm from "../../../components/UserForm";
import styles from "./users.module.css";

const USERS_STORAGE_KEY = "dashboard_users";
const USERS_PER_PAGE = 5;

export default function UsersPage() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedCompany, setSelectedCompany] = useState("All");
	const [sortBy, setSortBy] = useState("name-asc");
	const [editingUser, setEditingUser] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		async function loadUsers() {
			try {
				setLoading(true);
				setError("");

				const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

				if (savedUsers) {
					setUsers(JSON.parse(savedUsers));
					return;
				}

				const response = await fetch("/api/users");

				if (!response.ok) {
					throw new Error("Failed to fetch users");
				}

				const data = await response.json();
				setUsers(data);
				localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(data));
			} catch (err) {
				setError(err.message || "Something went wrong");
			} finally {
				setLoading(false);
			}
		}

		loadUsers();
	}, []);

	useEffect(() => {
		if (users.length > 0) {
			localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
		}
	}, [users]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, selectedCompany, sortBy]);

	const companies = useMemo(() => {
		const uniqueCompanies = users
			.map((user) => user.company?.name)
			.filter(Boolean);

		return ["All", ...new Set(uniqueCompanies)];
	}, [users]);

	const filteredUsers = useMemo(() => {
		const term = searchTerm.toLowerCase();

		const filtered = users.filter((user) => {
			const matchesSearch =
				user.name.toLowerCase().includes(term) ||
				user.email.toLowerCase().includes(term) ||
				user.username.toLowerCase().includes(term) ||
				user.company?.name?.toLowerCase().includes(term);

			const matchesCompany =
				selectedCompany === "All" || user.company?.name === selectedCompany;

			return matchesSearch && matchesCompany;
		});

		return [...filtered].sort((a, b) => {
			switch (sortBy) {
				case "name-asc":
					return a.name.localeCompare(b.name);
				case "name-desc":
					return b.name.localeCompare(a.name);
				case "email-asc":
					return a.email.localeCompare(b.email);
				case "email-desc":
					return b.email.localeCompare(a.email);
				case "company-asc":
					return (a.company?.name || "").localeCompare(b.company?.name || "");
				case "company-desc":
					return (b.company?.name || "").localeCompare(a.company?.name || "");
				default:
					return 0;
			}
		});
	}, [users, searchTerm, selectedCompany, sortBy]);

	const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
	const paginatedUsers = filteredUsers.slice(
		(currentPage - 1) * USERS_PER_PAGE,
		currentPage * USERS_PER_PAGE,
	);

	function handleAddUser(newUser) {
		const createdUser = {
			id: Date.now(),
			name: newUser.name,
			email: newUser.email,
			username: newUser.username,
			company: { name: newUser.company },
			phone: newUser.phone,
			website: newUser.website,
			address: { city: newUser.city || "Unknown" },
		};

		setUsers((prevUsers) => [createdUser, ...prevUsers]);
	}

	function handleDeleteUser(userId) {
		const confirmed = window.confirm(
			"Are you sure you want to delete this user?",
		);

		if (!confirmed) return;

		setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

		if (editingUser?.id === userId) {
			setEditingUser(null);
		}
	}

	function handleStartEdit(user) {
		setEditingUser(user);
	}

	function handleUpdateUser(updatedUser) {
		setUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.id === updatedUser.id
					? {
							...user,
							name: updatedUser.name,
							email: updatedUser.email,
							username: updatedUser.username,
							company: { name: updatedUser.company },
							phone: updatedUser.phone,
							website: updatedUser.website,
							address: {
								city: updatedUser.city || user.address?.city || "Unknown",
							},
						}
					: user,
			),
		);

		setEditingUser(null);
	}

	function handleCancelEdit() {
		setEditingUser(null);
	}

	return (
		<main className={styles.page}>
			<Header title="Users" />

			<div className={styles.layout}>
				<section className={styles.formPanel}>
					<h2>{editingUser ? "Edit User" : "Add User"}</h2>

					<UserForm
						onSubmit={editingUser ? handleUpdateUser : handleAddUser}
						initialValues={
							editingUser
								? {
										id: editingUser.id,
										name: editingUser.name,
										email: editingUser.email,
										username: editingUser.username,
										company: editingUser.company?.name || "",
										phone: editingUser.phone || "",
										website: editingUser.website || "",
										city: editingUser.address?.city || "",
									}
								: null
						}
						onCancel={editingUser ? handleCancelEdit : null}
					/>
				</section>

				<section className={styles.tablePanel}>
					<div className={styles.sectionHeader}>
						<h2>User Management</h2>

						<div className={styles.controls}>
							<input
								type="text"
								placeholder="Search by name, email, username, or company..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className={styles.searchInput}
							/>

							<select
								value={selectedCompany}
								onChange={(e) => setSelectedCompany(e.target.value)}
								className={styles.selectInput}
							>
								{companies.map((company) => (
									<option key={company} value={company}>
										{company}
									</option>
								))}
							</select>

							<select
								value={sortBy}
								onChange={(e) => setSortBy(e.target.value)}
								className={styles.selectInput}
							>
								<option value="name-asc">Name A–Z</option>
								<option value="name-desc">Name Z–A</option>
								<option value="email-asc">Email A–Z</option>
								<option value="email-desc">Email Z–A</option>
								<option value="company-asc">Company A–Z</option>
								<option value="company-desc">Company Z–A</option>
							</select>
						</div>
					</div>

					{loading && <p>Loading users...</p>}
					{error && <p className={styles.error}>{error}</p>}
					{!loading && !error && filteredUsers.length === 0 && (
						<p>No users found.</p>
					)}

					{!loading && !error && filteredUsers.length > 0 && (
						<>
							<Table
								data={paginatedUsers}
								onDelete={handleDeleteUser}
								onEdit={handleStartEdit}
							/>

							<div className={styles.pagination}>
								<button
									className={styles.pageButton}
									onClick={() =>
										setCurrentPage((prev) => Math.max(prev - 1, 1))
									}
									disabled={currentPage === 1}
								>
									Previous
								</button>

								<span className={styles.pageInfo}>
									Page {currentPage} of {totalPages || 1}
								</span>

								<button
									className={styles.pageButton}
									onClick={() =>
										setCurrentPage((prev) => Math.min(prev + 1, totalPages))
									}
									disabled={currentPage === totalPages || totalPages === 0}
								>
									Next
								</button>
							</div>
						</>
					)}
				</section>
			</div>
		</main>
	);
}
