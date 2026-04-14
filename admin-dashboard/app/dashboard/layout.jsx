import Sidebar from "../../components/Sidebar";
import styles from "./dashboard-layout.module.css";

export default function DashboardLayout({ children }) {
	return (
		<div className={styles.layout}>
			<Sidebar />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
