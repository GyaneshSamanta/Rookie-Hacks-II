export interface AssociationType {
  [association_id: string]: {
    trans_ID: string;
    amount: number;
    name: string;
  }[];
}

export interface DashboardPageProps {
  associations: AssociationType[];
}

export interface DashboardHeroProps {
  associations: AssociationType[];
}

export interface DashboardCardProps {
  association: AssociationType;
}
