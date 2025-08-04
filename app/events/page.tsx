import { getEvents } from '@/lib/cosmic'
import EventCard from '@/components/EventCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events - Museum Portal',
  description: 'Join us for lectures, workshops, guided tours, and special events that bring art and culture to life.',
}

export default async function EventsPage() {
  const events = await getEvents()

  // Group events by type for better organization
  const lectures = events.filter(event => 
    event.metadata?.event_type?.key === 'lecture'
  )
  const workshops = events.filter(event => 
    event.metadata?.event_type?.key === 'workshop'
  )
  const tours = events.filter(event => 
    event.metadata?.event_type?.key === 'tour'
  )
  const specialEvents = events.filter(event => 
    event.metadata?.event_type?.key === 'special'
  )

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Events & Programs
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join us for engaging lectures, hands-on workshops, guided tours, and special events 
            that bring art, culture, and education together.
          </p>
        </div>

        {/* All Events */}
        {events.length > 0 ? (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  showType={true}
                />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No events scheduled</h3>
              <p className="mt-2 text-gray-500">
                Check back soon for upcoming lectures, workshops, and special programs.
              </p>
            </div>
          </div>
        )}

        {/* Event Categories Overview */}
        {events.length > 0 && (
          <section className="bg-gray-50 rounded-lg p-8 mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Event Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 text-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Lectures</h3>
                <p className="text-sm text-gray-600">{lectures.length} upcoming</p>
              </div>
              
              <div className="text-center">
                <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Workshops</h3>
                <p className="text-sm text-gray-600">{workshops.length} available</p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 text-purple-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Guided Tours</h3>
                <p className="text-sm text-gray-600">{tours.length} scheduled</p>
              </div>
              
              <div className="text-center">
                <div className="bg-yellow-100 text-yellow-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Special Events</h3>
                <p className="text-sm text-gray-600">{specialEvents.length} planned</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}