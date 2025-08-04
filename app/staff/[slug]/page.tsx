// app/staff/[slug]/page.tsx
import { cosmic } from '@/lib/cosmic'
import { Staff } from '@/types'
import { notFound } from 'next/navigation'

interface StaffPageProps {
  params: Promise<{ slug: string }>
}

async function getStaffMember(slug: string): Promise<Staff | null> {
  try {
    const { object } = await cosmic.objects
      .findOne({
        type: 'staff',
        slug: slug,
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    return object as Staff
  } catch (error) {
    return null
  }
}

export default async function StaffPage({ params }: StaffPageProps) {
  const { slug } = await params
  const staffMember = await getStaffMember(slug)

  if (!staffMember) {
    notFound()
  }

  const getDepartmentColor = (department: string): string => {
    switch (department) {
      case 'administration':
        return 'bg-blue-100 text-blue-800'
      case 'curatorial':
        return 'bg-purple-100 text-purple-800'
      case 'education':
        return 'bg-green-100 text-green-800'
      case 'conservation':
        return 'bg-yellow-100 text-yellow-800'
      case 'visitor_services':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-8 py-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Photo */}
              <div className="flex-shrink-0">
                {staffMember.metadata.photo?.imgix_url ? (
                  <img
                    src={`${staffMember.metadata.photo.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={staffMember.metadata.name}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/20 flex items-center justify-center border-4 border-white shadow-lg">
                    <span className="text-4xl md:text-5xl">👤</span>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {staffMember.metadata.name}
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 mb-4">
                  {staffMember.metadata.position}
                </p>
                {staffMember.metadata.department && (
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDepartmentColor(staffMember.metadata.department.key)}`}>
                    {staffMember.metadata.department.value}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 py-8">
            {/* Contact Information */}
            {staffMember.metadata.email && (
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Contact</h2>
                <a
                  href={`mailto:${staffMember.metadata.email}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <span className="mr-2">📧</span>
                  {staffMember.metadata.email}
                </a>
              </div>
            )}

            {/* Biography */}
            {staffMember.metadata.bio && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Biography</h2>
                <div 
                  className="prose prose-lg max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: staffMember.metadata.bio }}
                />
              </div>
            )}

            {/* Additional Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Position</h3>
                <p className="text-blue-700">{staffMember.metadata.position}</p>
              </div>
              {staffMember.metadata.department && (
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Department</h3>
                  <p className="text-purple-700">{staffMember.metadata.department.value}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <a
            href="/staff"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to All Staff
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
        type: 'staff',
      })
      .props(['slug'])

    return objects.map((staff) => ({
      slug: staff.slug,
    }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: StaffPageProps) {
  const { slug } = await params
  const staffMember = await getStaffMember(slug)

  if (!staffMember) {
    return {
      title: 'Staff Member Not Found',
      description: 'The requested staff member could not be found.',
    }
  }

  return {
    title: `${staffMember.metadata.name} | Museum Staff`,
    description: `Meet ${staffMember.metadata.name}, ${staffMember.metadata.position} at our museum. ${staffMember.metadata.bio?.replace(/<[^>]*>/g, '').substring(0, 120) + '...' || ''}`,
    openGraph: {
      title: `${staffMember.metadata.name} | Museum Staff`,
      description: `Meet ${staffMember.metadata.name}, ${staffMember.metadata.position} at our museum.`,
      images: staffMember.metadata.photo?.imgix_url ? [
        {
          url: `${staffMember.metadata.photo.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`,
          width: 1200,
          height: 630,
          alt: staffMember.metadata.name,
        }
      ] : [],
    },
  }
}