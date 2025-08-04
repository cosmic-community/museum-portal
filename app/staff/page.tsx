import { getStaff } from '@/lib/cosmic'
import StaffCard from '@/components/StaffCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team - Museum Portal',
  description: 'Meet our dedicated team of professionals passionate about art, culture, and education.',
}

export default async function StaffPage() {
  const staff = await getStaff()

  // Group staff by department
  const administration = staff.filter(member => 
    member.metadata?.department?.key === 'administration'
  )
  const curatorial = staff.filter(member => 
    member.metadata?.department?.key === 'curatorial'
  )
  const education = staff.filter(member => 
    member.metadata?.department?.key === 'education'
  )
  const conservation = staff.filter(member => 
    member.metadata?.department?.key === 'conservation'
  )
  const visitorServices = staff.filter(member => 
    member.metadata?.department?.key === 'visitor_services'
  )

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who make our museum a world-class institution. 
            Our team is passionate about art, culture, education, and creating meaningful experiences for all visitors.
          </p>
        </div>

        {/* All Staff */}
        {staff.length > 0 ? (
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {staff.map((member) => (
                <StaffCard 
                  key={member.id} 
                  staff={member} 
                  showDepartment={true}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No team members listed</h3>
              <p className="mt-2 text-gray-500">
                Team information will be available soon.
              </p>
            </div>
          </div>
        )}

        {/* Department Overview */}
        {staff.length > 0 && (
          <section className="bg-gray-50 rounded-lg p-8 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Administration</h3>
                <p className="text-sm text-gray-600">{administration.length} team members</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Curatorial</h3>
                <p className="text-sm text-gray-600">{curatorial.length} team members</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Education</h3>
                <p className="text-sm text-gray-600">{education.length} team members</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 text-yellow-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Conservation</h3>
                <p className="text-sm text-gray-600">{conservation.length} team members</p>
              </div>
              
              <div className="text-center">
                <div className="bg-pink-100 text-pink-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Visitor Services</h3>
                <p className="text-sm text-gray-600">{visitorServices.length} team members</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}