import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = [
  {
    title: "The Shawshank Redemption",
    type: "MOVIE" as const,
    director: "Frank Darabont",
    budget: "$25 million",
    location: "Ohio, USA",
    duration: "142 minutes",
    year: "1994",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl: "https://images.unsplash.com/photo-1489599459815-b93c72bb4b1f?w=300&h=450&fit=crop"
  },
  {
    title: "The Godfather",
    type: "MOVIE" as const,
    director: "Francis Ford Coppola",
    budget: "$6.5 million",
    location: "New York, USA",
    duration: "175 minutes",
    year: "1972",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    posterUrl: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop"
  },
  {
    title: "Breaking Bad",
    type: "TV_SHOW" as const,
    director: "Vince Gilligan",
    budget: "$3 million per episode",
    location: "New Mexico, USA",
    duration: "5 seasons, 62 episodes",
    year: "2008-2013",
    description: "A high school chemistry teacher turned methamphetamine manufacturer partners with a former student.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop"
  },
  {
    title: "Game of Thrones",
    type: "TV_SHOW" as const,
    director: "David Benioff & D.B. Weiss",
    budget: "$15 million per episode (final seasons)",
    location: "Northern Ireland, Croatia, Spain",
    duration: "8 seasons, 73 episodes",
    year: "2011-2019",
    description: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns.",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=450&fit=crop"
  },
  {
    title: "Pulp Fiction",
    type: "MOVIE" as const,
    director: "Quentin Tarantino",
    budget: "$8.5 million",
    location: "Los Angeles, USA",
    duration: "154 minutes",
    year: "1994",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop"
  },
  {
    title: "Stranger Things",
    type: "TV_SHOW" as const,
    director: "The Duffer Brothers",
    budget: "$30 million per season",
    location: "Georgia, USA",
    duration: "4 seasons, 34 episodes",
    year: "2016-2022",
    description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.",
    posterUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300&h=450&fit=crop"
  },
  {
    title: "The Dark Knight",
    type: "MOVIE" as const,
    director: "Christopher Nolan",
    budget: "$185 million",
    location: "Chicago, USA",
    duration: "152 minutes",
    year: "2008",
    description: "When the menace known as the Joker wreaks havoc on Gotham, Batman must accept one of the greatest psychological tests.",
    posterUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop"
  },
  {
    title: "The Office",
    type: "TV_SHOW" as const,
    director: "Greg Daniels",
    budget: "$2-3 million per episode",
    location: "Pennsylvania, USA",
    duration: "9 seasons, 201 episodes",
    year: "2005-2013",
    description: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes and inappropriate behavior.",
    posterUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=450&fit=crop"
  }
];

async function main() {
  console.log('🌱 Start seeding database...');
  
  for (const entry of seedData) {
    await prisma.entry.create({
      data: entry
    });
  }
  
  console.log('✅ Seeding finished successfully!');
  console.log(`📊 Created ${seedData.length} sample entries`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
