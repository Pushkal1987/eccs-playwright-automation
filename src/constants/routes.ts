// Keep routes in one place.
// If an application URL changes, update it here instead of changing
// many Page Object files.


export const routes = {
  login: '/eccs',
  dashboard: '/dashboard',  
  courierEcm: '/courier/ecm',
  custodianArrivalScan: '/custodian/arrival-scan',
  courierCbeXi: '/courier/cbe-xi',
} as const;