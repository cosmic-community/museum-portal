// app/[slug]/page.tsx
import { getPage, getPages } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const pages = await getPages()
  
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    return {
      title: 'Page Not Found - Museum Portal',
      description: 'The requested page could not be found.',
    }
  }

  return {
    title: `${page.metadata?.title || page.title} - Museum Portal`,
    description: page.metadata?.content?.replace(/<[^>]*>/g, '').substring(0, 160) || 'Museum Portal - Interactive Cultural Experience',
  }
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) {
    notFound()
  }

  const featuredImage = page.metadata?.featured_image
  const content = page.metadata?.content

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
              alt={page.metadata?.title || page.title}
              className="w-full h-64 md:h-96 object-cover"
              width="1200"
              height="600"
            />
          </div>
        )}

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.metadata?.title || page.title}
          </h1>
        </div>

        {/* Page Content */}
        {content && (
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {/* No content message */}
        {!content && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Content Coming Soon</h3>
              <p className="mt-2 text-gray-500">
                This page is under construction. Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}