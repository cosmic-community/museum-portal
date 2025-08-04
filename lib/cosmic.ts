import { createBucketClient } from '@cosmicjs/sdk'
import { Exhibit, Event, Staff, Page, CosmicResponse } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all exhibits
export async function getExhibits(): Promise<Exhibit[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'exhibits' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Exhibit[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch exhibits')
  }
}

// Fetch single exhibit by slug
export async function getExhibit(slug: string): Promise<Exhibit | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'exhibits', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Exhibit
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch exhibit: ${slug}`)
  }
}

// Fetch exhibits by status
export async function getExhibitsByStatus(status: string): Promise<Exhibit[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'exhibits',
        'metadata.status.key': status 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Exhibit[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch exhibits by status: ${status}`)
  }
}

// Fetch all events
export async function getEvents(): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'events' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Event[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch events')
  }
}

// Fetch single event by slug
export async function getEvent(slug: string): Promise<Event | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'events', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Event
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch event: ${slug}`)
  }
}

// Fetch events by type
export async function getEventsByType(eventType: string): Promise<Event[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'events',
        'metadata.event_type.key': eventType 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Event[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch events by type: ${eventType}`)
  }
}

// Fetch all staff
export async function getStaff(): Promise<Staff[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'staff' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Staff[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch staff')
  }
}

// Fetch single staff member by slug
export async function getStaffMember(slug: string): Promise<Staff | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'staff', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Staff
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch staff member: ${slug}`)
  }
}

// Fetch staff by department
export async function getStaffByDepartment(department: string): Promise<Staff[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'staff',
        'metadata.department.key': department 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Staff[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error(`Failed to fetch staff by department: ${department}`)
  }
}

// Fetch all pages
export async function getPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'pages' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Page[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch pages')
  }
}

// Fetch navigation pages
export async function getNavigationPages(): Promise<Page[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'pages',
        'metadata.show_in_nav': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Page[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch navigation pages')
  }
}

// Fetch single page by slug
export async function getPage(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error(`Failed to fetch page: ${slug}`)
  }
}