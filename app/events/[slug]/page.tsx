// app/events/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Event } from '@/types'
import { notFound } from 'next/navigation'

interface EventPageProps {
  params: Promise<{ slug: string }>
}

async function getEvent(slug: string): Promise<Event | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'events',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object as Event
  } catch (error) {
    return null
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    notFound()
  }

  const getEventTypeColor = (eventType: string): string => {
    switch (eventType) {
      case 'lecture':
        return 'bg-purple-100 text-purple-800'
      case 'workshop':
        return 'bg-green-100 text-green-800'
      case 'tour':
        return 'bg-blue-100 text-blue-800'
      case 'special':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEventTypeColor(event.metadata.event_type?.key || '')}`}>
              {event.metadata.event_type?.value || 'Event'}
            </span>
            {event.metadata.registration_required && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                Registration Required
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {event.metadata.title}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-600">
            {event.metadata.date_time && (
              <div className="flex items-center gap-2">
                <span className="text-xl">📅</span>
                <div>
                  <div className="font-medium text-gray-900">Date & Time</div>
                  <div>{event.metadata.date_time}</div>
                </div>
              </div>
            )}
            {event.metadata.location && (
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <div>
                  <div className="font-medium text-gray-900">Location</div>
                  <div>{event.metadata.location}</div>
                </div>
              </div>
            )}
            {event.metadata.price && (
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <div>
                  <div className="font-medium text-gray-900">Price</div>
                  <div>{event.metadata.price}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Event Image */}
        {event.metadata.event_image?.imgix_url && (
          <div className="mb-8">
            <img
              src={`${event.metadata.event_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={event.metadata.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          {event.metadata.description && (
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: event.metadata.description }}
            />
          )}
        </div>

        {/* Registration CTA */}
        {event.metadata.registration_required && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Registration Required
            </h3>
            <p className="text-blue-700 mb-4">
              This event requires advance registration. Please contact the museum to secure your spot.
            </p>
            <div className="flex gap-4">
              <a
                href="tel:+1-555-0123"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Call to Register
              </a>
              <a
                href="mailto:events@museum.org"
                className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="pt-8 border-t border-gray-200">
          <a
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to All Events
          </a>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  try {
    const { objects } = await cosmic.objects
      .find({
        type: 'events',
      })
      .props(['slug'])

    return objects.map((event: { slug: string }) => ({
      slug: event.slug,
    }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params
  const event = await getEvent(slug)

  if (!event) {
    return {
      title: 'Event Not Found',
      description: 'The requested event could not be found.',
    }
  }

  return {
    title: `${event.metadata.title} | Museum Events`,
    description: event.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    openGraph: {
      title: event.metadata.title,
      description: event.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      images: event.metadata.event_image?.imgix_url ? [
        {
          url: `${event.metadata.event_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: event.metadata.title,
        }
      ] : [],
    },
  }
}