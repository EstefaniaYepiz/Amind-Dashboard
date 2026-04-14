import styles from "../styles/StatCard.module.css";

export default function StatCard({ title, value }) {
	return (
		<div className={styles.card}>
			<p>{title}</p>
			<h3>{value}</h3>
		</div>
	);
}
