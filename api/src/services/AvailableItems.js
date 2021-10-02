const AvailableItems = require("../models/Availabletems");

exports.getAvailableItems = async (condition, select = "") => {
	return await AvailableItems.find(condition, select);
};

exports.getOneAvailableItems = async (condition, select = "") => {
	return await AvailableItems.findOne(condition, select);
};
exports.saveAvailableItems = async (data) => {
	return await new AvailableItems(data).save();
};
exports.updateAvailableItem = async (condition, data) => {
	return await AvailableItems.updateOne(condition, data);
};
