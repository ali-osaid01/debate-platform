export const events = [
    {
      id: 1,
      title: "Global Climate Action Debate",
      organizer: "Environmental Club",
      avatar: "/avatar-club-1.jpg",
      image: "https://i.pinimg.com/564x/96/da/4f/96da4f86e6ea61c79f2d72132ae70593.jpg",
      date: "November 15, 2024",
      time: "3:00 PM",
      location: "City Hall Auditorium",
      description: "Join leading experts and students as we debate the most pressing issues surrounding climate change and explore potential solutions.",
      likes: 125,
      attendees: 200,
    },
    {
      id: 2,
      title: "Artificial Intelligence: Boon or Bane?",
      organizer: "Tech Society",
      avatar: "/avatar-tech-society.jpg",
      image: "https://i.pinimg.com/564x/a5/87/57/a58757fdfdf0cdf18f38dfa48749d199.jpg",
      date: "December 5, 2024",
      time: "5:00 PM",
      location: "Innovation Center, New York City",
      description: "A lively debate on the benefits and challenges of AI, featuring thought leaders in technology and ethics.",
      likes: 98,
      attendees: 150,
    },
    {
      id: 3,
      title: "Healthcare Accessibility for All",
      organizer: "Public Health Association",
      avatar: "/avatar-health.jpg",
      image: "https://i.pinimg.com/564x/d8/30/66/d83066aa4edb0c13d7b086e6e5728c0f.jpg",
      date: "January 20, 2025",
      time: "1:00 PM",
      location: "University Campus Auditorium",
      description: "An in-depth discussion on the importance of healthcare accessibility and the role of policy in ensuring equity.",
      likes: 85,
      attendees: 175,
    },
    {
      id: 4,
      title: "Free Speech on College Campuses",
      organizer: "Debate League",
      avatar: "/avatar-debate-league.jpg",
      image: "https://i.pinimg.com/564x/fb/13/64/fb1364b8fefba3f9bc83de046b0bf1cd.jpg",
      date: "February 18, 2025",
      time: "4:00 PM",
      location: "Main Library, Conference Room B",
      description: "A thought-provoking debate on the boundaries of free speech and expression within academic institutions.",
      likes: 110,
      attendees: 190,
    }
  ]
  
  export const debateTopic = [
    "Colonization",
    "AI",
    "Gaming",
    "Drugs",
    "Income",
    "Genetics",
    "Superheroes",
    "Exploration",
    "Privacy",
    "Art"
];


// utils/formatDate.ts
export function formatDate(dateString: string | Date, locale: string = 'en-US'): string {
  if (!dateString) return 'Invalid Date';

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long',   
    day: 'numeric',  
  };

  try {
    const date = dateString instanceof Date ? dateString : new Date(dateString);

    if (isNaN(date.getTime())) throw new Error('Invalid Date');

    return date.toLocaleString(locale, options);
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Invalid Date';
  }
}
