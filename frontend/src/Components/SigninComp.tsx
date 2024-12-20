import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../utils/lib";
import { Link, useNavigate } from "react-router-dom";

const SigninComp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("student");
	const navigate = useNavigate();

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setRole(e.target.value);
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let userKind;
		if (role === "student") userKind = "user";
		else userKind = "admin";

		const response = await axios({
			method: "POST",
			url: `${BACKEND_URL}/${userKind}/signin`,
			withCredentials: true,
			data: {
				email,
				password,
			},
		});

		if (response.status === 200) {
			if (userKind === "user") navigate("/");
			else navigate("/admin/");
		}
	};

	return (
		<form
			onSubmit={handleFormSubmit}
			className="w-1/3 px-7 py-10 flex flex-col gap-7 border shadow-xl rounded-lg bg-slate-300"
		>
			<div className="flex flex-col gap-2">
				<label htmlFor="email" className="font-medium">
					Email
				</label>
				<input
					id="email"
					placeholder="john@mail.com"
					value={email}
					onChange={handleEmailChange}
					className="py-2 px-4 border outline-none"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="pass" className="font-medium">
					Password
				</label>
				<input
					id="pass"
					placeholder="John Doe"
					type="password"
					value={password}
					onChange={handlePasswordChange}
					className="py-2 px-4 border outline-none"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label htmlFor="role" className="font-medium">
					Role
				</label>
				<select
					id="role"
					name="role"
					onChange={handleRoleChange}
					value={role}
					className="py-2 px-4 outline-none"
				>
					<option value="student">Student</option>
					<option value="creator">Creator</option>
				</select>
			</div>

			<div className="flex flex-col gap-4">
				<button
					type="submit"
					className="w-full py-2 bg-slate-400 hover:bg-slate-600 hover:text-white duration-150 font-medium rounded"
				>
					Sign in
				</button>

				<p className="text-center text-sm font-medium">
					Haven't Signed Up?{" "}
					<Link to={"/signup"} className="hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</form>
	);
};

export default SigninComp;
