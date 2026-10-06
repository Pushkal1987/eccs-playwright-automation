import { DateUtils } from "../../utils/DateUtils";

export const ecmDocFilingData = {

    detailsOfAuthorizedCourierData: {
        courierRegistrationNumber: "ABCDA2597AACAMT",
        nameOfTheAuthorizedCourier: "MYPORTCOMPANY"
    },

    detailsOfOnboardCourierData: {
        nameOfTheOnBoardCourier: "Fedex India",
        address1: "Z-32,NARAINA WAREHOUSING SCHEME",
        address2: "Hawkins Road",
        city: "NEW DELHI",
        postalCode: "110028",
        state: "DELHI",
        country: "INDIA"
    },

    flightDetailsData: {
        airlines: "Aeroflot",
        flightNumber: "A008",
        airportOfArrival: "AMT",
        airportOfShipment: "ACC",
        dateOfArrival: DateUtils.getCurrentDate(),
        timeOfArrival: "12:27"
    },

    mawbNumberCount: 2,

    hawbDetailsData: {
        hawbNumber: `HAWB${DateUtils.getCurrentTimestamp()}`,
        caseOfCRN: "NO",
        numberOfPackages: "1",
        weight: "10",
        descriptionOfGoods: "Test"
    },

    detailsOfConsignorData: {
        nameOfTheConsignor: "COSMIC ENTERPRISES",
        address1: "Z-32,NARAINA WAREHOUSING SCHEME",
        address2: "Hawkins Road",
        city: "NEW DELHI",
        postalCode: "110028",
        state: "DELHI",
        country: "INDIA"
    },

    detailsOfConsigneeData: {
        nameOfTheConsignee: "COSMIC ENTERPRISES",
        address1: "Z-32,NARAINA WAREHOUSING SCHEME",
        address2: "Hawkins Road",
        city: "Bankok",
        postalCode: "343343",
        state: "Bankok",
        country: "THAILAND"
    },

    value: "10000",
    currency: "INR",
    shipmentToBeTransShipped: "YES",
    placeOfTransShipment: "Delhi",
    
}
