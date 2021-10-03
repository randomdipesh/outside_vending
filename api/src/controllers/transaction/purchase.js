const { errorResponse, successReponse } = require("../../common/responseType");
const { updateAvailableItem } = require("../../services/AvailableItems");
const { updateMachineWallet } = require("../../services/MachineWallet");
const { savePurchase, updateOnePurchase } = require("../../services/Purchase");
const {
	PurchaseValidation,
	RefundValidation,
} = require("../../validations/purchase");
const { nanoid } = require("nanoid");
const { startSession } = require("mongoose");
exports.Purchase = async (req, res) => {
	let { itemName, amountToPurchase, cashEntered } = req.body;
	// start a db transaction
	const session = await startSession();
	try {
		let validatePurchase = await PurchaseValidation({
			itemName,
			amountToPurchase,
			cashEntered,
		});
		if (validatePurchase.type === errorResponse) {
			res.json(validatePurchase);
		} else {
			//everything has been validated well
			//proceed with purchase
			let {
				data: {
					itemName,
					purchasingItemAmount,
					totalAmountToCharge,
					returnAmount,
				},
			} = validatePurchase;
			//save purchase
			let purchaseToken = nanoid(5);
			await session.startTransaction();
			await savePurchase({
				itemName,
				purchaseToken,
				itemsPurchased: purchasingItemAmount,
				totalAmount: totalAmountToCharge,
			});
			//amount to keep on wallet
			//deduct return change and keep rest
			let amountToKeepOnWallet = totalAmountToCharge - returnAmount;
			await updateMachineWallet(
				{},
				{ $inc: { amount: amountToKeepOnWallet } }
			);
			//deduct stock too
			await updateAvailableItem(
				{ itemName },
				{ $inc: { stock: -purchasingItemAmount } }
			);

			//commit the db transaction
			await session.commitTransaction();
			await session.endSession();

			res.json({
				type: successReponse,
				data: {
					returnAmount,
					amountPurchased: purchasingItemAmount,
					amountCharged: totalAmountToCharge,
					purchaseToken,
				},
			});
		}
	} catch (e) {
		await session.abortTransaction();
		await session.endSession();
		res.json({
			type: errorResponse,
			msg: e.message,
		});
	}
};

exports.Refund = async (req, res) => {
	let { purchaseToken } = req.params;
	try {
		let validateRefund = await RefundValidation({ purchaseToken });
		if (validateRefund.type === errorResponse) {
			res.json(validateRefund);
		} else {
			let { itemsPurchased, totalAmount, itemName } = validateRefund.data;

			//refund it with love, purchase token is valid.
			//increase the stock
			await updateAvailableItem(
				{ itemName },
				{ $inc: { stock: itemsPurchased } }
			);
			//decrease wallet
			await updateMachineWallet({}, { $inc: { amount: -totalAmount } });
			//update the purchase and marked it as refunded, so no double refund
			await updateOnePurchase(
				{ purchaseToken },
				{ $set: { isRefunded: true } }
			);
			res.json({
				type: successReponse,
			});
		}
	} catch (e) {
		res.json({
			type: errorResponse,
			msg: e.message,
		});
	}
};
