import { useEffect, useState } from "react";
import {
	amountOnStock,
	enterCashAmount,
	enterItemsToPurchase,
	price,
	purchase,
	refund,
	rs,
	vendingMachine,
} from "../constants/common";
import { getDataService, purchaseService } from "../services/service";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const Index = () => {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [purchasing, setPurchasing] = useState(false);
	const [itemSelected, setItemSelected] = useState("");
	const [amountToPurchase, setAmountToPurchase] = useState(1);
	const [cashEntered, setCashEntered] = useState(0);
	//initialization function
	//will load data from backend to show on vending machine
	const Init = async () => {
		try {
			let response = await getDataService();
			if (response.type === "error") {
				Swal.fire("Error", response.msg, "error");
			} else {
				setData(response.data.items);
			}
		} catch (e) {
			Swal.fire("Error", e.message, "error");
		}
		setLoading(false);
	};
	//selecting item for purchasing
	const selectItem = (itemName) => {
		setItemSelected(itemName);
	};
	const proceedPurchase = async () => {
		//don't process if data are empty
		if (
			itemSelected !== "" &&
			amountToPurchase !== "" &&
			cashEntered !== "" &&
			!isNaN(amountToPurchase) &&
			!isNaN(cashEntered)
		) {
            setPurchasing(true)
			try {
				let response = await purchaseService({
					itemName: itemSelected,
					amountToPurchase,
					cashEntered,
				});
				//if any error on purchase
				if (response.type === "error") {
					Swal.fire("Error", response.msg, "error");
				} else {
					//purhcase is done
					let {
						purchaseToken,
						amountPurchased,
						amountCharged,
						returnAmount,
					} = response.data;
					Swal.fire(
						"Purchase Success",
						`
                        Purchase successful.
                        <br/>
                        <br/>
                        Purchase Token : ${purchaseToken}
                        <br/>
                        Purchased Amount : ${amountPurchased}
                        <br/>
                        Charged Amount : ${amountCharged}
                        <br/>
                        Return Change : ${returnAmount}
                    `,
						"success"
					);
					//clean up stuffs
					setItemSelected("");
					setAmountToPurchase("");
					setCashEntered("");
                    Init()
				}
			} catch (e) {
				Swal.fire("Error", e.msg, "error");
			}
            setPurchasing(false)
		}
	};
	useEffect(() => {
		Init();
	}, []);

	return (
		<>
			<div className="container">
				<div className="card">
					<div className="title-text text-center">
						{vendingMachine}
					</div>
					<Link className="float-right" to="/refund">
						Go to {refund}
					</Link>
					<br />
					<br />
					{loading ? (
						<>Loading ....</>
					) : (
						<>
							{/* vending machine items showing part starts */}

							<div className="grid grid-3">
								{data.map(
									(
										{ itemName, pricePerItem, stock },
										index
									) => {
										return (
											<div
												key={itemName}
												onClick={() =>
													selectItem(itemName)
												}
												className={`card is-clickable ${
													itemSelected === itemName &&
													"is-active"
												}`}
											>
												{/* price */}
												<div className="text-center">
													<strong>{itemName}</strong>
													<br />
													<br />
													{price} : {rs}{" "}
													{pricePerItem}
												</div>
												{/* stock */}
												<br />
												<div className="text-center">
													{amountOnStock} : {stock}
												</div>
											</div>
										);
									}
								)}
							</div>
							{/* vending machine items showing part ends */}

							<br />
							<br />
							{/* amount and cash entering part starts */}
							{itemSelected !== "" && (
								<>
									<label htmlFor="itemsToPurchase">
										{enterItemsToPurchase}
									</label>
									<br />
									<input
										value={amountToPurchase}
										onChange={(e) =>
											setAmountToPurchase(e.target.value)
										}
										min={0}
										type="number"
										id="itemsToPurchase"
										placeholder={enterItemsToPurchase}
									/>
									<br />
									<br />
									<label htmlFor="cashAmount">
										{enterCashAmount}
									</label>
									<br />
									<input
										min={0}
										value={cashEntered}
										onChange={(e) =>
											setCashEntered(e.target.value)
										}
										type="number"
										id="cashAmount"
										placeholder={enterCashAmount}
									/>
									<br />
									<br />

									{/* amount and cash entering part ends */}

									{/* button part starts */}
									<button
										disabled={purchasing}
										onClick={proceedPurchase}
									>
										{purchase}
									</button>
									{/* button part ends */}
								</>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};
export default Index;
