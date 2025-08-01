import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

const dummyResults = [
  {
    id: 1,
    title: 'Top 10 Beaches in Goa',
    description: 'Discover the best beaches to visit in Goa for relaxation and adventure.',
    image: 'https://source.unsplash.com/400x200/?beach,goa',
  },
  {
    id: 2,
    title: 'Top 10 Hill Stations in Himachal',
    description: 'Explore the serene hill stations of Himachal Pradesh perfect for your next trip.',
    image: 'https://source.unsplash.com/400x200/?hillstation,himachal',
  },
  {
    id: 3,
    title: 'Top 10 Heritage Sites in India',
    description: 'A curated list of India\'s most iconic heritage destinations.',
    image: 'https://source.unsplash.com/400x200/?heritage,india',
  },
];

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(dummyResults);

  const handleSearch = () => {
    // For now, it returns the same dummy data
    const filtered = dummyResults.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Travel Top10</h1>

        <div className="flex gap-2 mb-8">
          <Input
            type="text"
            placeholder="Search top 10 travel places..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} className="flex gap-1">
            <Search size={18} />
            Search
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {results.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
              <CardHeader>
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}

          {results.length === 0 && (
            <p className="text-center col-span-full text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
