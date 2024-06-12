// import { subscriptionApi } from "@src/features/subscription";
// import { UserRoleBackend } from "@src/types/role";
import { UserRoleBackend } from "src/types/role";
import { subscriptionApi } from "..";

export const getSubscriptionTypesActions = async (role?: UserRoleBackend) => {
  const { data } = await subscriptionApi.getSubscriptionTypes(role);
  return data;
};

export const subscribe = async () => {
  const { data } = await subscriptionApi.subscriptionSubscribe();
  return data;
};

export const approveSubscription = async (type: string) => {
  const { data } = await subscriptionApi.approve(type);
  return data;
}
