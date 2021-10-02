const { defaultItems } = require("../../../default_data.json");
const { successReponse } = require("../../common/responseType");
const { getAvailableItems } = require("../../services/AvailableItems");
const { getOneWallet } = require("../../services/MachineWallet");
exports.getItems = async (req, res) => {
	let items = await getAvailableItems({}, "-date -_id -__v");
	let walletAmount = await getOneWallet({}, "amount -_id");
	// for (let item of Object.values(items)){
	//     delete item.stock
	// }
	res.json({
		type: successReponse,
		data: {
			items,
            walletAmount
		},
	});
};
