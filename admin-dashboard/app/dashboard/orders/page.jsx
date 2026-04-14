import Header from "../../../components/Header";
import styles from "./orders.module.css";

const mockOrders = [
	{
		id: "#1001",
		customer: "Leanne Graham",
		total: "$120.00",
		status: "Completed",
	},
	{ id: "#1002", customer: "Ervin Howell", total: "$86.00", status: "Pending" },
	{
		id: "#1003",
		customer: "Clementine Bauch",
		total: "$245.00",
		status: "Completed",
	},
	{
		id: "#1004",
		customer: "Patricia Lebsack",
		total: "$64.00",
		status: "Processing",
	},
];

export default function OrdersPage() {
	return (
		<main className={styles.page}>
			<Header title="Orders" />
			<p className={styles.subtitle}>
				Track recent orders and their current status.
			</p>

			<section className={styles.card}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th>Order ID</th>
							<th>Customer</th>
							<th>Total</th>
							<th>Status</th>
						</tr>
					</thead>

					<tbody>
						{mockOrders.map((order) => (
							<tr key={order.id}>
								<td>{order.id}</td>
								<td>{order.customer}</td>
								<td>{order.total}</td>
								<td>
									<span
										className={`${styles.status} ${
											order.status === "Completed"
												? styles.completed
												: order.status === "Pending"
													? styles.pending
													: styles.processing
										}`}
									>
										{order.status}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</section>
		</main>
	);
}
