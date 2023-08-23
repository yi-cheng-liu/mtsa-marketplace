'use client';

import Container from "@/app/components/Container";
import Link from "next/link";
import Heading from "./Heading";

const Footer = () => {
  return (
    <>
      <Container>
        <div className="py-10">
          <hr className="border-[1px]" />
          <div className="grid grid-cols-1 md:grid-cols-4 md:gap-10 py-6 px-10">
            <div className="col-span-1 flex flex-col">
              <Heading title="About" />
              <Link href="/about/privacy-policy">Privacy Policy</Link>
              <Link href="/about/terms-of-use">Terms of Use</Link>
            </div>
            <div className="col-span-1 flex flex-col">
            </div>
            <div className="col-span-1 flex flex-col">
            </div>
            <div className="col-span-1 flex flex-col">
              
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Footer
