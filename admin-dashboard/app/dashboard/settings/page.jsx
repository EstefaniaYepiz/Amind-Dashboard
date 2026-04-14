import Header from "../../../components/Header";
import styles from "./settings.module.css";

export default function SettingsPage() {
	return (
		<main className={styles.page}>
			<Header title="Settings" />
			<p className={styles.subtitle}>
				Update profile preferences and dashboard settings.
			</p>

			<div className={styles.grid}>
				<section className={styles.card}>
					<h2>Profile</h2>
					<p>Name: Admin User</p>
					<p>Email: admin@example.com</p>
				</section>

				<section className={styles.card}>
					<h2>Preferences</h2>

					<label className={styles.option}>
						<input type="checkbox" defaultChecked />
						<span>Email notifications</span>
					</label>

					<label className={styles.option}>
						<input type="checkbox" defaultChecked />
						<span>Weekly activity summary</span>
					</label>

					<label className={styles.option}>
						<input type="checkbox" />
						<span>Product updates</span>
					</label>
				</section>
			</div>
		</main>
	);
}
