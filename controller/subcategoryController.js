const model = require("../models/subCategoryModel");
const asyncHandler = require("../middleware/asyncHandler");
const CompanyModel = require("../models/companyModel");
const { companyIdFind } = require("../middleware/addTime");

exports.create = asyncHandler(async (req, res, next) => {
  try {
    // const user = req.userId;
    const data = {
      ...req.body,
      photo: req.file?.filename ? req.file?.filename : "no photo.jpg",
    };
    const text = await model.create(data);
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getCompanySubCategory = asyncHandler(async (req, res) => {
  try {
    const company = await companyIdFind(req.userId);

    if (!company || company.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found" });
    }

    const subCategoryIds = company[0].SubCategory;

    if (!subCategoryIds || subCategoryIds.length === 0) {
      return res.status(200).json({ success: true, data: [] });
    }

    const subCategories = await model.find({
      _id: { $in: subCategoryIds },
    });

    return res.status(200).json({ success: true, data: subCategories });
  } catch (error) {
    console.error("Error fetching company subcategories:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
exports.update = asyncHandler(async (req, res, next) => {
  try {
    const updatedData = {
      ...req.body,
      photo: req.file?.filename,
    };
    const text = await model.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.findDelete = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.findByIdAndDelete(req.params.id, {
      new: true,
    });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.detail = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.findById(req.params.id);
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getCategorySortBySubCategory = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.find({ Category: req.params.categoryId });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.userCompanySubCategory = asyncHandler(async (req, res, next) => {
  try {
    const company = await CompanyModel.find({ createUser: req.userId });
    const categoryId = company.Category?.[0];
    console.log("company", company[0].Category[0]);
    const text = await model.find({ Category: categoryId });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const total = await model.countDocuments();
    const text = await model.find();
    return res.status(200).json({ success: true, total: total, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
