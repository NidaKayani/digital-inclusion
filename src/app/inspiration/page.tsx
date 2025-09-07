"use client";

import { useState } from "react";
import BackButton from "@/components/BackButton";

interface Story {
  id: string;
  title: string;
  author: string;
  location: string;
  category: 'success' | 'innovation' | 'community' | 'technology';
  excerpt: string;
  fullStory: string;
  image: string;
  date: string;
  tags: string[];
}

interface Idea {
  id: string;
  title: string;
  description: string;
  category: 'teaching' | 'learning' | 'technology' | 'community';
  difficulty: 'easy' | 'medium' | 'advanced';
  timeRequired: string;
  materials: string[];
  steps: string[];
  icon: string;
}

const stories: Story[] = [
  {
    id: '1',
    title: 'Village School Boosts Math Outcomes by 35%',
    author: 'Sarah Johnson',
    location: 'Rural Kenya',
    category: 'success',
    excerpt: 'A small village school in Kenya transformed their math education using offline digital tools and peer learning circles.',
    fullStory: 'The Mwamba Primary School in rural Kenya faced significant challenges with math education. With limited resources and large class sizes, students struggled with basic mathematical concepts. However, by implementing a combination of offline digital materials, peer study circles, and gamified learning approaches, they achieved remarkable results. The school saw a 35% improvement in math test scores within just six months, with students showing increased confidence and engagement in mathematics.',
    image: '🏫',
    date: '2024-01-15',
    tags: ['math', 'rural education', 'peer learning', 'offline tools']
  },
  {
    id: '2',
    title: 'Student Creates Coding Club with Just One Laptop',
    author: 'Ahmed Hassan',
    location: 'Cairo, Egypt',
    category: 'innovation',
    excerpt: 'A 16-year-old student started a coding club that now serves 50+ students using a single shared laptop and offline resources.',
    fullStory: 'Ahmed Hassan, a high school student in Cairo, had a dream to teach programming to his peers. With only one laptop available, he created an innovative rotation system where students would take turns coding while others worked on paper-based exercises and group discussions. The club now has over 50 active members and has produced several students who went on to study computer science at university. Ahmed\'s approach demonstrates how creativity can overcome resource limitations.',
    image: '💻',
    date: '2024-01-10',
    tags: ['coding', 'youth leadership', 'resource sharing', 'innovation']
  },
  {
    id: '3',
    title: 'Community Library Bridges Digital Divide',
    author: 'Maria Santos',
    location: 'São Paulo, Brazil',
    category: 'community',
    excerpt: 'A community library in São Paulo created a mobile learning lab that travels to underserved neighborhoods.',
    fullStory: 'The Biblioteca Comunitária Esperança in São Paulo recognized that many children in their community lacked access to digital learning resources. They created a mobile learning lab equipped with tablets, offline educational content, and trained volunteers. The lab travels to different neighborhoods weekly, providing children with access to interactive learning materials, coding games, and digital literacy training. The initiative has reached over 500 children and has been replicated in three other communities.',
    image: '📚',
    date: '2024-01-05',
    tags: ['community', 'mobile learning', 'digital literacy', 'accessibility']
  }
];

const ideas: Idea[] = [
  {
    id: '1',
    title: 'Peer Study Circles with Downloadable Packs',
    description: 'Create small study groups that meet regularly with pre-downloaded learning materials.',
    category: 'learning',
    difficulty: 'easy',
    timeRequired: '2-3 hours setup',
    materials: ['Smartphone/tablet', 'Downloadable content', 'Meeting space'],
    steps: [
      'Form groups of 4-6 students',
      'Download learning materials for the week',
      'Assign roles (leader, note-taker, timekeeper)',
      'Meet twice weekly for 1-2 hours',
      'Share progress and help each other'
    ],
    icon: '👥'
  },
  {
    id: '2',
    title: 'Offline Coding Challenges',
    description: 'Design paper-based coding exercises that teach programming concepts without computers.',
    category: 'teaching',
    difficulty: 'medium',
    timeRequired: '1-2 hours per challenge',
    materials: ['Paper', 'Pencils', 'Challenge templates', 'Solution guides'],
    steps: [
      'Create algorithm flowcharts on paper',
      'Write pseudocode for simple programs',
      'Trace through code execution step-by-step',
      'Design user interfaces on paper',
      'Present solutions to the group'
    ],
    icon: '🧩'
  },
  {
    id: '3',
    title: 'Digital Storytelling Project',
    description: 'Students create multimedia stories using offline tools and share them with the community.',
    category: 'technology',
    difficulty: 'medium',
    timeRequired: '3-4 weeks',
    materials: ['Camera/phone', 'Audio recorder', 'Story templates', 'Presentation tools'],
    steps: [
      'Choose a local story or create original content',
      'Plan the story structure and characters',
      'Record audio narration and sound effects',
      'Create visual elements and illustrations',
      'Combine into final presentation'
    ],
    icon: '📖'
  },
  {
    id: '4',
    title: 'Community Tech Mentorship',
    description: 'Pair tech-savvy students with community members who want to learn digital skills.',
    category: 'community',
    difficulty: 'easy',
    timeRequired: 'Ongoing program',
    materials: ['Mentorship guidelines', 'Learning materials', 'Progress tracking'],
    steps: [
      'Identify tech-savvy students as mentors',
      'Recruit community members as mentees',
      'Match pairs based on interests and availability',
      'Provide structured learning materials',
      'Monitor progress and celebrate achievements'
    ],
    icon: '🤝'
  }
];

