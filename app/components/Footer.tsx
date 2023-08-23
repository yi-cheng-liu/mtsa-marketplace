'use client'

import Container from '@/app/components/Container'
import Link from 'next/link'
import Heading from './Heading'

const Footer = () => {
  const columns = [
    {
      title: 'About',
      links: [
        { path: '/about/privacy-policy', label: 'Privacy Policy' },
        { path: '/about/terms-of-use', label: 'Terms of Use' }
      ]
    },
  ]

  return (
    <>
      <div className="lg:py-10">
        <hr className="border-[1px]" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 py-6 xl:px-20 md:px-10 sm:px-4 px-2">
          {columns.map((column, idx) => (
            <div key={idx} className="col-span-1 flex flex-col">
              <Heading title={column.title} />
              {column.links.map((link, linkIdx) => (
                <Link key={linkIdx} href={link.path}>
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Footer
