'use client';

import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('Contact');

  return (
    <div className="min-h-screen bg-[#1A393E] pt-24">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#ECE5D5] mb-4">{t('title')}</h1>
            <p className="text-[#ECE5D5]/80 max-w-2xl mx-auto">{t('description')}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail className="text-[#F7EC73] mt-1" size={24} />
                <div>
                  <h3 className="text-[#ECE5D5] font-semibold mb-2">{t('email.title')}</h3>
                  <p className="text-[#ECE5D5]/80">{t('email.value')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="text-[#F7EC73] mt-1" size={24} />
                <div>
                  <h3 className="text-[#ECE5D5] font-semibold mb-2">{t('phone.title')}</h3>
                  <p className="text-[#ECE5D5]/80">{t('phone.value')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="text-[#F7EC73] mt-1" size={24} />
                <div>
                  <h3 className="text-[#ECE5D5] font-semibold mb-2">{t('address.title')}</h3>
                  <p className="text-[#ECE5D5]/80">{t('address.value')}</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#ECE5D5] mb-2">{t('form.name')}</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-[#ECE5D5]/10 border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] focus:outline-none focus:border-[#F7EC73] transition-colors"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#ECE5D5] mb-2">{t('form.email')}</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-[#ECE5D5]/10 border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] focus:outline-none focus:border-[#F7EC73] transition-colors"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#ECE5D5] mb-2">{t('form.message')}</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-[#ECE5D5]/10 border border-[#ECE5D5]/20 rounded-lg text-[#ECE5D5] focus:outline-none focus:border-[#F7EC73] transition-colors resize-none"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#F7EC73] text-[#1A393E] py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#F7EC73]/90 transition-colors"
              >
                <Send size={18} />
                {t('form.submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 