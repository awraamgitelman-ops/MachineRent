import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowRight, 
  Search, 
  Tag, 
  User, 
  Phone, 
  BookOpen
} from 'lucide-react';
import { BLOG_POSTS } from '../data/blogData';
import { setPageSeo } from '../utils/seo';

export default function BlogPage({ onOpenQuickLead }) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);

    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Блог та корисні статті AGRO RENTEX",
      "url": "https://agrorentex.com/blog",
      "description": "Актуальні статті про технології вирощування овочів, огляди сільгосптехніки Grimme, Struik, Domasz, практичні поради щодо налаштування та ремонту комбайнів в Україні.",
      "publisher": {
        "@type": "Organization",
        "name": "AGRO RENTEX",
        "url": "https://agrorentex.com"
      }
    };

    setPageSeo({
      title: 'Публікації та блог про с/г техніку | AGRO RENTEX',
      description: 'Корисні статті та агроаналітика 2026: налаштування картоплезбиральних комбайнів, зберігання в овочесховищах, фасувальні лінії Domasz та реставрація транспортерів.',
      canonicalUrl: 'https://agrorentex.com/blog',
      ogImage: '/api/media/KRMGHyFfQVsEHEgjBAUOE0JlBhZAHUdCGyIIHBs3CxpbEAhBIgQAGk4fe1dMAgIBHUckBgsNBk5dEB8bVkwUAgVYA15EWg.jpg',
      schemaData
    });
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(BLOG_POSTS.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      if (selectedCategory !== 'all' && post.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = post.title.toLowerCase().includes(q);
        const matchExcerpt = post.excerpt.toLowerCase().includes(q);
        const matchCat = post.category.toLowerCase().includes(q);
        if (!matchTitle && !matchExcerpt && !matchCat) return false;
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '80vh', paddingBottom: '60px' }}>
      
      {/* 1. Breadcrumbs Header */}
      <div style={{ backgroundColor: '#f8f8f8', borderBottom: '1px solid #eaeaea', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', fontSize: '13px', color: '#777', gap: '6px' }}>
          <Link to="/" style={{ color: '#333', fontWeight: 500 }}>Головна</Link>
          <ChevronRight size={14} color="#aaa" />
          <span style={{ color: 'var(--wd-primary-color)', fontWeight: 600 }}>Публікації та статті</span>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '40px' }}>
        
        {/* Header Title Section */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#fff4eb',
            color: 'var(--wd-primary-color)',
            padding: '4px 12px',
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '10px',
            borderLeft: '3px solid var(--wd-primary-color)'
          }}>
            <span>Блог та агроаналітика</span>
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#111111', margin: '0 0 10px 0' }}>
            Корисні публікації та новини агроринку
          </h1>
          <p style={{ fontSize: '15px', color: '#666', margin: 0, maxWidth: '750px' }}>
            Практичні рекомендації інженерів AGRO RENTEX, аналітика ринку овочівництва України 2026, секрети налаштування техніки та сучасні методи збереження врожаю.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          backgroundColor: '#fafafa',
          border: '1px solid #eaeaea',
          padding: '14px 18px',
          borderRadius: '6px',
          marginBottom: '36px'
        }}>
          
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  border: selectedCategory === cat ? '1px solid var(--wd-primary-color)' : '1px solid #dcdcdc',
                  backgroundColor: selectedCategory === cat ? 'var(--wd-primary-color)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : '#333333',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat === 'all' ? 'Всі публікації' : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <input
              type="text"
              placeholder="Пошук статей..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                height: '38px',
                padding: '0 34px 0 12px',
                border: '1px solid #d2d2d2',
                borderRadius: '4px',
                fontSize: '13px'
              }}
            />
            <Search size={16} color="#888" style={{ position: 'absolute', right: '10px', top: '11px' }} />
          </div>

        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', backgroundColor: '#fafafa', border: '1px solid #eaeaea' }}>
            <BookOpen size={36} color="#999" style={{ margin: '0 auto 12px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '8px' }}>
              Статей за запитом не знайдено
            </h3>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="btn-adena-primary"
              style={{ marginTop: '12px' }}
            >
              Скинути пошук
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate(`/blog/${post.slug}`)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #eaeaea',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
                }}
              >
                
                {/* Image */}
                <div style={{ position: 'relative', height: '210px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: 'rgba(17, 17, 17, 0.85)',
                    color: '#ffffff',
                    padding: '4px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    borderRadius: '3px'
                  }}>
                    {post.category}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    {/* Meta Date & Read Time */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} color="var(--wd-primary-color)" />
                        <span>{post.formattedDate}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="#888" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 style={{
                      fontSize: '17px',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: '#111111',
                      marginBottom: '10px'
                    }}>
                      <Link to={`/blog/${post.slug}`} onClick={(e) => e.stopPropagation()} style={{ color: '#111' }}>
                        {post.title}
                      </Link>
                    </h2>

                    {/* Excerpt */}
                    <p style={{
                      fontSize: '13px',
                      lineHeight: 1.6,
                      color: '#666666',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div style={{
                    borderTop: '1px solid #f0f0f0',
                    paddingTop: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontSize: '12px', color: '#888' }}>{post.author}</span>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: 'var(--wd-primary-color)'
                    }}>
                      <span>Читати далі</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>

                </div>

              </article>
            ))}
          </div>
        )}

      </div>

      {/* Consultation Banner */}
      <section className="container" style={{ marginTop: '56px' }}>
        <div style={{
          backgroundColor: '#1d1d1d',
          color: '#ffffff',
          padding: '36px 32px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', margin: '0 0 6px 0' }}>
              Маєте питання щодо вибору техніки під ваші ґрунти?
            </h3>
            <p style={{ fontSize: '13px', color: '#bbb', margin: 0 }}>
              Наші інженери з радістю нададуть індивідуальну консультацію та розрахунок окупності.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href="tel:+380966610100"
              style={{ color: 'var(--wd-accent-yellow)', fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Phone size={18} />
              <span>+38 (096) 66 10 100</span>
            </a>
            <button
              onClick={() => onOpenQuickLead('Консультація з блогу')}
              className="btn-adena-primary"
              style={{ height: '42px', padding: '0 20px', fontWeight: 600, fontSize: '13px' }}
            >
              Замовити дзвінок
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
