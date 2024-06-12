import { UserRole } from "./role";

interface Subscription {
  isActive: boolean;
  price?: string;
  role?: UserRole;
  description?: string;
  type?: string;
}
