export const ParseAssociationID = (id: string): [string, string] =>
  id.split(":::") as [string, string];
