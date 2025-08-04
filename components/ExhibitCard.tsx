import Link from 'next/link'
import { ExhibitCardProps } from '@/types'

export default function ExhibitCard({ exhibit, showStatus = true, className = '' }: ExhibitCardProps) {
  const featuredImage = exhibit.metadata?.featured_image
  const status = exhibit.metadata?.status
  const location = exhibit.metadata?.location
  const startDate = exhibit.metadata?.start_date
  const endDate = exhibit.metadata?.end_date

  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getStatusBadgeClass = (statusKey?: string) => {
    switch (statusKey) {
      case 'current':
        return 'status-current'
      case 'upcoming':
        return 'status-upcoming'
      case 'past':
        return 'status-past'
      default:
        return 'status-current'
    }
  }

  return (
    <div className={`museum-card ${className}`}>
      {featuredImage && (
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={`${featuredImage.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={exhibit.title}
            className="w-full h-48 object-cover"
            width="400"
            height="225"
          />
        </div>
      )}
      
      <div className="p-6">
        {showStatus && status && (
          <div className="mb-3">
            <span className={`museum-badge ${getStatusBadgeClass(status.key)}`}>
              {status.value}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          <Link 
            href={`/exhibits/${exhibit.slug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {exhibit.title}
          </Link>
        </h3>
        
        {exhibit.metadata?.description && (
          <div 
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: exhibit.metadata.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...' 
            }}
          />
        )}
        
        <div className="space-y-2 text-sm text-gray-500">
          {startDate && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>
                {formatDate(startDate)}
                {endDate && ` - ${formatDate(endDate)}`}
              </span>
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
        </div>
        
        <div className="mt-4">
          <Link
            href={`/exhibits/${exhibit.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-700 font-medium transition-colors duration-200"
          >
            Learn More
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}