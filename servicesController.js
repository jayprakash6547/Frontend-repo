const { catchAsyncErros } = require("../middlewares/catchAsyncErrors");
const addOnServiceModel = require("../models/addOnsServices");
const consultingServiceModel = require("../models/consultingServices");
const serviceModel = require("../models/services");

// -------------------------------------------- Read All Internship -------------------------------------

// This function sends a JSON response with a message indicating that the Service Home Page was reached.

exports.serviceHomePage = catchAsyncErros(async (req, res, next) => {
  res.json({ message: "Service Page" });
});


// -------------------------------------------- Add Service ----------------------------------------------

// This function adds a new service along with its associated add-ons.
// It takes a JSON object 'service' and an array of add-on objects 'addOns' as input,
// creates new documents for the service and each add-on, and links them together.

exports.addService = catchAsyncErros(async (req, res, next) => {
  const { service, addOns, consulting } = req.body;

  const addedService = await new serviceModel(service).save();

  const addOnPromises = addOns.map(async (element) => {
    const addedAddOn = new addOnServiceModel(element);

    addedService.addOns.push(addedAddOn._id);

    addedAddOn.serviceId = addedService._id;

    await addedAddOn.save();

    return addedAddOn;
  });

  const consultingPromises = consulting.map(async (element) => {
    const addedConsulting = new consultingServiceModel(element);

    addedService.addOns.push(addedConsulting._id);

    addedConsulting.serviceId = addedService._id;

    await addedConsulting.save();

    return addedConsulting;
  });

  await Promise.all(addOnPromises);
  await Promise.all(consultingPromises);

  await addedService.save();

  res.status(200).json({ message: "Service, Addons, Consulting Service added successfully", addedService });
});


// -------------------------------------------- Show Specific Service ----------------------------------------------

// This function retrieves a specific service along with its associated add-ons.
// It takes a service ID as input and sends a JSON response with the service object.

exports.showService = catchAsyncErros(async (req, res, next) => {

  const id = req.params.id;
  const service = await serviceModel.findById(id).populate("addOns").populate("consulting");

  res.status(201).json({ message: "The Required Service", service });
});


// -------------------------------------------- Show All Specific Service ----------------------------------------------

// This function retrieves all services along with their associated add-ons.
// It sends a JSON response with an array of service objects.
exports.showAllService = catchAsyncErros(async (req, res, next) => {

  const services = await serviceModel.find().populate("addOns").populate("consulting");

  res.status(201).json({ message: "All Services", services });
});


// -------------------------------------------- Update Specific Service ----------------------------------------------

// This function updates an existing service along with its associated add-ons.
// It takes a service ID and a JSON object 'service' as input, updates the service document,
// and updates each associated add-on document if necessary.
exports.updateService = catchAsyncErros(async (req, res, next) => {

  const id = req.params.id;
  const { service, addOns, consulting } = req.body;

  const updatedService = await serviceModel.findByIdAndUpdate(id, service);

  const addOnPromises = addOns.map(async (element, index) => {
    const updatedAddOn = await addOnServiceModel.findByIdAndUpdate(updatedService.addOns[index], element);

    await updatedAddOn.save();

    return updatedAddOn;
  });

  const consultingPromises = consulting.map(async (element, index) => {
    const updatedConsulting = await consultingServiceModel.findByIdAndUpdate(updatedService.consulting[index], element);

    await updatedConsulting.save();
    return updatedConsulting;
  });

  await Promise.all(addOnPromises);
  await Promise.all(consultingPromises);

  await updatedService.save();

  res.status(201).json({ message: "Updated Service Successfully", updatedService });
});


// -------------------------------------------- Delete Specific Service ----------------------------------------------

// This function deletes a service along with its associated add-ons.
// It takes a service ID as input and sends a JSON response with the deleted service object.

exports.deleteService = catchAsyncErros(async (req, res, next) => {

  const id = req.params.id;

  const service = await serviceModel.findByIdAndDelete(id);

  const addOnPromises = service.addOns.map(async (element, index) => {

    const addedAddOn = await addOnServiceModel.findByIdAndDelete(element);
    return addedAddOn;
  });

  const consultingPromises = service.consulting.map(async (element, index) => {

    const deletedConsulting = await addOnServiceModel.findByIdAndDelete(element);
    return deletedConsulting;
  });


  await Promise.all(addOnPromises);
  await Promise.all(consultingPromises);


  res.status(201).json({ message: "Deleted Service Successfully", service });
});

