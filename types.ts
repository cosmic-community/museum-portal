// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Exhibit interface
export interface Exhibit extends CosmicObject {
  type: 'exhibits';
  metadata: {
    title?: string;
    description?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    gallery?: Array<{
      url: string;
      imgix_url: string;
    }>;
    start_date?: string;
    end_date?: string;
    location?: string;
    status?: ExhibitStatus;
  };
}

// Event interface
export interface Event extends CosmicObject {
  type: 'events';
  metadata: {
    title?: string;
    description?: string;
    event_image?: {
      url: string;
      imgix_url: string;
    };
    date_time?: string;
    location?: string;
    event_type?: EventType;
    price?: string;
    registration_required?: boolean;
  };
}

// Staff interface
export interface Staff extends CosmicObject {
  type: 'staff';
  metadata: {
    name?: string;
    position?: string;
    bio?: string;
    photo?: {
      url: string;
      imgix_url: string;
    };
    email?: string;
    department?: StaffDepartment;
  };
}

// Page interface
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    show_in_nav?: boolean;
  };
}

// Type literals for select-dropdown values
export type ExhibitStatus = {
  key: 'current' | 'upcoming' | 'past';
  value: 'Current' | 'Upcoming' | 'Past';
};

export type EventType = {
  key: 'lecture' | 'workshop' | 'tour' | 'special';
  value: 'Lecture' | 'Workshop' | 'Guided Tour' | 'Special Event';
};

export type StaffDepartment = {
  key: 'administration' | 'curatorial' | 'education' | 'conservation' | 'visitor_services';
  value: 'Administration' | 'Curatorial' | 'Education' | 'Conservation' | 'Visitor Services';
};

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip?: number;
}

// Component prop types
export interface ExhibitCardProps {
  exhibit: Exhibit;
  showStatus?: boolean;
  className?: string;
}

export interface EventCardProps {
  event: Event;
  showType?: boolean;
  className?: string;
}

export interface StaffCardProps {
  staff: Staff;
  showDepartment?: boolean;
  className?: string;
}

export interface PageContentProps {
  page: Page;
  className?: string;
}

// Utility types
export type ContentType = 'exhibits' | 'events' | 'staff' | 'pages';
export type FilterStatus = 'all' | 'current' | 'upcoming' | 'past';
export type FilterEventType = 'all' | 'lecture' | 'workshop' | 'tour' | 'special';
export type FilterDepartment = 'all' | 'administration' | 'curatorial' | 'education' | 'conservation' | 'visitor_services';