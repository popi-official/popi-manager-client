export const QUERY_KEYS = {
  DASHBOARD: {
    INDEX: ["dashboard"] as const,
    BESTITEM: ["dashboard", "bestItem"] as const,
    CONGESTION: ["dashboard", "congestion"] as const,
    VISITOR: ["dashboard", "visitor"] as const,
    TODAY_ENTRANT: ["dashboard", "todayEntrant"] as const,
    TODAY_RESERVATION: ["dashboard", "todayReservation"] as const,
    AVG_PURCHASE: ["dashboard", "avgPurchase"] as const,
    QUESTIONNAIRE: ["dashboard", "questionnaire"] as const,
    CONVERSION: ["dashboard", "conversion"] as const,
  },
  ITEM: {
    INDEX: ["itemList"] as const,
  },
  ORDER_ITEM: {
    INDEX: ["orderItem"] as const,
  },
  POPUP: {
    INDEX: ["popUpList"] as const,
  },
  STOCK_NOTIFICATION: {
    INDEX: ["stockNotification"] as const,
  },
};
