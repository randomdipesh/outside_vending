import { useState } from "react";
import Swal from "sweetalert2";
import { enterPurchaseToken, refund } from "../constants/common";
import { refundService } from "../services/service";
import {Link} from 'react-router-dom'
const Refund = () => {
	const [purchaseToken, setPurchaseToken] = useState("");
	const [refunding, setRefunding] = useState(false);
	const proceedRefund = async () => {
		if (purchaseToken !== "") {
			setRefunding(true);
			try {
				let response = await refundService(purchaseToken);
				if (response.type === "error") {
					Swal.fire("Error", response.msg, "error");
				} else {
					Swal.fire("Success", response.msg, "success");
                    setPurchaseToken("")
				}
			} catch (e) {
				Swal.fire("Error", e.message);
			}
			setRefunding(false);
		}
	};
	return (
		<>
			<div className="container">
				<div className="card">
					<div className="text-center">
						<div className="title-text">
							<strong>{refund}</strong>
						</div>
						<br />
						<br />
						<label htmlFor="purchaseToken">
							{enterPurchaseToken}
						</label>
						<br />
						<input
							type="text"
							value={purchaseToken}
							onChange={(e) => setPurchaseToken(e.target.value)}
							id="purchaseToken"
							placeholder={enterPurchaseToken}
						/>
						<br />
						<br />
						<button onClick = {proceedRefund} disabled = {refunding}>{refund}</button>

                        <br />
                        <br />
                        <Link to = "/">Go Home</Link>
					</div>
				</div>
			</div>
		</>
	);
};
export default Refund;
