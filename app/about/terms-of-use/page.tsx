import Container from '@/app/components/Container'
import TermsOfUseClient from './TermsOfUseClient'


export default async function TermsOfUsePage() {
  return (
    <Container>
      <div className="pt-10">
        <TermsOfUseClient />
      </div>
    </Container>
  )
}