import React from 'react';
import { useContext } from 'react';
import { myContext } from './Context';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ArticleDetail() {
  const { currArticle } = useContext(myContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-red-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto animate-fade-in">
        <div className="space-y-8">
          {/* Image Section */}
          {currArticle.image && (
            <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <img 
                src={currArticle.image} 
                alt={currArticle.title}
                className="w-full h-96 object-cover transform transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-transparent to-transparent" />
            </div>
          )}

          {/* Content Section */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 leading-tight 
              bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              {currArticle.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-4 text-slate-600">
              <div className="flex items-center space-x-1.5 bg-red-50 px-3 py-1.5 rounded-full 
                text-sm font-medium text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm6 11a1 1 0 100 2h4a1 1 0 100-2h-4z" clipRule="evenodd" />
                </svg>
                <span>Source: {currArticle.source || 'Daily Chronicle'}</span>
              </div>
              
              {currArticle.createdAt && (
                <div className="flex items-center space-x-1.5 bg-slate-50 px-3 py-1.5 rounded-full 
                  text-sm font-medium text-slate-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span>{dayjs(currArticle.createdAt).format('MMM D, YYYY')}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-slate-700 space-y-4">
              {currArticle.content?.split('\n').map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}