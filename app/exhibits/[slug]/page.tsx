// app/exhibits/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Exhibit } from '@/types'
import { notFound } from 'next/navigation'

interface ExhibitPageProps {
  params: Promise<{ slug: string }>
}

async function getExhibit(slug: string): Promise<Exhibit | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'exhibits',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object as Exhibit
  } catch (error) {
    return null
  }
}

export default async function ExhibitPage({ params }: ExhibitPageProps) {
  const { slug } = await params
  const exhibit = await getExhibit(slug)

  if (!exhibit) {
    notFound()
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800'
      case 'upcoming':
        return 'bg-blue-100 text-blue-800'
      case 'past':
        return 'bg-gray-100 text-gray-800'
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
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(exhibit.metadata.status?.key || '')}`}>
              {exhibit.metadata.status?.value || 'Unknown'}
            </span>
            {exhibit.metadata.location && (
              <span className="text-gray-600 text-sm">
                📍 {exhibit.metadata.location}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {exhibit.metadata.title}
          </h1>
          <div className="flex items-center gap-6 text-gray-600">
            {exhibit.metadata.start_date && (
              <div>
                <span className="font-medium">Start:</span> {formatDate(exhibit.metadata.start_date)}
              </div>
            )}
            {exhibit.metadata.end_date && (
              <div>
                <span className="font-medium">End:</span> {formatDate(exhibit.metadata.end_date)}
              </div>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {exhibit.metadata.featured_image?.imgix_url && (
          <div className="mb-8">
            <img
              src={`${exhibit.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={exhibit.metadata.title}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-12">
          {exhibit.metadata.description && (
            <div 
              className="prose prose-lg max-w-none text-gray-700"
              dangerouslySetInnerHTML={{ __html: exhibit.metadata.description }}
            />
          )}
        </div>

        {/* Gallery */}
        {exhibit.metadata.gallery && exhibit.metadata.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exhibit.metadata.gallery.map((image, index) => (
                <div key={index} className="aspect-square">
                  <img
                    src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back Button */}
        <div className="pt-8 border-t border-gray-200">
          <a
            href="/exhibits"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to All Exhibits
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
        type: 'exhibits',
      })
      .props(['slug'])

    return objects.map((exhibit: { slug: string }) => ({
      slug: exhibit.slug,
    }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: ExhibitPageProps) {
  const { slug } = await params
  const exhibit = await getExhibit(slug)

  if (!exhibit) {
    return {
      title: 'Exhibit Not Found',
      description: 'The requested exhibit could not be found.',
    }
  }

  return {
    title: `${exhibit.metadata.title} | Museum`,
    description: exhibit.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
    openGraph: {
      title: exhibit.metadata.title,
      description: exhibit.metadata.description?.replace(/<[^>]*>/g, '').substring(0, 160) + '...',
      images: exhibit.metadata.featured_image?.imgix_url ? [
        {
          url: `${exhibit.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: exhibit.metadata.title,
        }
      ] : [],
    },
  }
}