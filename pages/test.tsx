'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Search, GraduationCap, TrendingUp, Briefcase, DollarSign, Users, MessageSquare, Star, ThumbsUp, ThumbsDown, X, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { cn } from "@/lib/utils"
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Skeleton } from "@/components/ui/skeleton"

const jobGrowthOptions = [
  { value: 'Low', label: 'Low (0-5%)' },
  { value: 'Medium', label: 'Medium (6-15%)' },
  { value: 'High', label: 'High (16%+)' },
]

const majors = [
  "Accounting", "Actuarial Science", "Advertising Major", "Aerospace Engineering",
  "African Languages, Literatures, and Linguistics", "African Studies", "African-American Studies",
  "Agricultural Business and Management", "Agricultural Economics", "Agricultural Education",
  "Agricultural Journalism", "Agricultural Mechanization Major", "Agricultural Technology Management",
  "Agriculture", "Agronomy and Crop Science",
  "Air Traffic Control", "American History", "American Literature", "American Sign Language",
  "American Studies", "Anatomy", "Ancient Studies", "Animal Behavior and Ethology", "Animal Science",
  "Animation and Special Effects", "Anthropology", "Applied Mathematics", "Aquaculture",
  "Aquatic Biology", "Arabic", "Archeology", "Architectural Engineering", "Architectural History",
  "Architecture", "Art", "Art Education", "Art History", "Art Therapy", "Artificial Intelligence and Robotics",
  "Asian-American Studies", "Astronomy", "Astrophysics", "Athletic Training", "Atmospheric Science",
  "Automotive Engineering", "Aviation", "Bakery Science", "Biblical Studies", "Biochemistry",
  "Bioethics", "Biology", "Biomedical Engineering", "Biomedical Science", "Biopsychology",
  "Biotechnology", "Botany/Plant Biology", "Business Administration/Management", "Business Communications",
  "Business Education", "Canadian Studies", "Caribbean Studies", "Cell Biology Major", "Ceramic Engineering",
  "Ceramics", "Chemical Engineering Major", "Chemical Physics", "Chemistry Major", "Child Care",
  "Child Development", "Chinese", "Chiropractic", "Church Music", "Cinematography and Film/Video Production",
  "Circulation Technology", "Civil Engineering", "Classics", "Clinical Psychology", "Cognitive Psychology",
  "Communication Disorders", "Communications Studies/Speech Communication and Rhetoric", "Comparative Literature",
  "Computer and Information Science", "Computer Engineering", "Computer Graphics", "Computer Systems Analysis Major",
  "Construction Management", "Counseling", "Crafts", "Creative Writing", "Criminal Science", "Criminology",
  "Culinary Arts", "Dance", "Data Processing", "Dental Hygiene", "Developmental Psychology",
  "Diagnostic Medical Sonography", "Dietetics", "Digital Communications and Media/Multimedia", "Drawing",
  "Early Childhood Education", "East Asian Studies", "East European Studies", "Ecology", "Economics Major",
  "Education", "Education Administration", "Education of the Deaf", "Educational Psychology", "Electrical Engineering",
  "Elementary Education", "Engineering Mechanics", "Engineering Physics", "English", "English Composition",
  "English Literature Major", "Entomology", "Entrepreneurship Major", "Environmental Design/Architecture",
  "Environmental Science", "Environmental/Environmental Health Engineering", "Epidemiology", "Equine Studies",
  "Ethnic Studies", "European History", "Experimental Pathology", "Experimental Psychology", "Fashion Design",
  "Fashion Merchandising", "Feed Science", "Fiber, Textiles, and Weaving Arts", "Film", "Finance", "Floriculture",
  "Food Science", "Forensic Science", "Forestry", "French", "Furniture Design", "Game Design", "Gay and Lesbian Studies",
  "Genetics", "Geography", "Geological Engineering", "Geology", "Geophysics", "German", "Gerontology",
  "Government Major", "Graphic Design", "Health Administration", "Hebrew", "Hispanic-American, Puerto Rican, and Chicano Studies",
  "Historic Preservation", "History", "Home Economics", "Horticulture", "Hospitality", "Human Development",
  "Human Resources Management Major", "Illustration", "Industrial Design", "Industrial Engineering",
  "Industrial Management", "Industrial Psychology", "Information Technology", "Interior Architecture",
  "Interior Design", "International Agriculture", "International Business", "International Relations",
  "International Studies", "Islamic Studies", "Italian", "Japanese", "Jazz Studies", "Jewelry and Metalsmithing",
  "Jewish Studies", "Journalism", "Kinesiology", "Korean", "Land Use Planning and Management", "Landscape Architecture",
  "Landscape Horticulture", "Latin American Studies", "Library Science", "Linguistics", "Logistics Management",
  "Management Information Systems", "Managerial Economics", "Marine Biology Major", "Marine Science", "Marketing Major",
  "Mass Communication", "Massage Therapy", "Materials Science", "Mathematics", "Mechanical Engineering",
  "Medical Technology", "Medieval and Renaissance Studies", "Mental Health Services", "Merchandising and Buying Operations",
  "Metallurgical Engineering", "Microbiology", "Middle Eastern Studies", "Military Science", "Mineral Engineering",
  "Missions", "Modern Greek", "Molecular Biology", "Molecular Genetics", "Mortuary Science", "Museum Studies",
  "Music", "Music Education", "Music History Major", "Music Management", "Music Therapy", "Musical Theater",
  "Native American Studies", "Natural Resources Conservation", "Naval Architecture", "Neurobiology", "Neuroscience",
  "Nuclear Engineering", "Nursing Major", "Nutrition", "Occupational Therapy", "Ocean Engineering", "Oceanography",
  "Operations Management", "Organizational Behavior Studies", "Painting", "Paleontology", "Pastoral Studies",
  "Peace Studies", "Petroleum Engineering", "Pharmacology", "Pharmacy", "Philosophy", "Photography", "Photojournalism Major",
  "Physical Education", "Physical Therapy", "Physician Assistant", "Physics", "Physiological Psychology", "Piano",
  "Planetary Science", "Plant Pathology", "Playwriting and Screenwriting", "Political Communication", "Political Science Major",
  "Portuguese", "Pre-Dentistry", "Pre-Law", "Pre-Medicine", "Pre-Optometry", "Pre-Seminary", "Pre-Veterinary Medicine",
  "Printmaking", "Psychology", "Public Administration", "Public Health", "Public Policy Analysis", "Public Relations Major",
  "Radio and Television", "Radiologic Technology", "Range Science and Management", "Real Estate", "Recording Arts Technology",
  "Recreation Management", "Rehabilitation Services", "Religious Studies", "Respiratory Therapy", "Risk Management",
  "Rural Sociology", "Russian", "Scandinavian Studies", "Sculpture", "Slavic Languages and Literatures", "Social Psychology",
  "Social Work", "Sociology", "Soil Science", "Sound Engineering", "South Asian Studies", "Southeast Asia Studies",
  "Spanish Major", "Special Education", "Speech Pathology", "Sport and Leisure Studies", "Sports Management",
  "Statistics Major", "Surveying", "Sustainable Resource Management", "Teacher Education", "Teaching English as a Second Language",
  "Technical Writing", "Technology Education", "Textile Engineering", "Theatre", "Theology", "Tourism", "Toxicology",
  "Turfgrass Science", "Urban Planning", "Urban Studies", "Visual Communication", "Voice", "Web Design",
  "Webmaster and Web Management", "Welding Engineering", "Wildlife Management", "Women's Studies", "Youth Ministries",
  "Zoology"
];

