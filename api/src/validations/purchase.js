const { isEmpty } = require("../common/helper");
const { errorResponse, successReponse } = require("../common/responseType");
const { emptyFields } = require("../constants/common");
const {
	purchaseItemDoesnotExist,
	invalidAmountToPurchase,
	invalidCashAmountEntered,
	inSufficentCash,
	machineIsOutOfChanges,
	itemIsOutOfStock,
} = require("../constants/purchase");
const { getOneAvailableItems } = require("../services/AvailableItems");
const { getOneWallet } = require("../services/MachineWallet");
const { getOnePurchase } = require("../services/Purchase");
const { purchaseDoesnotExist } = require("../constants/refund");
exports.PurchaseValidation = async ({
	itemName,
	amountToPurchase,
	cashEntered,
}) => {
	//if any fields are empty
	if (
		isEmpty(itemName) ||
		isEmpty(amountToPurchase) ||
		isEmpty(cashEntered)
	) {
		return {
			type: errorResponse,
			msg: emptyFields,
		};
	}

	//if amount of item to purchase is invalid
	else if (isNaN(amountToPurchase) || amountToPurchase < 1) {
		return {
			type: errorResponse,
			msg: invalidAmountToPurchase,
		};
	}
	//if amount of cash entered  is invalid
	else if (isNaN(cashEntered) || cashEntered < 1) {
		return {
			type: errorResponse,
			msg: invalidCashAmountEntered,
		};
	}
	// all good on bad datas
	else {
		//check details about the item
		let itemDetail = await getOneAvailableItems(
			{ itemName },
			"stock pricePerItem"
		);
		//if we don't even have the item
		if (itemDetail === null) {
			return {
				type: errorResponse,
				msg: purchaseItemDoesnotExist,
			};
		} else {
			//what amount we can purchase
			let purchasingItemAmount = amountToPurchase;
			let { stock, pricePerItem } = itemDetail;
			//if the amount we are trying to purchase is more than what we have on stock
			// sell the user everything on stock
			//purchasing item will be 0 if we don't have any item on stock
			//if we have any amount left, we sell them that, why wait for customer to enter exact amount we have on stock and not sell what we have.
			if (amountToPurchase > stock) {
				purchasingItemAmount = stock;
			}

			//calculate what's the amount we are gonna charge the user
			let totalAmountToCharge = purchasingItemAmount * pricePerItem;
			//check if amount entered by user is greater than that or not
			//if user entered lower amount, cannot proceed
			if (purchasingItemAmount < 1) {
				return {
					type: errorResponse,
					msg: itemIsOutOfStock,
				};
			}
			if (totalAmountToCharge > cashEntered) {
				return {
					type: errorResponse,
					msg: inSufficentCash,
				};
			} else {
				//cash is enough
				//check what is return amount
				let returnAmount = cashEntered - totalAmountToCharge;
				//check what we have in our wallet
				let walletDetail = await getOneWallet({}, "amount");
				let { amount } = walletDetail;
				if (returnAmount > amount) {
					//the amount we will have to return is greater than what we have currently on our wallet.

					//In this case, we can give them a coupon, why to return the customer just because we don't have enough return amount.
					//let them come next time with the coupon. Customer retention :)
					//we can add some fields to check if user wants coupon or not proceed order if we don't have coupons.

					//But, for now, let's go without coupon and reject the order, if we don't have enough changes.

					//coupon amount, if we need to create a coupn
					// let couponAmount = returnAmount - amount

					return {
						type: errorResponse,
						msg: machineIsOutOfChanges,
					};
				}
				//all fine finally.
				else {
					//do payment gateway integrations and payment validations here if needed.
					return {
						type: successReponse,
						data: {
							itemName,
							purchasingItemAmount,
							totalAmountToCharge,
							returnAmount,
						},
					};
				}
			}
		}
	}
};

exports.RefundValidation = async ({ purchaseToken }) => {
	if (isEmpty(purchaseToken)) {
		return {
			type: errorResponse,
			msg: emptyFields,
		};
	} else {
		//check if the token really exists
		let checkPurchaseToken = await getOnePurchase(
			{ $and: [{ purchaseToken }, { isRefunded: false }] },
			"itemsPurchased totalAmount itemName"
		);
		//invalid purchase token.
		if (checkPurchaseToken === null) {
			return {
				type: errorResponse,
				msg: purchaseDoesnotExist,
			};
		} else {
			return {
				type: successReponse,
				data: checkPurchaseToken,
			};
		}
	}
};
