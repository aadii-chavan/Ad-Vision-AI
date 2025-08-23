import LogoLoop from './LogoLoop';
import { SiGoogleads, SiMeta, SiLinkedin, SiInstagram, SiX, SiNike, SiGithub } from 'react-icons/si';

const TrustedBy = () => {
  const techLogos = [
    { node: <SiGoogleads />, title: 'Google Ads', href: 'https://ads.google.com' },
    { node: <SiMeta />, title: 'Meta Ads', href: 'https://www.facebook.com/business/ads' },
    { node: <SiLinkedin />, title: 'LinkedIn Ads', href: 'https://business.linkedin.com/marketing-solutions/ads' },
    { node: <SiInstagram />, title: 'Instagram Ads', href: 'https://www.facebook.com/business/instagram/advertising' },
    { node: <SiX />, title: 'X (Twitter) Ads', href: 'https://ads.twitter.com' },
    { node: <SiNike />, title: 'Nike', href: 'https://www.nike.com' },
    { node: <SiGithub />, title: 'Github', href: 'https://github.com' },
  ];

  return (
    <section className="pt-2 pb-1 border-b border-border/10">
      <div className="container mx-auto px-6">
        <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
          <LogoLoop
            logos={techLogos}
            speed={80}
            direction="left"
            logoHeight={64}
            gap={80}
            pauseOnHover
            scaleOnHover
            fadeOut={false}
            ariaLabel="Technology partners"
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;