// ----------------------------------------
// Math Helper Functions
// ----------------------------------------

const round = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};

// ----------------------------------------
// Unit Conversions
// ----------------------------------------

const data = {
  0: {
    amount: 71,
    unit: "in",
    type: "imperial",
  },
  1: {
    amount: 5,
    unit: "lb",
    type: "imperial",
  },
  2: {
    amount: 185,
    unit: "cm",
    type: "metric",
  },
};

// Imperial -> Imperial
// 1 ft -> 12 in
// 1 st -> 14 lb

// Metric -> Metric
// 1 m -> 100 cm

// Imperial -> Metric
// 1 in -> 2.54 cm
// 1 lb -> 0.45359237 kg

const converter = {
  imperialToMetric: {
    in: (val) => val * 2.54,
    lb: (val) => val * 0.45359237,
    labels: {
      in: "cm",
      lb: "kg",
    },
  },
  metricToImperial: {
    cm: (val) => val / 2.54,
    kg: (val) => val * 2.2046226218488,
    labels: {
      cm: "in",
      kg: "lb",
    },
  },
};

const result = Object.values(data).map(({ amount, type, unit }) =>
  type === "imperial"
    ? {
        amount: converter.imperialToMetric[unit](amount),
        unit: converter.imperialToMetric.labels[unit],
        type: "metric",
      }
    : {
        amount: converter.metricToImperial[unit](amount),
        unit: converter.metricToImperial.labels[unit],
        type: "imperial",
      }
);

/* console.log(result); */

const lengthUnits = {
  cm: 1e-2, // 1 cm = 0.01 m
  m: 1, // 1 m = 1 m
  in: 0.0254, // 1 in = 0.0254 m
  ft: 0.3048, // 1 ft = 0.3048 m
};

// Function to convert length from one unit to another
const convertLength = (value, from, to) => {
  // Check if the from unit and to unit exist in the lengthUnits object
  if (!lengthUnits[from] || !lengthUnits[to]) {
    throw new Error("Invalid length units");
  }
  // Calculate the conversion factor by dividing the conversion factor of the 'from' unit by the conversion factor of the 'to' unit
  const conversionFactor = lengthUnits[from] / lengthUnits[to];
  // Multiply the input value by the conversion factor to get the converted value
  return value * conversionFactor;
};

/* console.log(convertLength(185, "cm", "m"));
console.log(convertLength(185, "cm", "ft"));
console.log(convertLength(185, "cm", "in"));
console.log(convertLength(71, "in", "cm"));
 */

const massUnits = {
  g: 1, // 1 g = 1 g
  kg: 1000, // 1 kg = 1000 g
  lb: 453.592, // 1 lb = 453.592 g
  st: 6350.29, // 1 st = 6350.29 g
};

// Function to convert mass from one unit to another
const convertMass = (value, from, to) => {
  // Check if the from unit and to unit exist in the lengthUnits object
  if (!massUnits[from] || !massUnits[to]) {
    throw new Error("Invalid mass units");
  }
  // Calculate the conversion factor by dividing the conversion factor of the 'from' unit by the conversion factor of the 'to' unit
  const conversionFactor = massUnits[from] / massUnits[to];
  // Multiply the input value by the conversion factor to get the converted value
  return value * conversionFactor;
};

//console.log(convertMass(71, "kg", "lb"));

const convertInToFtAndIn = (value) => {
  return { ft: Math.floor(value / 12), in: value % 12 };
};

const convertLbsToStAndLbs = (value) => {
  return { st: Math.floor(value / 14), lb: value % 14 };
};

/* console.log(convertInToFtAndIn(66));
console.log(convertLbsToStAndLbs(120));
 */

// ----------------------------------------
// BMI Calculations
// ----------------------------------------

const calculateBMI = (heightInM, weightInKg) => {
  console.log(`Height: ${heightInM}m / Weight: ${weightInKg}kg`);
  return round(weightInKg / Math.pow(heightInM, 2), 1);
};

// https://my.clevelandclinic.org/health/articles/9464-body-mass-index-bmi
const bmiClassifications = [
  { label: "Underweight", min: 0, max: 18.5, description: "underweight" },
  {
    label: "Healthy Weight",
    min: 18.5,
    max: 24.9,
    description: "a healthy weight",
  },
  { label: "Overweight", min: 25.0, max: 29.9, description: "overweight" },
  { label: "Obesity", min: 30.0, max: null, description: "obese" },
];

const getBMIClassification = (bmiScore) => {
  return bmiClassifications.find(
    (classification) => !classification.max || bmiScore < classification.max
  ).description;
};

