const { isEmpty } = require("../common/helper");
const { errorResponse, successReponse } = require("../common/responseType");
const { emptyFields } = require("../constants/common");
const { defaultItems } = require("../../default_data.json");
const {
	purchaseItemDoesnotExist,
	invalidAmountToPurchase,
	invalidCashAmountEntered,
} = require("../constants/purchase");
exports.PurchaseValidation = ({ itemName, amountToPurchase, cashEntered }) => {
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
	//if the item to purchase exists or not
	else if (!defaultItems.filter((item) => item.itemName === itemName)) {
		return {
			type: errorResponse,
			msg: purchaseItemDoesnotExist,
		};
	}
	//if amount of item to purchase is invalid
	else if (isNaN(amountToPurchase)) {
		return {
			type: errorResponse,
			msg: invalidAmountToPurchase,
		};
	}
	//if amount of cash entered  is invalid
	else if (isNaN(cashEntered)) {
		return {
			type: errorResponse,
			msg: invalidCashAmountEntered,
		};
	}
	//all good , validated cool.
	else {
		return {
			type: successReponse,
		};
	}
};