export default function InspirationPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'success' | 'innovation' | 'community' | 'technology'>('all');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedIdea, setSelectedIdea] = useState<Idea | null>(null);

  const filteredStories = selectedCategory === 'all' 
    ? stories 
    : stories.filter(story => story.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'innovation': return 'bg-blue-100 text-blue-800';
      case 'community': return 'bg-purple-100 text-purple-800';
      case 'technology': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-10 text-gray-900">
      <div className="page-hero mb-6 sm:mb-8 p-4 sm:p-6 md:p-10">
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <BackButton className="mt-1" />
        </div>
        <span className="badge badge-success text-xs sm:text-sm">Inspiration</span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-2 text-gray-900">
          Stories & Ideas
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-2xl">
          Discover success stories, innovative approaches, and creative ideas from the global digital inclusion community.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Category Filter */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Filter Stories</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { key: 'all', label: 'All Stories', icon: '🌟' },
              { key: 'success', label: 'Success Stories', icon: '🏆' },
              { key: 'innovation', label: 'Innovation', icon: '💡' },
              { key: 'community', label: 'Community', icon: '🤝' },
              { key: 'technology', label: 'Technology', icon: '⚡' }
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as 'all' | 'success' | 'innovation' | 'community' | 'technology')}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-200 ${
                  selectedCategory === category.key
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedStory(story)}
              >
                <div className="text-4xl mb-4">{story.image}</div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(story.category)}`}>
                    {story.category}
                  </span>
                  <span className="text-xs text-gray-500">{story.date}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                  {story.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>By {story.author}</span>
                  <span>{story.location}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {story.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Ideas */}
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Creative Ideas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="p-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-3xl">{idea.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
                        {idea.difficulty}
                      </span>
                      <span className="text-xs text-gray-500">{idea.timeRequired}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {idea.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {idea.description}
                    </p>
                    <div className="text-xs text-gray-500">
                      {idea.materials.length} materials needed
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Spotlight */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">🌟 Community Spotlight</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Global Reach</h3>
              <p className="text-sm text-gray-600">Stories from 25+ countries</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Active Community</h3>
              <p className="text-sm text-gray-600">10,000+ learners worldwide</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Innovation Hub</h3>
              <p className="text-sm text-gray-600">500+ creative solutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedStory.category)}`}>
                  {selectedStory.category}
                </span>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-4xl mb-4">{selectedStory.image}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedStory.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span>By {selectedStory.author}</span>
                <span>•</span>
                <span>{selectedStory.location}</span>
                <span>•</span>
                <span>{selectedStory.date}</span>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">{selectedStory.fullStory}</p>
              <div className="flex flex-wrap gap-2">
                {selectedStory.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Idea Modal */}
      {selectedIdea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedIdea.difficulty)}`}>
                  {selectedIdea.difficulty}
                </span>
                <button
                  onClick={() => setSelectedIdea(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="text-4xl mb-4">{selectedIdea.icon}</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedIdea.title}</h2>
              <p className="text-gray-700 mb-4">{selectedIdea.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Time Required</h3>
                  <p className="text-gray-600">{selectedIdea.timeRequired}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Materials Needed</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {selectedIdea.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Steps</h3>
                  <ol className="list-decimal list-inside text-gray-600 space-y-1">
                    {selectedIdea.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}