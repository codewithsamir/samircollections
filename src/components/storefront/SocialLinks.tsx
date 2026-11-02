import React from 'react';
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import type { SiteSettingsData, SocialKey } from '@/helpers/siteData';

const ICONS: Record<SocialKey, { icon: React.ElementType; label: string }> = {
  facebook: { icon: FaFacebookF, label: 'Facebook' },
  instagram: { icon: FaInstagram, label: 'Instagram' },
  tiktok: { icon: FaTiktok, label: 'TikTok' },
  youtube: { icon: FaYoutube, label: 'YouTube' },
  twitter: { icon: FaXTwitter, label: 'X (Twitter)' },
};

interface SocialLinksProps {
  socials: SiteSettingsData['socials'];
  size?: 'sm' | 'lg';
  tone?: 'dark' | 'light'; // dark = on maroon backgrounds, light = on white backgrounds
}

// Renders only the social accounts the admin has filled in
const SocialLinks: React.FC<SocialLinksProps> = ({ socials, size = 'sm', tone = 'dark' }) => {
  const links = (Object.keys(ICONS) as SocialKey[]).filter((key) => socials?.[key]);
  if (!links.length) return null;

  const box = size === 'lg' ? 'w-14 h-14 text-xl' : 'w-10 h-10 text-base';
  const colors =
    tone === 'dark'
      ? 'border-gold/60 text-gold hover:bg-gold hover:text-brand-dark'
      : 'border-brand/30 text-brand hover:bg-brand hover:text-gold';

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((key) => {
        const { icon: Icon, label } = ICONS[key];
        return (
          <a
            key={key}
            href={socials[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`${box} ${colors} rounded-full border flex items-center justify-center hover:-translate-y-0.5 transition-all`}
          >
            <Icon />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
