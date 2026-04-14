import Link from "next/link";
import styles from "./user-details.module.css";

async function getUser(id) {
	const response = await fetch("http://localhost:3000/api/users", {
		cache: "no-store",
	});

	if (!response.ok) {
		return null;
	}

	const users = await response.json();
	return users.find((user) => String(user.id) === String(id)) || null;
}

export default async function UserDetailsPage({ params }) {
	const { id } = await params;
	const user = await getUser(id);

	if (!user) {
		return (
			<main className={styles.page}>
				<div className={styles.card}>
					<Link href="/dashboard/users" className={styles.backLink}>
						← Back to Users
					</Link>
					<h1>User not found</h1>
				</div>
			</main>
		);
	}

	return (
		<main className={styles.page}>
			<div className={styles.card}>
				<Link href="/dashboard/users" className={styles.backLink}>
					← Back to Users
				</Link>

				<h1 className={styles.title}>{user.name}</h1>

				<div className={styles.infoGrid}>
					<div className={styles.infoItem}>
						<span>Email</span>
						<strong>{user.email}</strong>
					</div>

					<div className={styles.infoItem}>
						<span>Username</span>
						<strong>{user.username}</strong>
					</div>

					<div className={styles.infoItem}>
						<span>Phone</span>
						<strong>{user.phone || "N/A"}</strong>
					</div>

					<div className={styles.infoItem}>
						<span>Website</span>
						<strong>{user.website || "N/A"}</strong>
					</div>

					<div className={styles.infoItem}>
						<span>Company</span>
						<strong>{user.company?.name || "N/A"}</strong>
					</div>

					<div className={styles.infoItem}>
						<span>City</span>
						<strong>{user.address?.city || "N/A"}</strong>
					</div>
				</div>
			</div>
		</main>
	);
}