const calculateWeightInKg = (bmiScore, heightInM) => {
  // bmiScore = weightInKg / Math.pow(heightInM, 2);
  return round(bmiScore * Math.pow(heightInM, 2), 2);
};

const calculateIdealWeightRangeInKg = (heightInM) => {
  // get weight for given height + BMI of 18.5
  // get weight for given height + BMI of 24.9
  return {
    min: { value: calculateWeightInKg(18.5, heightInM), unit: "kg" },
    max: { value: calculateWeightInKg(24.9, heightInM), unit: "kg" },
  };
};

// ----------------------------------------
// HTML elements to save
// ----------------------------------------

// Inputs

const bmiCalculatorForm = document.getElementById("bmi-calculator__inputs");

const bmiInputCm = document.getElementById("height-cm");
const bmiInputFt = document.getElementById("height-ft");
const bmiInputIn = document.getElementById("height-in");

const bmiInputKg = document.getElementById("weight-kg");
const bmiInputSt = document.getElementById("weight-st");
const bmiInputLb = document.getElementById("weight-lb");

const numericInputElements = document.querySelectorAll(
  "input[type=text].input-numeric"
);

// Results

const bmiInstructions = document.getElementById("bmi-calculator__instructions");
const bmiValidResults = document.getElementById("bmi-calculator__results");

const bmiScore = document.getElementById("results__bmi-score");
const bmiAddOn = document.getElementById("results__bmi-addon");

// ----------------------------------------
// Form Validation
// ----------------------------------------

// Input error messages for this specific form
const errorMessages = {
  "height-cm": {
    valueMissing: "Enter your height",
    patternMismatch: "Enter a positive number",
  },
  "weight-kg": {
    valueMissing: "Enter your weight",
    patternMismatch: "Enter a positive number",
  },
};

const resetForm = (form) => {
  // Call built-in reset function
  form.reset();

  // Reset error messages
  clearFormErrors(form);

  // Blur the focus?
  form.blur();
};

const clearFormErrors = (form) => {
  // Remove error states from all inputs
  Array.from(form.elements)
    .filter((input) => input.name !== "")
    .forEach((input) => {
      clearInputError(input);
    });
};

// For individual input elements

const identifyInputError = (input) => {
  //console.log(input.validity);
  for (var key in input.validity) {
    if (input.validity[key]) {
      return key;
    }
  }
};

const renderInputError = (input, messages) => {
  // Add "error" class to the input element itself
  input.classList.add("input-error");

  // Find the appropriate error message
  var errorMessage = "Error";

  if (messages) {
    const errorType = identifyInputError(input);
    //console.log(`Error (${input.id}): ${errorType}`);
    if (input.validity[errorType]) errorMessage = messages[errorType];
  }

  // Find the error element associated with this input element
  const errorElement = document.getElementById(`${input.name}-error`);
  if (errorElement) {
    // Set error element's text content to be the error message
    errorElement.textContent = errorMessage;
    // Unhide the error element
    errorElement.classList.remove("hidden");
  }
};

const clearInputError = (input) => {
  // Remove error class from the input element itself
  input.classList.remove("input-error");
  // Hide the error message element
  const errorElement = document.getElementById(`${input.name}-error`);
  if (errorElement) {
    errorElement.classList.add("hidden");
    errorElement.textContent = "";
  }
};

const renderFormErrors = (form, messages) => {
  // Check each input and show errors as needed
  // Loop through each of the inputs and check for validity
  Array.from(form.elements)
    .filter((input) => input.name !== "")
    .forEach((input) => {
      input.checkValidity()
        ? clearInputError(input)
        : renderInputError(input, messages[input.name]);
    });
};

const renderFormSuccess = (form) => {
  clearFormErrors(form);

  // Render the success state
  console.log("Success! BMI calculator form validated");

  // Calculate and render the BMI results

  let bmiResults = {
    height: { value: convertLength(bmiInputCm.value, "cm", "m"), unit: "m" },
    weight: { value: bmiInputKg.value, unit: "kg" },
    score: null,
    classification: "a healthy weight",
    idealWeightRange: {
      min: { value: 63.3, unit: "kg" },
      max: { value: 85.2, unit: "kg" },
    },
  };

  bmiResults.score = calculateBMI(
    bmiResults.height.value,
    bmiResults.weight.value
  );
  bmiResults.classification = getBMIClassification(bmiResults.score);
  bmiResults.idealWeightRange = calculateIdealWeightRangeInKg(
    bmiResults.height.value
  );

  console.log(
    `{ height: ${bmiResults.height.value}${bmiResults.height.unit}, weight: ${bmiResults.weight.value}${bmiResults.weight.unit} } = ${bmiResults.score}`
  );

  renderResultsHTML(bmiResults);
  //clearResultsHTML();
};

