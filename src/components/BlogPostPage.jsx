import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';

const BlogPostPage = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blog/${slug}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setPost(data); })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="text-center py-32">
        <p className="text-2xl font-bold text-gray-400 mb-4">Yazı bulunamadı</p>
        <Link to="/blog" className="text-blue-600 hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Blog'a dön
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <article className="max-w-3xl mx-auto">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors mb-8"
        >
          <ArrowLeft size={16} /> Blog'a dön
        </Link>

        {post.ogImage && (
          <img
            src={post.ogImage}
            alt={post.title}
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg mb-8"
            loading="lazy"
          />
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs font-medium px-3 py-1 bg-blue-50 text-blue-600 rounded-full"
            >
              <Tag size={10} /> {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-100">
          {post.author && (
            <span className="flex items-center gap-1">
              <User size={14} /> {post.author}
            </span>
          )}
          {post.date && (
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('tr-TR', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
          )}
        </div>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt || post.metaDescription,
            image: post.ogImage,
            author: { '@type': 'Person', name: post.author },
            datePublished: post.date,
            publisher: {
              '@type': 'Organization',
              name: 'Galipler Yapı Malzemeleri A.Ş.',
              url: 'https://galipler.com',
            },
          })
        }} />
      </article>
    </div>
  );
};

export default BlogPostPage;
