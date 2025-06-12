import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useAuthStore } from "@/stores/useAuthStore";

let client: Client;

// 소켓 연결
export const connectNotificationSocket = (
  managerId: number,
  popupId: number,
) => {
  if (client?.connected) return;

  const baseURL = import.meta.env.VITE_API_URL;
  const token = useAuthStore.getState().accessToken;

  client = new Client({
    webSocketFactory: () => new SockJS(`${baseURL}/ws`),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    onConnect: () => {
      const topic = `/topic/${managerId}/popup/${popupId}`;

      client.subscribe(topic, message => {
        const body = JSON.parse(message.body);
        useNotificationStore.getState().addRealtimeNoti({
          notificationId: body.id,
          read: false,
          name: body.name,
          popularity: body.popularity,
          minStock: body.minStock,
          notifiedAt: body.notifiedAt,
        });
      });
    },
  });
  client.activate();
};
