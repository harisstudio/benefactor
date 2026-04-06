export interface StatItem {
  label: string;
  value: string;
  icon?: string;
  trend?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export interface JobRole {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
}
