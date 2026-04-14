import Link from "next/link";
import styles from "../styles/Table.module.css";

export default function Table({ data, onDelete, onEdit }) {
	const showActions = Boolean(onDelete) && Boolean(onEdit);

	return (
		<div className={styles.tableWrapper}>
			<table className={styles.table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
						<th>Username</th>
						<th>Company</th>
						{showActions && <th>Actions</th>}
					</tr>
				</thead>

				<tbody>
					{data.map((user) => (
						<tr key={user.id}>
							<td>
								<Link
									href={`/dashboard/users/${user.id}`}
									className={styles.link}
								>
									{user.name}
								</Link>
							</td>
							<td>{user.email}</td>
							<td>{user.username}</td>
							<td>{user.company?.name}</td>
							{showActions && (
								<td>
									<div className={styles.actions}>
										<button
											type="button"
											className={styles.editBtn}
											onClick={() => onEdit(user)}
										>
											Edit
										</button>
										<button
											type="button"
											className={styles.deleteBtn}
											onClick={() => onDelete(user.id)}
										>
											Delete
										</button>
									</div>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
