"use client"

import { SafeUser } from "@/app/types";

import Container from "../components/Container";
import ItemOwner from "../components/items/ItemOwner";
import axios from "axios";
import { toast } from "react-hot-toast";

interface ProfileClientProps {
  currentUser: SafeUser;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  const handleUpdateUser = async (data: any) => {
    try {
      // Make the API call to update the user's information
      await axios.post("/api/profile", data);
      // Show a success message
      toast.success("Profile updated successfully");
    } catch (err) {
      // Show an error message
      toast.error("An error occurred while updating your profile");
    }
  };

  return (
    <Container>
      <ItemOwner
        profile
        user={currentUser}
        heading="Profile"
        onUpdateUser={handleUpdateUser}
      />
    </Container>
  );
};
export default ProfileClient;
