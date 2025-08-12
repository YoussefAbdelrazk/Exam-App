'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useGetSubjectById } from '@/hooks/Subjectshooks/Subjecthook';
import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routeNames: Record<string, string> = {
  '/': 'Home',
  '/diplomas': 'Diplomas',
  '/settings': 'Account Settings',
};

interface BreadcrumbItem {
  name: string;
  href: string;
  isLast: boolean;
  segment: string;
  index: number;
}

export default function DynamicBreadcrumb() {
  const pathname = usePathname();

  // Don't show breadcrumb on auth pages
  if (
    pathname.includes('/login') ||
    pathname.includes('/signup') ||
    pathname.includes('/forgot-password')
  ) {
    return null;
  }

  const pathSegments = pathname.split('/').filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems: BreadcrumbItem[] = [];
  let currentPath = '';

  // Always start with Home
  breadcrumbItems.push({
    name: 'Home',
    href: '/',
    isLast: pathSegments.length === 0,
    segment: '',
    index: -1,
  });

  // Add each path segment
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === pathSegments.length - 1;

    let name = routeNames[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1);

    // Handle dynamic routes for subjects
    if (segment === 'exams' && pathSegments[index - 1] && pathSegments[index - 1] !== 'diplomas') {
      name = 'Exams';
    }

    breadcrumbItems.push({
      name,
      href: currentPath,
      isLast,
      segment,
      index,
    });
  });

  return (
    <div className='bg-white border-b border-gray-200 px-6 py-3'>
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item, index) => {
            // Check if this is a subject ID that should show subject name
            if (
              item.segment &&
              item.index === 1 &&
              pathSegments[0] === 'diplomas' &&
              pathSegments[2] === 'exams'
            ) {
              // This is a subject ID, get the subject name
              return <SubjectBreadcrumbItem key={item.href} item={item} index={index} />;
            }

            const displayName = item.name;

            return (
              <div key={item.href} className='flex items-center'>
                <BreadcrumbItem>
                  {item.isLast ? (
                    <BreadcrumbPage className='font-medium text-gray-900'>
                      {displayName}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link
                        href={item.href}
                        className='text-gray-500 hover:text-gray-700 flex items-center'
                      >
                        {index === 0 && <Home className='h-4 w-4 mr-1' />}
                        {displayName}
                      </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!item.isLast && (
                  <BreadcrumbSeparator>
                    <ChevronRight className='h-4 w-4' />
                  </BreadcrumbSeparator>
                )}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

// Separate component for subject breadcrumb items
function SubjectBreadcrumbItem({ item, index }: { item: BreadcrumbItem; index: number }) {
  const { subject } = useGetSubjectById(item.segment);
  const displayName = subject ? subject.name : item.segment;

  return (
    <div className='flex items-center'>
      <BreadcrumbItem>
        {item.isLast ? (
          <BreadcrumbPage className='font-medium text-gray-900'>{displayName}</BreadcrumbPage>
        ) : (
          <BreadcrumbLink asChild>
            <Link href={item.href} className='text-gray-500 hover:text-gray-700 flex items-center'>
              {index === 0 && <Home className='h-4 w-4 mr-1' />}
              {displayName}
            </Link>
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
      {!item.isLast && (
        <BreadcrumbSeparator>
          <ChevronRight className='h-4 w-4' />
        </BreadcrumbSeparator>
      )}
    </div>
  );
}
