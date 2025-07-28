// import React, { useState, useEffect } from 'react';
// import ListingCard from '@/components/ListingCard';
// import { Button } from '@/components/ui/button';
// import { Search, MapPin, Filter } from 'lucide-react';
// import { supabase } from '@/integrations/supabase/client';
// import { useAuth } from '@/components/AuthProvider';
// import { Navigate } from 'react-router-dom';

// const Agencies = () => {
//   const { user, userRole, loading: authLoading } = useAuth();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const countries = ['United States', 'France', 'Italy', 'Spain', 'Canada', 'Australia'];

//   const fetchListings = async () => {
//     setLoading(true);
//     let query = supabase.from('listings').select('*').eq('type', 'agency');
//     if (searchQuery) {
//       query = query.ilike('title', `%${searchQuery}%`);
//     }
//     if (selectedCountry) {
//       query = query.eq('country', selectedCountry);
//     }
//     const { data, error } = await query;
//     if (!error) setListings(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchListings();
//     // eslint-disable-next-line
//   }, []);

//   const handleSearch = () => {
//     fetchListings();
//   };

//   const resetFilters = () => {
//     setSearchQuery('');
//     setSelectedCountry('');
//     fetchListings();
//   };

//   if (authLoading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }
//   if (!user || (userRole !== 'user' && userRole !== 'dmc')) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
//       <div className="container mx-auto px-4 py-16">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
//             Top Travel <span className="text-primary">Agencies</span>
//           </h1>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Discover certified travel agencies worldwide, ranked by customer satisfaction and service excellence.
//           </p>
//         </div>

//         {/* Search & Filter */}
//         <div className="max-w-4xl mx-auto mb-12">
//           <div className="card-gradient rounded-xl p-6 shadow-travel border border-border">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
//                 <input
//                   type="text"
//                   placeholder="Search agencies..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
//               />
//               </div>
              
//               <select
//                 value={selectedCountry}
//                 onChange={(e) => setSelectedCountry(e.target.value)}
//                 className="w-full p-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-travel"
//               >
//                 <option value="">All Countries</option>
//                 {countries.map((country) => (
//                   <option key={country} value={country}>{country}</option>
//                 ))}
//               </select>

//               <div className="flex gap-2">
//                 <Button onClick={handleSearch} className="flex-1">
//                   <Search className="h-4 w-4 mr-2" />
//                   Search
//                 </Button>
//                 <Button variant="outline" onClick={resetFilters}>
//                   Reset
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Results */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {loading ? (
//             <div className="col-span-full text-center py-16">Loading...</div>
//           ) : listings.length > 0 ? (
//             listings.map((listing) => (
//               <ListingCard key={listing.id} {...listing} />
//             ))
//           ) : (
//             <div className="col-span-full text-center py-16">
//               <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-2xl font-bold text-foreground mb-2">No agencies found</h3>
//               <p className="text-muted-foreground">Try adjusting your search criteria.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Agencies;