"use client"

import { SafeItem, SafeUser } from "@/app/types";

import Container from "../components/Container";
import ItemOwner from "../components/items/ItemOwner";


interface ProfileClientProps {
  currentUser: SafeUser;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ currentUser }) => {
  return (
    <Container>
      <ItemOwner user={currentUser} heading="Profile" />
    </Container>
  );
}
export default ProfileClient;
