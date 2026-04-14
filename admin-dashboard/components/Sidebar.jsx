"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../styles/Sidebar.module.css";

const navLinks = [
	{ href: "/dashboard", label: "Dashboard" },
	{ href: "/dashboard/users", label: "Users" },
	{ href: "/dashboard/orders", label: "Orders" },
	{ href: "/dashboard/settings", label: "Settings" },
];

export default function Sidebar() {
	const pathname = usePathname();

	return (
		<aside className={styles.sidebar}>
			<h2 className={styles.logo}>AdminPanel</h2>

			<nav className={styles.nav}>
				{navLinks.map((link) => {
					const isActive =
						pathname === link.href ||
						(link.href !== "/dashboard" && pathname.startsWith(link.href));

					return (
						<Link
							key={link.href}
							href={link.href}
							className={`${styles.link} ${isActive ? styles.active : ""}`}
						>
							{link.label}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}
