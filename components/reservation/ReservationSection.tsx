'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Container from '@/components/ui/Container';
import MagneticButton from '@/components/ui/MagneticButton';
import { useReservationScroll } from '@/hooks/useReservationScroll';
import { reservationSchema, type ReservationFormData } from '@/lib/reservationSchema';

/**
 * Reservation Section - 预约表单区块
 * 包含预约表单和提交按钮
 */
export default function ReservationSection() {
  // Refs for scroll animations
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formFieldsRef = useRef<HTMLFormElement>(null);
  const infoBlocksRef = useRef<HTMLDivElement>(null);

  // React Hook Form + Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  // Form submission handler (console.log only, no backend)
  const onSubmit = (data: ReservationFormData) => {
    console.log('Reservation submitted:', data);
    // TODO: Replace with actual API call in future phase
  };

  // Initialize scroll animations
  useReservationScroll({
    label: labelRef,
    title: titleRef,
    formFields: formFieldsRef,
    infoBlocks: infoBlocksRef,
  });

  return (
    <section
      className="relative w-full py-20 lg:py-40"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Container>
        {/* Section Label */}
        <p
          ref={labelRef}
          className="mb-8 text-center font-body text-xs tracking-[0.3em]"
          style={{ color: 'var(--color-gold)' }}
        >
          RESERVATIONS
        </p>

        {/* Section Title */}
        <h2
          ref={titleRef}
          className="mb-16 text-center font-display text-[clamp(3rem,6vw,4rem)] font-light tracking-wide lg:mb-20"
          style={{
            color: 'var(--color-cream)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Join Us
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Left: Form */}
          <div>
            <form ref={formFieldsRef} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-body text-xs tracking-[0.2em]"
                  style={{ color: 'var(--color-gold)' }}
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  aria-invalid={errors.name ? 'true' : 'false'}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  className="field-line px-0 py-3 font-body text-base"
                />
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-xs"
                    style={{ color: 'var(--color-gold)' }}
                    role="alert"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-body text-xs tracking-[0.2em]"
                  style={{ color: 'var(--color-gold)' }}
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="field-line px-0 py-3 font-body text-base"
                />
                {errors.email && (
                  <p
                    id="email-error"
                    className="text-xs"
                    style={{ color: 'var(--color-gold)' }}
                    role="alert"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Date and Party Size Row */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Date Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="date"
                    className="font-body text-xs tracking-[0.2em]"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    DATE
                  </label>
                  <input
                    type="date"
                    id="date"
                    {...register('date')}
                    aria-invalid={errors.date ? 'true' : 'false'}
                    aria-describedby={errors.date ? 'date-error' : undefined}
                    className="field-line px-0 py-3 font-body text-base"
                  />
                  {errors.date && (
                    <p
                      id="date-error"
                      className="text-xs"
                      style={{ color: 'var(--color-gold)' }}
                      role="alert"
                    >
                      {errors.date.message}
                    </p>
                  )}
                </div>

                {/* Party Size Field */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="guests"
                    className="font-body text-xs tracking-[0.2em]"
                    style={{ color: 'var(--color-gold)' }}
                  >
                    PARTY SIZE
                  </label>
                  <select
                    id="guests"
                    {...register('guests')}
                    aria-invalid={errors.guests ? 'true' : 'false'}
                    aria-describedby={errors.guests ? 'guests-error' : undefined}
                    className="field-line px-0 py-3 font-body text-base"
                  >
                    <option value="">Select</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num} style={{ backgroundColor: 'var(--color-bg)' }}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p
                      id="guests-error"
                      className="text-xs"
                      style={{ color: 'var(--color-gold)' }}
                      role="alert"
                    >
                      {errors.guests.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Special Requests Field */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="notes"
                  className="font-body text-xs tracking-[0.2em]"
                  style={{ color: 'var(--color-gold)' }}
                >
                  SPECIAL REQUESTS
                </label>
                <textarea
                  id="notes"
                  {...register('notes')}
                  rows={4}
                  aria-invalid={errors.notes ? 'true' : 'false'}
                  aria-describedby={errors.notes ? 'notes-error' : undefined}
                  className="field-line resize-none px-0 py-3 font-body text-base"
                />
                {errors.notes && (
                  <p
                    id="notes-error"
                    className="text-xs"
                    style={{ color: 'var(--color-gold)' }}
                    role="alert"
                  >
                    {errors.notes.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <MagneticButton
                type="submit"
                disabled={isSubmitting}
                className="btn-solid-gold mt-8 self-start px-12 py-4 font-body text-sm tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Submit reservation request"
              >
                {isSubmitting ? 'SUBMITTING...' : 'RESERVE NOW'}
              </MagneticButton>
            </form>
          </div>

          {/* Right: Information */}
          <div ref={infoBlocksRef} className="flex flex-col gap-12">
            <div>
              <h3
                className="mb-4 font-display text-2xl font-light tracking-wide"
                style={{ color: 'var(--color-gold)' }}
              >
                Reservation Note
              </h3>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                We recommend booking at least 48 hours in advance. For parties of 8 or more,
                please contact us directly at reservations@harbortable.com or call (212) 555-0123.
              </p>
            </div>

            <div>
              <h3
                className="mb-4 font-display text-2xl font-light tracking-wide"
                style={{ color: 'var(--color-gold)' }}
              >
                Hours
              </h3>
              <div
                className="flex flex-col gap-2 font-body text-base"
                style={{ color: 'var(--color-muted)' }}
              >
                <p>Monday - Thursday: 5PM - 10PM</p>
                <p>Friday - Saturday: 5PM - 11PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h3
                className="mb-4 font-display text-2xl font-light tracking-wide"
                style={{ color: 'var(--color-gold)' }}
              >
                Private Dining
              </h3>
              <p
                className="font-body text-base leading-relaxed"
                style={{ color: 'var(--color-muted)' }}
              >
                Our private dining room accommodates up to 20 guests for intimate celebrations
                and corporate events. Contact us to discuss your special occasion.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}




