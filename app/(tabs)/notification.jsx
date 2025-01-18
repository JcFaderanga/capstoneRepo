import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import ThemeContainer from "../../components/UI/themeContainer";
import useFetchNotification from "../../hooks/notification/useFetchNotification";
import { useAuth } from "../../context/authContext";
import NotificationMassage from "../../components/notification/notificationMessage";

const Notification = () => {
  const { user } = useAuth();
  const { notification, error, loading, fetchNotification } =
    useFetchNotification();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      fetchNotification(user?.id);
    }
  }, [user]);

  // Refresh handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (user) {
      await fetchNotification(user?.id); // Re-fetch notifications
    }
    setRefreshing(false);
  }, [user, fetchNotification]);

  return (
    <ThemeContainer bgColor="white">
      {/* Header */}
      <View className="w-full h-16 border-b border-gray-200 bg-primary_red px-4 justify-center">
        <Text className="text-2xl font-bold text-white">Notifications</Text>
      </View>

      {/* Notifications */}
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {notification.length > 0 ? (
          <Text className="text-xl font-bold text-primary_gray py-4 px-4">
            Today
          </Text>
        ) : (
          ""
        )}

        {/* Handle Loading State */}
        {loading && (
          <View className="w-full h-full justify-center items-center">
            <ActivityIndicator size={25} color={"red"} />
            <Text className="text-primary_gray px-4 text-center">
              Loading notifications...
            </Text>
          </View>
        )}

        {/* Handle Error State */}
        {error && (
          <Text className="text-red-500 px-4">
            Error loading notifications.
          </Text>
        )}

        {/* Render Notifications */}
        {!loading && notification.length > 0
          ? notification.map((n, index) => (
              <NotificationMassage key={index} notif={n} />
            ))
          : !loading &&
            notification.length === 0 && (
              <Text className="text-primary_gray px-4 py-5 text-center">
                No notifications available.
              </Text>
            )}
      </ScrollView>
    </ThemeContainer>
  );
};

export default Notification;

const styles = StyleSheet.create({});
