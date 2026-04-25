import type { Metadata } from 'next'
import ContactForm from '@/components/main/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with ItalyCreatives for creative crew bookings in Italy. We respond to production inquiries within 24 hours with availability and rates.',
  alternates: { canonical: 'https://italycreatives.com/contact' },
}

export default function ContactPage() {
  return <ContactForm />
}
