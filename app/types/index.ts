import { User, Item } from '@prisma/client'

export type SafeItem = Omit<
  Item,
  "createdAt"
> & {
  createdAt: string;
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null | undefined;
};
