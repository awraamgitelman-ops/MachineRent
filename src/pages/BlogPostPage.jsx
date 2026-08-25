import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Share2, 
  Phone, 
  User, 
  Tag, 
  BookOpen
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { setPageSeo } from '../utils/seo';

export default function BlogPostPage({ onOpenQuickLead }) {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = useMemo(() => {
    if (!slug) return null;
    return BLOG_POSTS.find(p => p.slug === slug || p.id === slug);
  }, [slug]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": [post.image],
        "datePublished": "2026-08-20T10:00:00+03:00",
        "dateModified": "2026-08-20T12:00:00+03:00",
        "author": {
          "@type": "Person",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "AGRORENTEX",
          "logo": {
            "@type": "ImageObject",
            "url": "https://agrorentex.com/favicon.svg"
          }
        },
        "description": post.excerpt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://agrorentex.com/blog/${post.slug}`
        }
      };

      setPageSeo({
        title: `${post.title} | Блог AGRORENTEX`,
        description: post.excerpt,
        canonicalUrl: `https://agrorentex.com/blog/${post.slug}`,
        ogImage: post.image,
        ogType: 'article',
        schemaData
      });
    }
  }, [post]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);
  }, [post]);

  if (!post) {
    return (
      <div className="container" style={{ padding: '80px 15px', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '26px', color: '#111', marginBottom: '12px' }}>Статтю не знайдено</h2>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '24px' }}>
          Можливо, публікацію було переміщено або видалено.
        </p>
        <Link 
          to="/blog" 
          className="btn-adena-primary" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontWeight: 600 }}
        >
          <span>Повернутися до всіх публікацій</span>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Header */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', flexWrap: 'wrap', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <Link to="/blog" style={{ color: '#333', fontWeight: 500 }}>Публікації</Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>{post.category}</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '32px' }}>
        
        {/* Back Button */}
        <div style={{ marginBottom: '24px' }}>
          <button
            onClick={() => navigate('/blog')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'none',
              border: 'none',
              color: '#666',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            <ArrowLeft size={16} />
            <span>Всі публікації</span>
          </button>
        </div>

        {/* 2. Article Header & Meta */}
        <div style={{ maxWidth: '880px', margin: '0 auto', marginBottom: '32px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
            <span style={{
              backgroundColor: '#fff4eb',
              color: 'var(--wd-primary-color)',
              padding: '4px 12px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '0px',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {post.category}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#777' }}>
              <Calendar size={14} color="#888" />
              <span>{post.formattedDate}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#777' }}>
              <Clock size={14} color="#888" />
              <span>Час читання: {post.readTime}</span>
            </div>
          </div>

          <h1 style={{
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.3,
            color: '#111111',
            marginBottom: '16px'
          }}>
            {post.title}
          </h1>
        </div>

        {/* 3. Main Article Image */}
        <div style={{
          maxWidth: '880px',
          margin: '0 auto 36px auto',
          borderRadius: '0px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          backgroundColor: '#f6f6f6'
        }}>
          <img
            src={post.image}
            alt={post.title}
            style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* 4. Article HTML Body */}
        <div 
          style={{
            maxWidth: '880px',
            margin: '0 auto 48px auto',
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#333333'
          }}
          className="blog-content-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* 5. Consultation Box inside Article */}
        <div style={{
          maxWidth: '880px',
          margin: '0 auto 56px auto',
          backgroundColor: '#fffaf5',
          border: '1px solid #fed7aa',
          padding: '28px',
          borderRadius: '0px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#9a3412', margin: '0 0 6px 0' }}>
              Бажаєте отримати індивідуальну консультацію інженера?
            </h3>
            <p style={{ fontSize: '14px', color: '#7c2d12', margin: 0 }}>
              Допоможемо підібрати обладнання та налаштувати робочі органи під специфіку ваших полів.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => onOpenQuickLead(`Консультація за статтею: ${post.title}`)}
              className="btn-adena-primary"
              style={{ height: '44px', padding: '0 20px', fontWeight: 600, fontSize: '14px' }}
            >
              <span>Замовити консультацію</span>
            </button>
            <a
              href="tel:+380970079746"
              className="btn-adena-secondary"
              style={{ height: '44px', padding: '0 16px', fontWeight: 600, fontSize: '14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Phone size={15} color="var(--wd-primary-color)" />
              <span>+38 (097) 007-97-46</span>
            </a>
          </div>
        </div>

        {/* 6. Related Articles */}
        {relatedPosts.length > 0 && (
          <div style={{ maxWidth: '880px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '20px' }}>
              Читайте також
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px'
            }}>
              {relatedPosts.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigate(`/blog/${rel.slug}`)}
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #eaeaea',
                    borderRadius: '0px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--wd-primary-color)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = '#eaeaea'}
                >
                  <div>
                    <img
                      src={rel.image}
                      alt={rel.title}
                      style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                    />
                    <div style={{ padding: '14px' }}>
                      <div style={{ fontSize: '11px', color: 'var(--wd-primary-color)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        {rel.category}
                      </div>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#111', lineHeight: 1.35, margin: 0 }}>
                        {rel.title}
                      </h3>
                    </div>
                  </div>

                  <div style={{ padding: '0 14px 14px 14px', fontSize: '12px', color: '#888' }}>
                    {rel.formattedDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
