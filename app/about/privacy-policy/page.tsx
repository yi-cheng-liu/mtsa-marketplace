import Container from '@/app/components/Container'
import PrivacyPolicyClient from './PrivacyPolicyClient'


export default async function PrivacyPolicyPage() {
  return (
    <Container>
      <div className="pt-10">
        <PrivacyPolicyClient />
      </div>
    </Container>
  )
}