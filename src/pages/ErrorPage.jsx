import { CloudOffIcon, EnvelopeIcon, PhoneIcon } from '@/components/ui/icons';
import PropTypes from 'prop-types';

/**
 * Error page displayed when profile data fails to load.
 * Shows a friendly message and optional contact information.
 *
 * @param {object} props - Component props
 * @param {object} props.source - Source data with fallback contact info
 * @returns {JSX.Element} The rendered error page
 */
export function ErrorPage({ source }) {
  const { email, firstName, lastName, phone, showContactOnError } = source || {};
  const name = [firstName, lastName].filter(Boolean).join(' ');

  // Format phone number for display and tel: link
  const phoneNumber = phone ? `${phone.countryCode}${phone.number}` : null;
  const phoneDisplay = phone ? `${phone.countryCode} ${phone.number}` : null;

  const hasContactInfo = showContactOnError && (email || phone);

  const containerClasses = [
    'flex min-h-screen flex-col items-center justify-center',
    'bg-[var(--color-bg)] p-4 pb-32 text-center',
  ].join(' ');

  const cloudIconClasses = ['mb-6 size-16 sm:size-20 md:size-24', 'text-primary opacity-80'].join(
    ' ',
  );

  const headingClasses = [
    'mb-3 text-xl font-bold sm:text-2xl md:text-3xl',
    'text-[var(--color-text)]',
  ].join(' ');

  const messageClasses = [
    'mb-2 max-w-md text-sm sm:text-base',
    'text-[var(--color-text)] opacity-60',
  ].join(' ');

  const contactLinkClasses = [
    'inline-flex items-center gap-2',
    'text-primary underline underline-offset-4',
    'hover:opacity-80 transition-opacity',
  ].join(' ');

  return (
    <div className={containerClasses}>
      <CloudOffIcon className={cloudIconClasses} />

      <h1 className={headingClasses}>{name ? `${name}'s Portfolio` : 'Portfolio'}</h1>

      <p className={messageClasses}>
        We&apos;re having trouble loading this profile right now. Please refresh the page or try
        again in a few minutes.
      </p>

      {hasContactInfo && (
        <>
          <p className={`${messageClasses} mb-6`}>
            In the meantime, you can contact {firstName || 'them'} to request a resume or report
            this technical issue.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm sm:text-base">
            {email && (
              <a className={contactLinkClasses} href={`mailto:${email}`}>
                <EnvelopeIcon className="size-5" />
                <span>{email}</span>
              </a>
            )}
            {phoneNumber && (
              <a className={contactLinkClasses} href={`tel:${phoneNumber}`}>
                <PhoneIcon className="size-5" />
                <span>{phoneDisplay}</span>
              </a>
            )}
          </div>
        </>
      )}
    </div>
  );
}

ErrorPage.propTypes = {
  source: PropTypes.shape({
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.shape({
      countryCode: PropTypes.string,
      number: PropTypes.string,
    }),
    showContactOnError: PropTypes.bool,
  }),
};