// ----------------------------------------
// HTML rendering functions
// ----------------------------------------

const clearResultsHTML = () => {
  bmiScore.textContent = "-";
  bmiAddOn.innerHTML = "Your BMI suggests...";

  bmiInstructions.classList.remove("hidden");
  bmiValidResults.classList.add("hidden");
};

const renderResultsHTML = (results) => {
  if (!results) {
    console.error("Invalid results object");
    return;
  }

  bmiScore.textContent = results.score.toFixed(1);
  bmiAddOn.innerHTML = `Your BMI suggests you're ${
    results.classification
  }. Your ideal weight is between <strong>${results.idealWeightRange.min.value.toFixed(
    1
  )}${
    results.idealWeightRange.min.unit
  }s - ${results.idealWeightRange.max.value.toFixed(1)}${
    results.idealWeightRange.max.unit
  }s</strong> (${convertMass(
    results.idealWeightRange.min.value,
    results.idealWeightRange.min.unit,
    "lb"
  ).toFixed(0)}lbs - ${convertMass(
    results.idealWeightRange.max.value,
    results.idealWeightRange.max.unit,
    "lb"
  ).toFixed(0)}lbs).`;

  bmiInstructions.classList.add("hidden");
  bmiValidResults.classList.remove("hidden");
};

const updateOtherInputs = (changedInput) => {
  // Check if a valid input
  if (!changedInput.checkValidity()) {
    console.log("not valid input, so don't change others");
    return;
  }

  // If is a valid input, then update the other inputs
  if (changedInput.id === "height-cm") {
    // cm changed -> update ft and in
    // convert cm to total in
    const valueCmAsIn = convertLength(Number(changedInput.value), "cm", "in");
    // convert total in to ft and in
    const valueAsFtAndIn = convertInToFtAndIn(valueCmAsIn);
    // updte the inputs (ft + in)
    bmiInputFt.value = round(valueAsFtAndIn.ft, 1);
    bmiInputIn.value = round(valueAsFtAndIn.in, 1);
  } else if (
    changedInput.id === "height-ft" ||
    changedInput.id === "height-in"
  ) {
    // in or ft changed -> update cm (only)
    // add up the current ft + in to get total in
    const valueTotalIn =
      Number(bmiInputFt.value) * 12 + Number(bmiInputIn.value);
    // convert total in to cm
    const valueTotalInAsCm = convertLength(valueTotalIn, "in", "cm");
    // updte the inputs (cm only)
    bmiInputCm.value = round(valueTotalInAsCm, 0);
  } else if (changedInput.id === "weight-kg") {
    // kg changed -> update st and lb
    // convert kg to total lb
    const valueKgAsLb = convertMass(Number(changedInput.value), "kg", "lb");
    // convert total lb to st and lb
    const valueAsStAndLbs = convertLbsToStAndLbs(valueKgAsLb);
    // updte the inputs (st + lb)
    bmiInputSt.value = round(valueAsStAndLbs.st, 1);
    bmiInputLb.value = round(valueAsStAndLbs.lb, 1);
  } else if (
    changedInput.id === "weight-st" ||
    changedInput.id === "weight-lb"
  ) {
    // st or lb changed -> update kg (only)
    // add up the current ft + in to get total in
    const valueTotalLbs =
      Number(bmiInputSt.value) * 14 + Number(bmiInputLb.value);
    // convert total in to cm
    const valueTotalLbAsKg = convertMass(valueTotalLbs, "lb", "kg");
    // updte the inputs (cm only)
    bmiInputKg.value = round(valueTotalLbAsKg, 0);
  } else {
    console.error("Unknown input:", changedInput.id);
  }
};

// ----------------------------------------
// Event Listener Functions
// ----------------------------------------

const handleFormSubmit = (e) => {
  //console.log("Form submitted");
  e.preventDefault();
  e.target.checkValidity()
    ? renderFormSuccess(e.target)
    : renderFormErrors(e.target, errorMessages);
};

const handleInputChange = (e) => {
  updateOtherInputs(e.target);
  bmiCalculatorForm.requestSubmit();
};

// ----------------------------------------
// Main program
// ----------------------------------------

bmiCalculatorForm.addEventListener("submit", handleFormSubmit);

numericInputElements.forEach((element) => {
  element.addEventListener("change", handleInputChange);
});

// ----------------------------------------
// End
// ----------------------------------------
