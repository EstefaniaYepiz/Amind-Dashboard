"use client";

import { useEffect, useState } from "react";
import styles from "../styles/UserForm.module.css";

const emptyForm = {
	id: null,
	name: "",
	email: "",
	username: "",
	company: "",
	phone: "",
	website: "",
	city: "",
};

export default function UserForm({ onSubmit, initialValues, onCancel }) {
	const [formData, setFormData] = useState(emptyForm);
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (initialValues) {
			setFormData(initialValues);
		} else {
			setFormData(emptyForm);
		}

		setErrors({});
	}, [initialValues]);

	function validate() {
		const newErrors = {};

		if (!formData.name.trim()) newErrors.name = "Name is required";
		if (!formData.email.trim()) {
			newErrors.email = "Email is required";
		} else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
			newErrors.email = "Enter a valid email";
		}

		if (!formData.username.trim()) newErrors.username = "Username is required";
		if (!formData.company.trim()) newErrors.company = "Company is required";

		if (
			formData.website.trim() &&
			!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.website)
		) {
			newErrors.website = "Enter a valid website like example.com";
		}

		return newErrors;
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	function handleSubmit(e) {
		e.preventDefault();

		const validationErrors = validate();
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) return;

		onSubmit(formData);

		if (!initialValues) {
			setFormData(emptyForm);
			setErrors({});
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div>
				<input
					name="name"
					value={formData.name}
					onChange={handleChange}
					placeholder="Full name"
				/>
				{errors.name && <p className={styles.error}>{errors.name}</p>}
			</div>

			<div>
				<input
					name="email"
					type="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="Email"
				/>
				{errors.email && <p className={styles.error}>{errors.email}</p>}
			</div>

			<div>
				<input
					name="username"
					value={formData.username}
					onChange={handleChange}
					placeholder="Username"
				/>
				{errors.username && <p className={styles.error}>{errors.username}</p>}
			</div>

			<div>
				<input
					name="company"
					value={formData.company}
					onChange={handleChange}
					placeholder="Company"
				/>
				{errors.company && <p className={styles.error}>{errors.company}</p>}
			</div>

			<div>
				<input
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					placeholder="Phone"
				/>
			</div>

			<div>
				<input
					name="website"
					value={formData.website}
					onChange={handleChange}
					placeholder="Website"
				/>
				{errors.website && <p className={styles.error}>{errors.website}</p>}
			</div>

			<div>
				<input
					name="city"
					value={formData.city}
					onChange={handleChange}
					placeholder="City"
				/>
			</div>

			<div className={styles.buttons}>
				<button type="submit" className={styles.primaryBtn}>
					{initialValues ? "Update User" : "Add User"}
				</button>

				{onCancel && (
					<button
						type="button"
						className={styles.secondaryBtn}
						onClick={onCancel}
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
}
