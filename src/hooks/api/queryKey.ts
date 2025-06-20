type QueryParams = Record<string, string | number | boolean | undefined>;

export const queryKeys = {
  dashboard: {
    all: ["dashboard"] as const,
    congestion: (popupId: string) =>
      ["dashboard", "congestion", popupId] as const,
    avgPurchase: (popupId: string) =>
      ["dashboard", "avgPurchase", popupId] as const,
    todayEntrant: (popupId: string) =>
      ["dashboard", "todayEntrant", popupId] as const,
    todayReservation: (popupId: string) =>
      ["dashboard", "todayReservation", popupId] as const,
    bestItem: (popupId: string) => ["dashboard", "bestItem", popupId] as const,
    questionnaire: (popupId: string) =>
      ["dashboard", "questionnaire", popupId] as const,
    conversion: (popupId: string) =>
      ["dashboard", "conversion", popupId] as const,
    visitor: (popupId: string) => ["dashboard", "visitor", popupId] as const,
  },
  item: {
    all: ["item"] as const,
    lists: () => ["item", "list"] as const,
    list: (popupId: string, params?: QueryParams) =>
      params
        ? (["item", "list", popupId, params] as const)
        : (["item", "list", popupId] as const),
    detail: (popupId: string, itemId: string) =>
      ["item", "detail", popupId, itemId] as const,
  },
  orderItem: {
    all: ["orderItem"] as const,
    lists: () => ["orderItem", "list"] as const,
    list: (popupId: string, params?: QueryParams) =>
      params
        ? (["orderItem", "list", popupId, params] as const)
        : (["orderItem", "list", popupId] as const),
    detail: (orderItemId: string) =>
      ["orderItem", "detail", orderItemId] as const,
  },
  popup: {
    all: ["popup"] as const,
    lists: () => ["popup", "list"] as const,
    list: (params?: QueryParams) =>
      params
        ? (["popup", "list", params] as const)
        : (["popup", "list"] as const),
    detail: (popupId: string) => ["popup", "detail", popupId] as const,
  },
  stockNotification: {
    all: ["stockNotification"] as const,
    lists: () => ["stockNotification", "list"] as const,
    list: (params?: QueryParams) =>
      params
        ? (["stockNotification", "list", params] as const)
        : (["stockNotification", "list"] as const),
  },
  auth: {
    all: ["auth"] as const,
    user: () => ["auth", "user"] as const,
  },
} as const;

export const queryKeyHelpers = {
  invalidateAllPopupSpecificData: () => [
    { queryKey: queryKeys.dashboard.all },
    { queryKey: queryKeys.item.all },
    { queryKey: queryKeys.orderItem.all },
  ],
};

export const QUERY_KEYS = {
  DASHBOARD: {
    INDEX: queryKeys.dashboard.all,
    BESTITEM: (popupId: string) => queryKeys.dashboard.bestItem(popupId),
    CONGESTION: (popupId: string) => queryKeys.dashboard.congestion(popupId),
    VISITOR: (popupId: string) => queryKeys.dashboard.visitor(popupId),
    TODAY_ENTRANT: (popupId: string) =>
      queryKeys.dashboard.todayEntrant(popupId),
    TODAY_RESERVATION: (popupId: string) =>
      queryKeys.dashboard.todayReservation(popupId),
    AVG_PURCHASE: (popupId: string) => queryKeys.dashboard.avgPurchase(popupId),
    QUESTIONNAIRE: (popupId: string) =>
      queryKeys.dashboard.questionnaire(popupId),
    CONVERSION: (popupId: string) => queryKeys.dashboard.conversion(popupId),
  },
  ITEM: {
    INDEX: queryKeys.item.lists,
    LIST: (popupId: string, params?: QueryParams) =>
      queryKeys.item.list(popupId, params),
    DETAIL: (popupId: string, itemId: string) =>
      queryKeys.item.detail(popupId, itemId),
  },
  ORDER_ITEM: {
    INDEX: queryKeys.orderItem.lists,
    LIST: (popupId: string, params?: QueryParams) =>
      queryKeys.orderItem.list(popupId, params),
    DETAIL: (orderItemId: string) => queryKeys.orderItem.detail(orderItemId),
  },
  POPUP: {
    INDEX: queryKeys.popup.lists,
    LIST: (params?: QueryParams) => queryKeys.popup.list(params),
    DETAIL: (popupId: string) => queryKeys.popup.detail(popupId),
  },
  STOCK_NOTIFICATION: {
    INDEX: queryKeys.stockNotification.lists,
    LIST: (params?: QueryParams) => queryKeys.stockNotification.list(params),
  },
};
