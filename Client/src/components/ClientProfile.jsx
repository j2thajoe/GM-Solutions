// src/components/ClientProfile.jsx
import { useEffect, useState, useContext } from "react";
import { ClientContext } from "../../contexts/ClientContext";

const ClientProfile = () => {
  const { client } = useContext(ClientContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (client) {
      setProfile({
        username: client.username || "Guest",
        profilePic: client.profilePic || "/default.png",
      });
    }
  }, [client]);

  return profile;
};

export default ClientProfile;
