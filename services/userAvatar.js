import { avatar } from "../constant";
import { getProfile } from "./userServices";

const getAvatarByUserId = async (id) => {
  const user = await getProfile(id);
  return user?.avatar;
};

export const avatar__icon = async (user_id) => {
  const avatar_image = await getAvatarByUserId(user_id);
  return avatar_image ? avatar[avatar_image] : avatar.m1;
};
