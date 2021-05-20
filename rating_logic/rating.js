import {
  vehicleValueCat,
  vehicleSymbols,
  baseRate,
  clf,
  vehicleMonitoring,
  loading,
  driverClass
} from "../rating_logic/data";

class Insurer {
  _bodilyInjury = 0;
  _propertydamage = 0;
  _excessLiabilityCoverage = 0;
  _totalThirdparty = 0;
  // Net3rdParty
  _collisionCover = 0;
  // TotalComprehensive
  _rentalReimbursement = 0;
  _vehicleMonitoring = 0;
  _totalVehicleRiskPremium = 0;
  _governmentStampDutyTax = 12;
  _totalPolicyPremium = 0;
  // Cover Calculation objects
  _vehicleCode = "";
  _baseRate = 0;
  _vehicleSymbolFactor = 0;
  _driverClassFactor = 0;
  _netPremium = 0;
  _loadDiscountPercentage = 0;
  _coverageLimitFactor = 0;
  _totalBIPremium = 0;
  _totalPDPremium = 0;
  _total_EL_Premium = 0;
  _totalCollisionPremium = 0;
  _total_Rental_Reimbursement_Premium = 0;

  constructor(
    vehicleValue,
    vehicleCompany,
    vehicleModel,
    driverAge,
    gender,
    maritalStatus,
    driverExperience,
    driverOccupation,
    deductibleFactor,
    coverageLimit
  ) {
    this.vehicleValue = vehicleValue;
    this.vehicleCompany = vehicleCompany;
    this.vehicleModel = vehicleModel;
    this.driverAge = driverAge;
    this.gender = gender;
    this.maritalStatus = maritalStatus;
    this.driverExperience = driverExperience;
    this.driverOccupation = driverOccupation;
    this.deductibleFactor = deductibleFactor;
    this.coverageLimit = coverageLimit;
  }
  getBodilyInjuryCoverCalculations() {
    this._netPremium =
      baseRate["BI"]["Base rate"] *
      vehicleSymbols[this.vehicleCompany + "-" + this.vehicleModel]["BI"] *
      driverClass[
        this.driverAge + "-" + this.gender + "-" + this.maritalStatus
      ]["BI"];

    return parseInt(this._netPremium.toFixed(0), 10);
  }
  getPropertyDamageCoverCalculations() {
    this._netPremium =
      baseRate["PD"]["Base rate"] *
      vehicleSymbols[this.vehicleCompany + "-" + this.vehicleModel]["PD"] *
      driverClass[
        this.driverAge + "-" + this.gender + "-" + this.maritalStatus
      ]["PD"];
    return parseInt(this._netPremium.toFixed(0), 10);
  }
  getExcessLiabilityCoverCalculations() {
    this._netPremium =
      baseRate["ELR"]["Base rate"] *
      vehicleSymbols[this.vehicleCompany + "-" + this.vehicleModel][
        "Selected Excess Liab Factor"
      ];
    return parseInt(this._netPremium.toFixed(0), 10);
  }
  getCollisionCoverCalculation() {
    switch (true) {
      case this.vehicleValue > 0 && this.vehicleValue <= 5000:
        this._vehicleCode = "0-5000";
        break;
      case this.vehicleValue >= 5001 && this.vehicleValue <= 7000:
        this._vehicleCode = "5001-7000";
        break;
      case this.vehicleValue >= 7001 && this.vehicleValue <= 10000:
        this._vehicleCode = "7001-10000";
        break;
      case this.vehicleValue >= 10001 && this.vehicleValue <= 15000:
        this._vehicleCode = "10001-15000";
        break;
      case this.vehicleValue >= 15001 && this.vehicleValue <= 20000:
        this._vehicleCode = "15001-20000";
        break;
      case this.vehicleValue >= 20001 && this.vehicleValue <= 25000:
        this._vehicleCode = "20001-25000";
        break;
      case this.vehicleValue >= 25001 && this.vehicleValue <= 30000:
        this._vehicleCode = "25001-30000";
        break;
      case this.vehicleValue >= 30001 && this.vehicleValue <= 40000:
        this._vehicleCode = "30001-40000";
        break;
      case this.vehicleValue >= 40001 && this.vehicleValue <= 50000:
        this._vehicleCode = "40001-50000";
        break;
      case this.vehicleValue >= 50001 && this.vehicleValue <= 60000:
        this._vehicleCode = "50001-60000";
        break;
      case this.vehicleValue >= 60001 && this.vehicleValue <= 70000:
        this._vehicleCode = "60001-70000";
        break;
      case this.vehicleValue >= 70001 && this.vehicleValue <= 80000:
        this._vehicleCode = "70001-80000";
        break;
      case this.vehicleValue > 80001 && this.vehicleValue <= 90000:
        this._vehicleCode = "80001-90000";
        break;
      case this.vehicleValue > 90001 && this.vehicleValue <= 10000:
        this._vehicleCode = "90001-100000";
        break;
      default:
        this._vehicleCode = "100001+";
    }
    this._netPremium =
      vehicleValueCat[this._vehicleCode]["COL"] *
      vehicleSymbols[this.vehicleCompany + "-" + this.vehicleModel][
        "Selected Collision Factor"
      ] *
      driverClass[
        this.driverAge + "-" + this.gender + "-" + this.maritalStatus
      ]["Collision"];
    this._loadDiscountPercentage =
      (loading[this.vehicleCompany + "-" + this.vehicleModel] / 100 || 0) *
      this._netPremium;
    return parseInt(
      (this._netPremium + this._loadDiscountPercentage).toFixed(0),
      10
    );
  }
  getRentalReimbursementCoverCalculation() {
    this._netPremium = baseRate["RC"]["Base rate"] * clf[this.coverageLimit];
    this._loadDiscountPercentage =
      (loading[this.vehicleCompany + "-" + this.vehicleModel] / 100 || 0) *
      this._netPremium;
    return parseInt(
      (this._netPremium + this._loadDiscountPercentage).toFixed(0),
      10
    );
  }
  // Final Calculations
  getTotalPremium() {
    this._bodilyInjury = this.getBodilyInjuryCoverCalculations();
    this._propertydamage = this.getPropertyDamageCoverCalculations();
    this._excessLiabilityCoverage = this.getExcessLiabilityCoverCalculations();
    this._collisionCover = this.getCollisionCoverCalculation();
    this._rentalReimbursement = this.getRentalReimbursementCoverCalculation();
    this._vehicleMonitoring = vehicleMonitoring;
    console.log("this._bodilyInjury", this._bodilyInjury);
    console.log("this._propertydamage", this._propertydamage);
    console.log("this._excessLiabilityCoverage", this._excessLiabilityCoverage);
    console.log("this._collisionCover", this._collisionCover);
    console.log("this._rentalReimbursement", this._rentalReimbursement);
    console.log("this._vehicleMonitoring", this._vehicleMonitoring);
    this._totalThirdparty =
      this._bodilyInjury + this._propertydamage + this._excessLiabilityCoverage;
    this._totalVehicleRiskPremium =
      this._totalThirdparty +
      this._collisionCover +
      this._rentalReimbursement +
      this._vehicleMonitoring;
    return this._totalVehicleRiskPremium + this._governmentStampDutyTax;
  }
}

let farooq = new Insurer(
  5000,
  "Honda",
  "ACCORD 2D",
  20,
  "Male",
  "Single",
  10,
  "Something",
  "something",
  14
);
export default farooq;
console.log("hello");
console.log("Total Premium", farooq.getTotalPremium());
