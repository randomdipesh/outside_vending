const {defaultItems,defaultWalletAmount} = require("../../../default_data.json");
const { successReponse, errorResponse } = require("../../common/responseType");
const {
	saveAvailableItems,
	updateAvailableItem,
    getOneAvailableItems,
} = require("../../services/AvailableItems");
const {
	saveMachineWallet,
	updateMachineWallet,
    getOneWallet,
} = require("../../services/MachineWallet");
exports.SetupOrResetApp = async (req, res) => {
	try {
		for (let item of defaultItems) {
			//check if the item exists
			let { itemName } = item;
			let ifItemExists = await getOneAvailableItems({ itemName }, "_id");
			//if doesn't exit, save stuffs
			if (ifItemExists === null) {
				await saveAvailableItems(item);
			} else {
				//if exists, update it
				await updateAvailableItem({ itemName }, { $set: item });
			}
			//if wallet setup is  already or not
			let walletExists = await getOneWallet({}, "_id");
			//doesn't exist, create new
			if (walletExists === null) {
				await saveMachineWallet({
					amount: defaultWalletAmount,
				});
			} else {
				//exists, update it
				await updateMachineWallet(
					{},
					{ amount: defaultWalletAmount }
				);
			}
		}
		res.json({
			type: successReponse,
		});
	} catch (e) {
		res.json({
			type: errorResponse,
			msg: e.message,
		});
	}
};
