export const COMMERCE_POLICY = {
  withdrawalDays: 14,
  wholesaleMinimum: 25,
  deliveryWorkingDays: { madeira: [3, 3], mainland: [5, 7], worldwide: [7, 14] },
} as const;

// A standard collection design is not personalised merely because it is printed after ordering.
export const hasWithdrawalRight = (personalised: boolean) => !personalised;