export enum CardMode {
  ORDER = 'order', // currentUser is buyer
  PROFILE_ALL = 'profile_all', 
  PROFILE_RESERVED_SOLD = 'profile_reserved_sold', // currentUser is seller
  SOLD = 'sold'
}
