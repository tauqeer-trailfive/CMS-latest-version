import { useState, useEffect } from "react";

const useNotificationHook = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (requestData) => {
    try {
      setLoading(true);
      const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          Authorization:
            "Bearer AAAAmQyv2tk:APA91bFTD9uboE8JyNukKun8hgd1X96xSCXCGq6zZqnP1ocDpAqIG3klX7fHJCc7TPTh3rGs77q8eSfBEIxVMXMbxedL_9KOhjLk7wIkFPE_j49admgoLDPB8_HNlilktdwjmiqkzZaA",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });
      const result = await response.json();
      setData(result);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useNotificationHook;
