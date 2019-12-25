import React, { useState, useEffect, useMemo } from "react";

import { MdNotifications } from "react-icons/md";
import { parseISO, formatDistance } from "date-fns";
import en from "date-fns/locale/en-GB";

import api from "~/services/api";

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from "./styles";

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () =>
      Boolean(notifications.find(notification => notification.read === false)),
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get("notifications");

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: en }
        ),
      }));

      setNotifications(data);
    }

    loadNotifications();
  }, []);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification =>
        notification._id === id ? { ...notification, read: true } : notification
      )
    );
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications size={20} color="#7159c1" />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              <button
                onClick={() => handleMarkAsRead(notification._id)}
                type="button"
              >
                Mark as read
              </button>
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
