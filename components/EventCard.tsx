import Link from 'next/link'
import { EventCardProps } from '@/types'

export default function EventCard({ event, showType = true, className = '' }: EventCardProps) {
  const eventImage = event.metadata?.event_image
  const eventType = event.metadata?.event_type
  const location = event.metadata?.location
  const dateTime = event.metadata?.date_time
  const price = event.metadata?.price
  const registrationRequired = event.metadata?.registration_required

  const getEventTypeClass = (typeKey?: string) => {
    switch (typeKey) {
      case 'lecture':
        return 'bg-blue-100 text-blue-800'
      case 'workshop':
        return 'bg-green-100 text-green-800'
      case 'tour':
        return 'bg-purple-100 text-purple-800'
      case 'special':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`museum-card ${className}`}>
      {eventImage && (
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={`${eventImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={event.title}
            className="w-full h-48 object-cover"
            width="400"
            height="225"
          />
        </div>
      )}
      
      <div className="p-6">
        {showType && eventType && (
          <div className="mb-3">
            <span className={`museum-badge ${getEventTypeClass(eventType.key)}`}>
              {eventType.value}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Link 
            href={`/events/${event.slug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {event.title}
          </Link>
        </h3>
        
        {event.metadata?.description && (
          <div 
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: event.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
            }}
          />
        )}
        
        <div className="space-y-2 text-sm text-gray-500">
          {dateTime && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{dateTime}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{location}</span>
            </div>
          )}
          
          {price && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span>{price}</span>
            </div>
          )}
          
          {registrationRequired && (
            <div className="flex items-center text-orange-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>Registration Required</span>
            </div>
          )}
        </div>
        
        <div className="mt-4">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-700 font-medium transition-colors duration-200"
          >
            View Details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}