import { getExhibits } from '@/lib/cosmic'
import ExhibitCard from '@/components/ExhibitCard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Exhibitions - Museum Portal',
  description: 'Explore our current, upcoming, and past exhibitions featuring masterpieces from around the world.',
}

export default async function ExhibitsPage() {
  const exhibits = await getExhibits()

  // Group exhibits by status
  const currentExhibits = exhibits.filter(exhibit => 
    exhibit.metadata?.status?.key === 'current'
  )
  const upcomingExhibits = exhibits.filter(exhibit => 
    exhibit.metadata?.status?.key === 'upcoming'
  )
  const pastExhibits = exhibits.filter(exhibit => 
    exhibit.metadata?.status?.key === 'past'
  )

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Exhibitions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our world-class exhibitions featuring masterpieces from ancient civilizations to contemporary works, 
            showcasing 5,000 years of human creativity.
          </p>
        </div>

        {/* Current Exhibitions */}
        {currentExhibits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Current Exhibitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentExhibits.map((exhibit) => (
                <ExhibitCard 
                  key={exhibit.id} 
                  exhibit={exhibit} 
                  showStatus={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Exhibitions */}
        {upcomingExhibits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Exhibitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingExhibits.map((exhibit) => (
                <ExhibitCard 
                  key={exhibit.id} 
                  exhibit={exhibit} 
                  showStatus={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* Past Exhibitions */}
        {pastExhibits.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Past Exhibitions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastExhibits.map((exhibit) => (
                <ExhibitCard 
                  key={exhibit.id} 
                  exhibit={exhibit} 
                  showStatus={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* No exhibitions message */}
        {exhibits.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No exhibitions available</h3>
              <p className="mt-2 text-gray-500">
                Check back soon for new exhibitions and cultural experiences.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}