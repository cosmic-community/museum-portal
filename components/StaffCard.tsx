import Link from 'next/link'
import { StaffCardProps } from '@/types'

export default function StaffCard({ staff, showDepartment = true, className = '' }: StaffCardProps) {
  const photo = staff.metadata?.photo
  const name = staff.metadata?.name || staff.title
  const position = staff.metadata?.position
  const department = staff.metadata?.department
  const email = staff.metadata?.email

  const getDepartmentClass = (deptKey?: string) => {
    switch (deptKey) {
      case 'administration':
        return 'bg-blue-100 text-blue-800'
      case 'curatorial':
        return 'bg-purple-100 text-purple-800'
      case 'education':
        return 'bg-green-100 text-green-800'
      case 'conservation':
        return 'bg-yellow-100 text-yellow-800'
      case 'visitor_services':
        return 'bg-pink-100 text-pink-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`museum-card ${className}`}>
      {photo && (
        <div className="aspect-w-1 aspect-h-1 overflow-hidden">
          <img
            src={`${photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
            alt={name}
            className="w-full h-64 object-cover"
            width="300"
            height="300"
          />
        </div>
      )}
      
      <div className="p-6">
        {showDepartment && department && (
          <div className="mb-3">
            <span className={`museum-badge ${getDepartmentClass(department.key)}`}>
              {department.value}
            </span>
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-900 mb-1">
          <Link 
            href={`/staff/${staff.slug}`}
            className="hover:text-primary transition-colors duration-200"
          >
            {name}
          </Link>
        </h3>
        
        {position && (
          <p className="text-primary-600 font-medium mb-3">{position}</p>
        )}
        
        {staff.metadata?.bio && (
          <div 
            className="text-gray-600 mb-4 line-clamp-3"
            dangerouslySetInnerHTML={{ 
              __html: staff.metadata.bio.replace(/<[^>]*>/g, '').substring(0, 120) + '...' 
            }}
          />
        )}
        
        <div className="flex items-center justify-between">
          <Link
            href={`/staff/${staff.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-700 font-medium transition-colors duration-200"
          >
            View Profile
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center text-gray-500 hover:text-primary transition-colors duration-200"
              title={`Email ${name}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}