type SearchAction = 
  | { type: 'SET_RESULTS', payload: Career[] }
  | { type: 'CLEAR_RESULTS' };

function searchReducer(state: Career[], action: SearchAction): Career[] {
  switch (action.type) {
    case 'SET_RESULTS':
      return action.payload;
    case 'CLEAR_RESULTS':
      return [];
    default:
      return state;
  }
}

// Add this new component for the skeleton loader
const CareerCardSkeleton = () => (
  <Card className="bg-white shadow-md relative">
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-5/6 mb-4" />
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-28" />
        <Skeleton className="h-6 w-36" />
      </div>
    </CardContent>
  </Card>
);


export function CareerSearchComponent() {
  const [searchResults, setSearchResults] = useState<Career[]>([]);
  const [filteredResults, setFilteredResults] = useState<Career[]>([]);
  const [searchInput, setSearchInput] = useState('')
  const [educationLevel, setEducationLevel] = useState(['Certificate', 'Bachelor\'s', 'Master\'s', 'Doctorate'])
  const [jobGrowth, setJobGrowth] = useState<string[]>([])
  const [jobScarcity, setJobScarcity] = useState(['Low', 'Medium', 'High', 'Very High'])
  const [salaryRange, setSalaryRange] = useState([0, 150000])
  const [jobCompetition, setJobCompetition] = useState(['Low', 'Medium', 'High'])
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [favorites, setFavorites] = useState<number[]>([]);
  const [poppingStars, setPoppingStars] = useState<number[]>([]);
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [feedbackType, setFeedbackType] = useState<'thumbs-up' | 'thumbs-down' | null>(null)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [appliedFilters, setAppliedFilters] = useState<string[]>([])
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null);

  // Add new state variables for each dropdown's visual state
  const [educationValue, setEducationValue] = useState<string>('all');
  const [jobGrowthValue, setJobGrowthValue] = useState<string>('all');
  const [jobScarcityValue, setJobScarcityValue] = useState<string>('all');
  const [jobCompetitionValue, setJobCompetitionValue] = useState<string>('all');

  useEffect(() => {
    console.log('CareerSearchComponent mounted');
    return () => console.log('CareerSearchComponent unmounted');
  }, []);

  useEffect(() => {
    updateAppliedFilters()
  }, [educationLevel, jobGrowth, jobScarcity, salaryRange, jobCompetition])

  useEffect(() => {
    console.log('searchResults updated:', searchResults);
  }, [searchResults]);

  useEffect(() => {
    console.log('isLoading updated:', isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (poppingStars.length > 0) {
      const timer = setTimeout(() => {
        setPoppingStars([]);
      }, 200); // Duration of the pop effect
      return () => clearTimeout(timer);
    }
  }, [poppingStars]);

  const applyFilters = useCallback(() => {
    const filteredData = searchResults.filter(career => {
      const matchesJobGrowth = jobGrowth.length === 0 || jobGrowth.some(growth => {
        if (growth === 'Low') return career.growth.includes('Low');
        if (growth === 'Medium') return career.growth.includes('Medium');
        if (growth === 'High') return career.growth.includes('High');
        return false;
      });

      return (
        (educationLevel.length === 0 || educationLevel.includes(career.education)) &&
        matchesJobGrowth &&
        (jobScarcity.length === 0 || jobScarcity.includes(career.scarcity)) &&
        (jobCompetition.length === 0 || jobCompetition.includes(career.competition)) &&
        (parseInt(career.salaryRange.split(' - ')[0].replace(/\D/g, '')) >= salaryRange[0] && 
         parseInt(career.salaryRange.split(' - ')[1].replace(/\D/g, '')) <= salaryRange[1])
      );
    });

    setFilteredResults(filteredData);
  }, [searchResults, educationLevel, jobGrowth, jobScarcity, salaryRange, jobCompetition]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const updateAppliedFilters = useCallback(() => {
    const filters: string[] = []
    if (educationLevel.length < 4) filters.push(`Education: ${educationLevel.join(', ')}`)
    if (jobGrowth.length > 0) filters.push(`Growth: ${jobGrowth.join(', ')}`)
    if (jobScarcity.length < 4) filters.push(`Scarcity: ${jobScarcity.join(', ')}`)
    if (salaryRange[0] > 0 || salaryRange[1] < 150000) filters.push(`Salary: $${salaryRange[0].toLocaleString()} - $${salaryRange[1].toLocaleString()}`)
    if (jobCompetition.length < 3) filters.push(`Competition: ${jobCompetition.join(', ')}`)
    setAppliedFilters(filters)
  }, [educationLevel, jobGrowth, jobScarcity, salaryRange, jobCompetition]);

  useEffect(() => {
    updateAppliedFilters();
  }, [updateAppliedFilters]);

  const removeFilter = useCallback((filter: string) => {
    const [filterType, value] = filter.split(': ');
    switch (filterType) {
      case 'Education':
        setEducationLevel(['Certificate', 'Bachelor\'s', 'Master\'s', 'Doctorate']);
        setEducationValue('all');
        break;
      case 'Growth':
        setJobGrowth([]);
        setJobGrowthValue('all');
        break;
      case 'Scarcity':
        setJobScarcity(['Low', 'Medium', 'High', 'Very High']);
        setJobScarcityValue('all');
        break;
      case 'Competition':
        setJobCompetition(['Low', 'Medium', 'High']);
        setJobCompetitionValue('all');
        break;
      case 'Salary':
        setSalaryRange([0, 150000]);
        break;
    }
    updateAppliedFilters();
  }, [updateAppliedFilters]);

  const resetAllFilters = useCallback(() => {
    setEducationLevel(['Certificate', 'Bachelor\'s', 'Master\'s', 'Doctorate']);
    setJobGrowth([]);
    setJobScarcity(['Low', 'Medium', 'High', 'Very High']);
    setSalaryRange([0, 150000]);
    setJobCompetition(['Low', 'Medium', 'High']);
    setAppliedFilters([]);
    // Reset visual state of dropdowns
    setEducationValue('all');
    setJobGrowthValue('all');
    setJobScarcityValue('all');
    setJobCompetitionValue('all');
  }, []);

  // Modify the handleSearch function to use mock data
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/search-careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchInput,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch career data');
      }
      
      const data: Career[] = await response.json();
      
      if (data.length > 0) {
        setSearchResults(data);
        setFilteredResults(data); // Initialize filtered results with all results
      } else {
        setError('No results found.');
        setSearchResults([]);
        setFilteredResults([]);
      }
    } catch (error) {
      console.error('Error in handleSearch:', error);
      setSearchResults([]);
      setFilteredResults([]);
      setError('Failed to fetch or parse career data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [searchInput]);

  type Career = {
    id: number;
    title: string;
    salaryRange: string;
    growth: string;
    scarcity: string;
    education: string;
    competition: string;
    description: string;
  };

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
    setPoppingStars(prev => [...prev, id]);
  }, []);

  const handleFeedbackSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()
    if (!feedbackType) {
      alert('Please select a feedback type (Thumbs Up or Thumbs Down)');
      return;
    }
    setIsLoading(true)
    try {
      console.log('Submitting feedback:', { type: feedbackType, comment: feedbackComment });
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: feedbackType, comment: feedbackComment }),
      })
      const data = await response.json();
      console.log('Response:', data);
      if (response.ok) {
        setIsSubmitted(true)
        // Reset form
        setFeedbackType(null)
        setFeedbackComment('')
      } else {
        console.error('Failed to submit feedback:', data.message)
        alert('Failed to submit feedback. Please try again.')
      }
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Error submitting feedback. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetFeedbackState = () => {
    setFeedbackType(null)
    setFeedbackComment('')
    setIsSubmitted(false)
  }

  const handleGoogleLogin = () => {
    // In a real application, this would initiate the Google OAuth flow
    // For this example, we'll simulate a successful login
    setIsLoggedIn(true)
    setUser({ name: 'John Doe', email: 'john.doe@example.com', avatar: 'https://github.com/shadcn.png' })
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setFavorites([])
  }

  const getTagColor = (type: string) => {
    switch (type) {
      case 'education':
        return 'bg-blue-100 text-blue-800';
      case 'growth':
        return 'bg-green-100 text-green-800';
      case 'scarcity':
        return 'bg-purple-100 text-purple-800';
      case 'salary':
        return 'bg-yellow-100 text-yellow-800';
      case 'competition':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const resetSearch = () => {
    // Reset all search parameters
    setSearchInput('')
    setEducationLevel(['Certificate', 'Bachelor\'s', 'Master\'s', 'Doctorate'])
    setJobGrowth([])
    setJobScarcity(['Low', 'Medium', 'High', 'Very High'])
    setSalaryRange([0, 150000])
    setJobCompetition(['Low', 'Medium', 'High'])
    setSearchResults([]);
    setAppliedFilters([])
    
    // Reload the page
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button 
              onClick={resetSearch}
              className="text-2xl font-bold text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-blue-600"
            >
              NewCareers
            </button>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="text-black" onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <GoogleOAuthProvider clientId="681787884456-avl01o9cpe4rqqq9r476j7v4044ot846.apps.googleusercontent.com">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </GoogleOAuthProvider>
          )}
        </div>
      </nav>

      <header className="py-8 sm:py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-800 to-gray-900 opacity-90 z-10"></div>
        <div className="container mx-auto px-4 relative z-20 text-white">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center">Discover New Career Paths</h1>
          <p className="text-xl sm:text-xl font-medium mb-6 text-center">294 unique majors. 3,000+ career opportunities.</p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl mx-auto relative">
            <Input
              type="text"
              placeholder="Search for a major"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="flex-grow bg-white border-gray-300 focus:border-white focus:ring-white hover:border-gray-400 transition-colors text-black placeholder-gray-500"
            />
            {isSearchFocused && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-12 max-h-60 overflow-y-auto">
                {majors.map((major, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                    onClick={() => {
                      setSearchInput(major);
                      setIsSearchFocused(false);
                    }}
                  >
                    {major}
                  </li>
                ))}
              </ul>
            )}
            <Button 
              onClick={handleSearch} 
              className="w-full sm:w-auto bg-white text-black hover:bg-gray-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                'See Results'
              )}
            </Button>
          </div>
          <div className="text-center mb-8">
            <p className="text-gray-100">
              There are a ton of cool career paths you've never heard of before.<br className="hidden sm:inline" />
              This tool was created to help you uncover those opportunities.
            </p>
          </div>
          <div className="flex justify-center">
            <Dialog open={feedbackOpen} onOpenChange={(open) => {
              setFeedbackOpen(open)
              if (!open) {
                setIsSubmitted(false)
                setFeedbackType(null)
                setFeedbackComment('')
              }
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-white text-black border-white hover:bg-gray-100 hover:border-gray-200 focus:bg-gray-200 focus:border-gray-300 active:bg-gray-200 active:border-gray-300 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Help! I'm Undecided
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                {!isSubmitted ? (
                  <>
                    <DialogHeader>
                      <DialogTitle className="text-black">Leave Feedback</DialogTitle>
                      <DialogDescription>
                        We'd love to hear your thoughts on NewCareer.fyi!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center gap-4 my-4">
                      <Button 
                        variant="outline"
                        onClick={() => setFeedbackType('thumbs-up')}
                        className={cn(
                          "text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400",
                          "focus:ring-2 focus:ring-black focus:ring-offset-2",
                          "transition-colors duration-200",
                          feedbackType === 'thumbs-up' && "bg-gray-200 border-black"
                        )}
                      >
                        <ThumbsUp className="w-4 h-4 mr-2 text-black" />
                        Thumbs Up
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setFeedbackType('thumbs-down')}
                        className={cn(
                          "text-black border-gray-300 hover:bg-gray-100 hover:border-gray-400",
                          "focus:ring-2 focus:ring-black focus:ring-offset-2",
                          "transition-colors duration-200",
                          feedbackType === 'thumbs-down' && "bg-gray-200 border-black"
                        )}
                      >
                        <ThumbsDown className="w-4 h-4 mr-2 text-black" />
                        Thumbs Down
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Your feedback (optional)"
                      value={feedbackComment}
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      className="text-black"
                    />
                    <Button 
                      onClick={handleFeedbackSubmit} 
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Feedback'
                      )}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2 text-black">Thank you for leaving feedback!</h3>
                    <p className="text-gray-600">Your input is valuable to us and helps improve NewCareer.fyi.</p>
                    <Button onClick={() => setFeedbackOpen(false)} className="mt-4">Close</Button>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 bg-white flex-grow">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Filters</span>
                  <Button
                    variant="link"
                    onClick={resetAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Reset All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appliedFilters.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold mb-2 text-black">Applied Filters:</h3>
                    <div className="flex flex-wrap gap-2">
                      {appliedFilters.map((filter, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {filter}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0"
                            onClick={() => removeFilter(filter)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium">Education Level</label>
                    <Select 
                      value={educationValue}
                      onValueChange={(value) => {
                        setEducationValue(value);
                        setEducationLevel(value === 'all' ? ['Certificate', 'Bachelor\'s', 'Master\'s', 'Doctorate'] : [value]);
                        updateAppliedFilters();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education levels" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                        <SelectItem value="Bachelor's">Bachelor's</SelectItem>
                        <SelectItem value="Master's">Master's</SelectItem>
                        <SelectItem value="Doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Job Growth by 2030</label>
                    <Select 
                      value={jobGrowthValue}
                      onValueChange={(value) => {
                        setJobGrowthValue(value);
                        setJobGrowth(value === 'all' ? [] : [value]);
                        updateAppliedFilters();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job growth" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Low">Low (0-5%)</SelectItem>
                        <SelectItem value="Medium">Medium (6-15%)</SelectItem>
                        <SelectItem value="High">High (16%+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Job Scarcity</label>
                    <Select 
                      value={jobScarcityValue}
                      onValueChange={(value) => {
                        setJobScarcityValue(value);
                        setJobScarcity(value === 'all' ? ['Low', 'Medium', 'High', 'Very High'] : [value]);
                        updateAppliedFilters();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job scarcity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Very High">Very High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Salary Range ($)</label>
                    <Slider
                      min={0}
                      max={150000}
                      step={1000}
                      value={salaryRange}
                      onValueChange={(value) => {
                        setSalaryRange(value);
                        updateAppliedFilters();
                      }}
                      className="my-4"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${salaryRange[0].toLocaleString()}</span>
                      <span>{salaryRange[1] === 150000 ? "$150,000+" : `$${salaryRange[1].toLocaleString()}`}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">Job Competition</label>
                    <Select 
                      value={jobCompetitionValue}
                      onValueChange={(value) => {
                        setJobCompetitionValue(value);
                        setJobCompetition(value === 'all' ? ['Low', 'Medium', 'High'] : [value]);
                        updateAppliedFilters();
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job competition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="results" className="w-full">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 w-full sm:w-auto">
                <TabsTrigger 
                  value="results"
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm text-gray-600",
                    "data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                  )}
                >
                  Search Results
                </TabsTrigger>
                <TabsTrigger 
                  value="favorites"
                  className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-sm text-gray-600",
                    "data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                  )}
                >
                  Favorites
                </TabsTrigger>
              </TabsList>
              <TabsContent value="results">
                <h2 className="text-2xl font-semibold mb-4 text-black">Search Results</h2>
                <div className="space-y-4">
                  {error && (
                    <div className="text-red-500 mb-4">
                      {error}
                    </div>
                  )}
                  {isLoading ? (
                    <>
                      <CareerCardSkeleton />
                      <CareerCardSkeleton />
                      <CareerCardSkeleton />
                    </>
                  ) : filteredResults.length > 0 ? (
                    <>
                      <p>Number of results: {filteredResults.length}</p>
                      {filteredResults.map((career) => (
                        <Card key={career.id} className="mb-4">
                          <CardHeader>
                            <CardTitle>{career.title}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-700 mb-4">{career.description}</p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="secondary" className={`flex items-center gap-1 ${getTagColor('salary')}`}>
                                <DollarSign className="w-4 h-4" />
                                {career.salaryRange}
                              </Badge>
                              <Badge variant="secondary" className={`flex items-center gap-1 ${getTagColor('growth')}`}>
                                <TrendingUp className="w-4 h-4" />
                                {career.growth}
                              </Badge>
                              <Badge variant="secondary" className={`flex items-center gap-1 ${getTagColor('scarcity')}`}>
                                <Briefcase className="w-4 h-4" />
                                Scarcity: {career.scarcity}
                              </Badge>
                              <Badge variant="secondary" className={`flex items-center gap-1 ${getTagColor('education')}`}>
                                <GraduationCap className="w-4 h-4" />
                                {career.education}
                              </Badge>
                              <Badge variant="secondary" className={`flex items-center gap-1 ${getTagColor('competition')}`}>
                                <Users className="w-4 h-4" />
                                Competition: {career.competition}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <p>No results found. Try adjusting your search criteria.</p>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="favorites">
                <h2 className="text-2xl font-semibold mb-4 text-black">Favorite Careers</h2>
                {isLoggedIn ? (
                  <div className="space-y-4">
                    {searchResults.filter(career => favorites.includes(career.id)).map(career => (
                      <Card key={career.id}>
                        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0 pb-2">
                          <div>
                            <CardTitle>{career.title}</CardTitle>
                            <CardDescription className="mt-1">{career.description}</CardDescription>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(career.id)}
                          >
                            <Star className="h-4 w-4 fill-yellow-400" />
                          </Button>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className={cn("flex items-center gap-1", getTagColor('education'))}>
                              <GraduationCap className="w-4 h-4" />
                              {career.education}
                            </Badge>
                            <Badge variant="secondary" className={cn("flex items-center gap-1", getTagColor('growth'))}>
                              <TrendingUp className="w-4 h-4" />
                              {career.growth}
                            </Badge>
                            <Badge variant="secondary" className={cn("flex items-center gap-1", getTagColor('scarcity'))}>
                              <Briefcase className="w-4 h-4" />
                              {career.scarcity} Scarcity
                            </Badge>
                            <Badge variant="secondary" className={cn("flex items-center gap-1", getTagColor('salary'))}>
                              <DollarSign className="w-4 h-4" />
                              {career.salaryRange}
                            </Badge>
                            <Badge variant="secondary" className={cn("flex items-center gap-1", getTagColor('competition'))}>
                              <Users className="w-4 h-4" />
                              {career.competition} Competition
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-lg mb-4 text-black">Please log in to view and manage your favorites.</p>
                    <div className="inline-block">
                      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
                        <GoogleLogin
                          onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                          }}
                          onError={() => {
                            console.log('Login Failed');
                          }}
                        />
                      </GoogleOAuthProvider>
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* New footer */}
      <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              Made by{' '}
              <a 
                href="https://www.martintejeda.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-gray-800"
              >
                Martin <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setFeedbackOpen(true)}
                className="text-gray-600 hover:text-gray-800 text-sm cursor-pointer"
              >
                Did I miss something?{' '}
                <span className="font-bold underline">Leave Feedback</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}