import { getExhibits, getEvents, getStaff } from '@/lib/cosmic'
import { Exhibit, Event, Staff } from '@/types'
import ExhibitCard from '@/components/ExhibitCard'
import EventCard from '@/components/EventCard'
import StaffCard from '@/components/StaffCard'
import Link from 'next/link'

export default async function HomePage() {
  // Fetch limited data for homepage
  const [exhibits, events, staff] = await Promise.all([
    getExhibits(),
    getEvents(),
    getStaff()
  ])

  // Get current exhibits and upcoming events for homepage
  const currentExhibits = exhibits.filter(exhibit => 
    exhibit.metadata?.status?.key === 'current'
  ).slice(0, 3)

  const featuredEvents = events.slice(0, 3)
  const featuredStaff = staff.slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-800 to-primary-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Our Museum
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Discover 5,000 years of human creativity and cultural heritage
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/exhibits" 
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-primary-900 bg-white hover:bg-gray-100 transition-colors duration-200"
              >
                View Exhibitions
              </Link>
              <Link 
                href="/events" 
                className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              >
                Upcoming Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Exhibitions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Current Exhibitions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our world-class exhibitions featuring masterpieces from around the globe
            </p>
          </div>
          
          {currentExhibits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentExhibits.map((exhibit) => (
                <ExhibitCard 
                  key={exhibit.id} 
                  exhibit={exhibit} 
                  showStatus={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No current exhibitions available.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/exhibits" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-700 transition-colors duration-200"
            >
              View All Exhibitions
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for lectures, workshops, and special cultural experiences
            </p>
          </div>
          
          {featuredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  showType={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No upcoming events available.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/events" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-700 transition-colors duration-200"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals passionate about art, culture, and education
            </p>
          </div>
          
          {featuredStaff.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredStaff.map((member) => (
                <StaffCard 
                  key={member.id} 
                  staff={member} 
                  showDepartment={true}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No staff information available.</p>
            </div>
          )}
          
          <div className="text-center">
            <Link 
              href="/staff" 
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-primary-700 transition-colors duration-200"
            >
              Meet All Team Members
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}