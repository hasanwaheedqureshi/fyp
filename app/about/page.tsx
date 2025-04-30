import Image from 'next/image';

const team = [
  {
    role: 'Project Supervisor',
    name: 'Dr. Imran Shafi',
    bio: 'Professor at NUST CEME, guiding our team with his vast experience in robotics and control systems.',
    image: '/images/supervisor.jpg', // <-- Replace with real image
  },
  {
    role: 'Design Team Lead',
    name: 'Muhammad Abdullah Shahid',
    bio: 'Head of design, responsible for the mechanical layout, ergonomics, and structural analysis of our robot.',
    image: '/images/design-lead.jpg',
  },
  {
    role: 'Software Team Lead',
    name: 'Hasan Waheed',
    bio: 'Leads the software team, working on navigation, control, and AI integration.',
    image: '/images/software-lead.jpg',
  },
  {
    role: 'Management Team Lead',
    name: 'Syed Muhammad Suleman Bakht',
    bio: 'Manages logistics, timelines, team collaboration, and sponsorships.',
    image: '/images/management-lead.jpg',
  },
  {
    role: 'Co - Supervisor',
    name: 'Dr. Hasan Aftab Saeed',
    bio: 'Provides technical review and strategic planning support for our project milestones.',
    image: '/images/Co-supervisor.jpg',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-6 py-12 md:px-16 lg:px-32">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">About Us</h1>

      <div className="mb-16">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Meet Our Project Supervisor</h2>
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 max-w-4xl mx-auto">
          <Image
            src={team[0].image}
            alt={team[0].name}
            width={200}
            height={200}
            className="rounded-full object-cover border-4 border-indigo-500"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{team[0].name}</h3>
            <p className="text-sm text-gray-600 italic">{team[0].role}</p>
            <p className="mt-2 text-gray-700">{team[0].bio}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mb-8 text-center">Our Core Team</h2>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.slice(1).map((member) => (
          <div key={member.name} className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <Image
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full object-cover mx-auto mb-4 border-2 border-indigo-400"
            />
            <h3 className="text-lg font-semibold text-center text-gray-800">{member.name}</h3>
            <p className="text-sm text-center text-gray-500">{member.role}</p>
            <p className="mt-3 text-sm text-gray-700 text-center">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
