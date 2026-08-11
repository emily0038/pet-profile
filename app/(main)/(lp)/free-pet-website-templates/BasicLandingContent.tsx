'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PublicHeader from '@/components/publicHeader';
import Footer from '@/components/footer';

type PreviewMode = 'mobile' | 'desktop' | 'pro' | 'bubbly' | null;

const PREVIEW_URLS: Record<string, string> = {
  mobile: '/templates/basic/preview',
  desktop: '/templates/basic/preview',
  pro: '/templates/pro/preview',
  bubbly: '/templates/bubbly/preview',
};

const PREVIEW_TITLES: Record<string, string> = {
  mobile: 'Basic Template - Mobile View',
  desktop: 'Basic Template - Desktop View',
  pro: 'Professional Template Preview',
  bubbly: 'Bubbly Template Preview',
};

const TEMPLATE_INCLUDES = [
  'Header menu',
  'Hero',
  'About the business',
  'Services and pricing menu',
  'Photo gallery',
  'Service area',
  'Client reviews',
  'Contact',
  'Footer',
];

const DESIGNED_FOR = [
  'Dog walkers',
  'In-home pet sitters',
  'Cat sitters',
  'Daycare and boarding centers',
  'Pet taxis',
  'Pet groomers',
];

export default function BasicLandingContent() {
  const [previewMode, setPreviewMode] = useState<PreviewMode>(null);

  useEffect(() => {
    if (!previewMode) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewMode(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [previewMode]);

  return (
    <>
      <PublicHeader />

      <main>
        {/* Hero Section */}
        <section style={{
          textAlign: 'center',
          padding: '5rem 2rem 3rem',
          background: 'linear-gradient(to bottom, #F9FAFB 0%, white 100%)',
        }}>
          <h1 style={{
            fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
            fontSize: '3rem',
            fontWeight: 700,
            color: '#000000',
            lineHeight: 1.2,
            maxWidth: '48rem',
            margin: '0 auto 1.5rem',
          }}>
            Free Pet Website Templates
          </h1>
          <p style={{
            fontSize: '1.25rem',
            maxWidth: '40rem',
            margin: '0 auto 2rem',
            color: '#374151',
            lineHeight: 1.6,
          }}>
            Grow Your Pet Care Business with Professionally Designed Templates
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/waitlist"
              style={{
                background: '#000000',
                color: 'white',
                padding: '0.625rem 1.5rem',
                borderRadius: '0.25rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '1rem',
              }}
            >
              Get Started <span style={{ fontSize: '1.125rem' }}>→</span>
            </Link>
          </div>
        </section>

        {/* Template Info + Includes */}
        <section id="preview" style={{ background: 'white', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'start',
            }}>
              {/* Left: Template Preview + Description */}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#000000',
                  lineHeight: 1.2,
                  marginBottom: '1.5rem',
                }}>
                  Pets Friendz Basic Template
                </h2>
                <Image
                  src="/basic-preview-screens.png"
                  alt="Basic Preview screens"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  style={{ marginBottom: '1.5rem' }}
                />
                <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: 1.7, marginBottom: '1rem' }}>
                  The Basic template from Pets Friendz has all of the components you need to showcase your services
                  to potential clients. With its clean layout and customizable color palette, it provides a simple,
                  professional canvas for promoting your pet care brand.
                </p>
                <p style={{ fontSize: '1.125rem', color: '#374151', fontStyle: 'italic' }}>
                  Free to use, always.
                </p>
              </div>

              {/* Right: Template Includes + Designed For */}
              <div>
                <div style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                  marginBottom: '2rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '1.5rem',
                  }}>
                    Template Includes:
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    {TEMPLATE_INCLUDES.map((item) => (
                      <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1rem', color: '#374151' }}>
                        <span style={{ color: '#9185FF', fontWeight: 'bold', fontSize: '1.25rem' }}>✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <p style={{ fontSize: '1.125rem', color: '#374151', marginBottom: '1rem', fontWeight: 500 }}>
                  This template is highly customizable and perfect for:
                </p>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  {DESIGNED_FOR.map((label) => (
                    <div key={label} style={{
                      background: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '2rem',
                      border: '2px solid #9185FF',
                      fontWeight: 500,
                      color: '#9185FF',
                      fontSize: '0.95rem',
                      whiteSpace: 'nowrap',
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Cards (Mobile + Desktop) */}
        <section style={{ background: 'white', padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#000000',
              lineHeight: 1.3,
              textAlign: 'center',
              marginBottom: '3rem',
            }}>
              What Your Visitors Will See
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
          }}>
            {/* Mobile Preview Card */}
            <div style={{
              background: '#F9FAFB',
              padding: '2rem',
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div style={{
                margin: '0 auto 1.5rem',
                width: '180px',
                height: '320px',
                borderRadius: '24px',
                border: '3px solid #1a1a1a',
                overflow: 'hidden',
                position: 'relative',
                background: 'white',
              }}>
                <iframe
                  src="/templates/basic/preview"
                  style={{
                    width: '375px',
                    height: '667px',
                    border: 'none',
                    pointerEvents: 'none',
                    transform: 'scale(0.48)',
                    transformOrigin: 'top left',
                  }}
                  title="Basic template mobile preview"
                />
              </div>
              <h4 style={{
                fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '1rem',
              }}>
                Mobile View
              </h4>
              <button
                onClick={() => setPreviewMode('mobile')}
                style={{
                  background: 'transparent',
                  color: '#9185FF',
                  padding: '0.625rem 1.5rem',
                  border: '2px solid #9185FF',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                }}
              >
                Preview <span style={{ fontSize: '1.125rem' }}>→</span>
              </button>
            </div>

            {/* Desktop Preview Card */}
            <div style={{
              background: '#F9FAFB',
              padding: '2rem',
              borderRadius: '0.5rem',
              border: '1px solid #E5E7EB',
              textAlign: 'center',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div style={{
                margin: '0 auto 1.5rem',
                width: '100%',
                maxWidth: '400px',
                height: '250px',
                borderRadius: '8px',
                border: '3px solid #1a1a1a',
                overflow: 'hidden',
                position: 'relative',
                background: 'white',
              }}>
                <iframe
                  src="/templates/basic/preview"
                  style={{
                    width: '1280px',
                    height: '800px',
                    border: 'none',
                    pointerEvents: 'none',
                    transform: 'scale(0.3125)',
                    transformOrigin: 'top left',
                  }}
                  title="Basic template desktop preview"
                />
              </div>
              <h4 style={{
                fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#000000',
                marginBottom: '1rem',
              }}>
                Desktop View
              </h4>
              <button
                onClick={() => setPreviewMode('desktop')}
                style={{
                  background: 'transparent',
                  color: '#9185FF',
                  padding: '0.625rem 1.5rem',
                  border: '2px solid #9185FF',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '1rem',
                }}
              >
                Preview <span style={{ fontSize: '1.125rem' }}>→</span>
              </button>
            </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: '4rem 2rem', background: '#F9FAFB' }}>
          <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#000000',
              lineHeight: 1.3,
              textAlign: 'center',
              marginBottom: '3rem',
            }}>
              It&apos;s not just about the design...<br />
              Get this template to unlock built-in features
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '2rem',
            }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB' }}>
                <h3 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '0.75rem',
                }}>
                  Mobile-responsive design
                </h3>
                <p style={{ color: '#374151', lineHeight: 1.6 }}>
                  Designed to adapt seamlessly to any screen size using modern CSS. That means your pet care portfolio will look clean and polished whether clients find you on their phone, tablet, or desktop.
                </p>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB' }}>
                <h3 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '0.75rem',
                }}>
                  Customizable theme
                </h3>
                <p style={{ color: '#374151', lineHeight: 1.6 }}>
                  The Basic template comes in 5 themes: Default, Ocean, Sunny, Forest, and Coral. Choose the one that best fits your personality and brand identity.
                </p>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB' }}>
                <h3 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '0.75rem',
                }}>
                  Built for fast loading
                </h3>
                <p style={{ color: '#374151', lineHeight: 1.6 }}>
                  Powered by Next.js 15 and Turbopack, your site loads in a flash with optimized images, server-side rendering, and smart caching. Instantly engage your visitors while improving SEO performance.
                </p>
              </div>

              <div style={{ background: 'white', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #E5E7EB' }}>
                <h3 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '0.75rem',
                }}>
                  SEO-optimized
                </h3>
                <p style={{ color: '#374151', lineHeight: 1.6 }}>
                  Server-rendered with structured metadata, accessible elements, and clean URLs. This helps your pet care business rank higher on search engines and get discovered by local clients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How to Publish */}
        <section style={{
          background: 'linear-gradient(135deg, #E4E1FF 0%, #F9FAFB 100%)',
          padding: '4rem 2rem',
        }}>
          <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '3rem',
              alignItems: 'center',
            }}>
              {/* Left: Content */}
              <div>
                <h2 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '2.25rem',
                  fontWeight: 700,
                  color: '#000000',
                  marginBottom: '1rem',
                }}>
                  How to Publish
                </h2>
                <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: 1.7, marginBottom: '2rem' }}>
                  When you create an account with Pets Friendz, your website comes with built-in hosting. Once you build your page, it&apos;s ready to go live in just one click.
                </p>
                <div style={{
                  background: 'white',
                  borderLeft: '4px solid #9185FF',
                  padding: '1.5rem',
                  borderRadius: '0.5rem',
                }}>
                  <p style={{ marginBottom: '1rem', color: '#374151', lineHeight: 1.7 }}>
                    Every Pets Friendz account comes with a customizable subdomain that you can share
                    with potential clients and link across your social media and marketing materials.
                  </p>
                  <p style={{ color: '#374151', lineHeight: 1.7 }}>
                    You can also connect your own custom domain at no extra cost.
                  </p>
                </div>
              </div>

              {/* Right: Image */}
              <div>
                <Image
                  src="/publish-button.png"
                  alt="Publish button"
                  width={500}
                  height={400}
                  className="w-full h-auto"
                  style={{ borderRadius: '0.5rem' }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* More Templates */}
        <section style={{ padding: '4rem 2rem', background: 'white' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
            <h2 style={{
              fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
              fontSize: '2.25rem',
              fontWeight: 700,
              color: '#000000',
              textAlign: 'center',
              marginBottom: '1rem',
            }}>
              More Pet Website Templates to Try for Free
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#374151', lineHeight: 1.7, marginBottom: '3rem', textAlign: 'center' }}>
              Check out our other templates - all free to use.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}>
              {/* Professional Template Card */}
              <div style={{
                background: 'white',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  height: '250px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #2c5f4f 0%, #1a3d31 100%)',
                }}>
                  <iframe
                    src="/templates/pro/preview"
                    style={{
                      width: '200%',
                      height: '200%',
                      border: 'none',
                      pointerEvents: 'none',
                      transform: 'scale(0.5)',
                      transformOrigin: 'top left',
                    }}
                    title="Professional template preview"
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '0.5rem',
                  }}>
                    Professional
                  </h3>
                  <p style={{ color: '#6B7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Clean aesthetic with earthy tones. Comprehensive layout that subtly guides to action; minimalist yet inviting.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => setPreviewMode('pro')}
                      style={{
                        flex: 1,
                        padding: '0.625rem 1rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        background: 'white',
                        color: '#9185FF',
                        border: '2px solid #9185FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                      }}
                    >
                      Preview <span>→</span>
                    </button>
                    <Link
                      href="/waitlist"
                      style={{
                        flex: 1,
                        padding: '0.625rem 1rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        background: '#000000',
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                      }}
                    >
                      Try for Free <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Bubbly Template Card */}
              <div style={{
                background: 'white',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                border: '1px solid #E5E7EB',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}>
                <div style={{
                  height: '250px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #ff6b9d 0%, #ffc93c 100%)',
                }}>
                  <iframe
                    src="/templates/bubbly/preview"
                    style={{
                      width: '200%',
                      height: '200%',
                      border: 'none',
                      pointerEvents: 'none',
                      transform: 'scale(0.5)',
                      transformOrigin: 'top left',
                    }}
                    title="Bubbly template preview"
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#000000',
                    marginBottom: '0.5rem',
                  }}>
                    Bubbly
                  </h3>
                  <p style={{ color: '#6B7280', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    Playful design with soft pastel gradients. Perfect for services who want to showcase their fun and adorable personality.
                  </p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => setPreviewMode('bubbly')}
                      style={{
                        flex: 1,
                        padding: '0.625rem 1rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        cursor: 'pointer',
                        background: 'white',
                        color: '#9185FF',
                        border: '2px solid #9185FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                      }}
                    >
                      Preview <span>→</span>
                    </button>
                    <Link
                      href="/waitlist"
                      style={{
                        flex: 1,
                        padding: '0.625rem 1rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        background: '#000000',
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.375rem',
                      }}
                    >
                      Try for Free <span>→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'linear-gradient(135deg, #9185FF 0%, #5B4FC6 100%)',
          color: 'white',
          padding: '5rem 2rem',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
            fontSize: '2.25rem',
            fontWeight: 700,
            color: 'white',
            marginBottom: '1rem',
          }}>
            Ready to Launch Your Pet Care Website?
          </h2>
          <p style={{
            fontSize: '1.25rem',
            marginBottom: '2rem',
            maxWidth: '36rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            lineHeight: 1.6,
            color: 'white',
          }}>
            Start building your professional online presence today with our free templates.
          </p>
          <Link
            href="/waitlist"
            style={{
              background: 'white',
              color: '#9185FF',
              padding: '0.75rem 2rem',
              borderRadius: '0.25rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 600,
              fontSize: '1.125rem',
            }}
          >
            Get Started Free <span>→</span>
          </Link>
        </section>

        {/* Support Section */}
        <section style={{ padding: '4rem 2rem', textAlign: 'center', background: 'white' }}>
          <h2 style={{
            fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
            fontSize: '2.25rem',
            fontWeight: 700,
            color: '#000000',
            marginBottom: '1rem',
          }}>
            Support
          </h2>
          <p style={{
            maxWidth: '36rem',
            margin: '0 auto',
            fontSize: '1.125rem',
            color: '#374151',
            lineHeight: 1.7,
          }}>
            If you have any technical issues with this template, or if you need help building your website,
            feel free to reach out to{' '}
            <a href="mailto:emily@petsfriendz.com" style={{ color: '#9185FF', textDecoration: 'underline', fontWeight: 500 }}>
              emily@petsfriendz.com
            </a>.
          </p>
        </section>
      </main>

      <Footer />

      {/* Preview Modal */}
      {previewMode && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
          onClick={() => setPreviewMode(null)}
        >
          {previewMode === 'mobile' ? (
            /* Mobile Preview - iPhone-style frame */
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                maxWidth: '420px',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  color: 'white',
                  margin: 0,
                }}>
                  {PREVIEW_TITLES[previewMode]}
                </h2>
                <button
                  onClick={() => setPreviewMode(null)}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    border: 'none',
                    fontSize: '24px',
                    cursor: 'pointer',
                    color: 'white',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{
                width: '375px',
                height: '75vh',
                maxHeight: '812px',
                borderRadius: '40px',
                border: '8px solid #1a1a1a',
                overflow: 'hidden',
                background: 'white',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
                position: 'relative',
              }}>
                <iframe
                  src={PREVIEW_URLS[previewMode]}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  title={PREVIEW_TITLES[previewMode]}
                />
              </div>
            </div>
          ) : (
            /* Desktop / Template Preview - wide modal */
            <div
              style={{
                background: 'white',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '1400px',
                height: '90vh',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid #E5E7EB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <h2 style={{
                  fontFamily: 'var(--font-roboto-slab), Roboto Slab, serif',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#000000',
                  margin: 0,
                }}>
                  {PREVIEW_TITLES[previewMode]}
                </h2>
                <button
                  onClick={() => setPreviewMode(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '28px',
                    cursor: 'pointer',
                    color: '#374151',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '6px',
                  }}
                >
                  ×
                </button>
              </div>
              <div style={{
                flex: 1,
                overflow: 'hidden',
                background: '#F9FAFB',
              }}>
                <iframe
                  src={PREVIEW_URLS[previewMode]}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  title={PREVIEW_TITLES[previewMode]}
                />
              </div>
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid #E5E7EB',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
                <button
                  onClick={() => setPreviewMode(null)}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '6px',
                    fontSize: '15px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: 'white',
                    color: '#374151',
                    border: '2px solid #E5E7EB',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          main section h1 { font-size: 2rem !important; }
          main section h2 { font-size: 1.75rem !important; }
        }
        @media (max-width: 900px) {
          #preview > div > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 700px) {
          section > div > div[style*="repeat(2, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
