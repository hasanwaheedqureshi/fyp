"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import AOS from 'aos';
import 'aos/dist/aos.css';

const team = [
  {
    role: 'Project Supervisor',
    name: 'Dr. Imran Shafi',
    bio: 'Professor at NUST CEME, guiding our team with his vast experience in robotics and control systems.',
    image: '/images/supervisor.jpg',
  },
  {
    role: 'Design Team Lead',
    name: 'Muhammad Abdullah Shahid',
    bio: 'Responsible for mechanical layout, ergonomics, and structural design.',
    image: '/images/design-lead.jpg',
  },
  {
    role: 'Software Team Lead',
    name: 'Hasan Waheed',
    bio: 'Working on navigation algorithms, control systems, and AI integration.',
    image: '/images/software-lead.jpg',
  },
  {
    role: 'Management Team Lead',
    name: 'Syed Muhammad Suleman Bakht',
    bio: 'Manages logistics, team timelines, and sponsorship engagement.',
    image: '/images/management-lead.jpg',
  },
  {
    role: 'Manufacturing Team Lead',
    name: 'Taha Nadeem',
    bio: 'Leads manufacturing, focusing on precision fabrication and assembly.',
    image: '/images/manufacturing-lead.jpg',
  },
  {
    role: 'Co - Supervisor',
    name: 'Dr. Hasan Aftab Saeed',
    bio: 'Provides strategic planning support and technical review.',
    image: '/images/Co-supervisor.jpg',
  },
];

export default function AboutPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const roles = ['All', ...new Set(team.slice(1).map((t) => t.role))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-indigo-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 px-6 pt-28 pb-12 md:px-16 lg:px-32">
      {/* Dark Mode Toggle */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-500 transition"
        >
          {darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
        </button>
      </div>

      {/* Intro & Mission Section */}
      <section data-aos="fade-up" className="mb-20 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Who We Are</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          We are a multidisciplinary robotics team from NUST CEME passionate about building cutting-edge robotic systems. Our journey began with a shared vision: to innovate, collaborate, and push the boundaries of engineering in Pakistan.
        </p>
        <div className="grid gap-10 md:grid-cols-2 text-left">
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Our Mission</h3>
            <p className="text-gray-700 dark:text-gray-300">
              To design and develop autonomous robotic solutions that solve real-world problems, while fostering innovation, collaboration, and student growth.
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-indigo-600 mb-2">Our Vision</h3>
            <p className="text-gray-700 dark:text-gray-300">
              To become a nationally recognized robotics team, driving research and innovation in autonomous systems for industrial and defense applications.
            </p>
          </div>
        </div>
      </section>

      {/* Supervisor Highlight */}
      <section data-aos="fade-up" className="mb-20">
        <h2 className="text-3xl font-semibold text-center text-gray-700 dark:text-white mb-8">Project Supervision</h2>
        <div className="flex flex-col items-center md:flex-row md:items-start gap-6 max-w-4xl mx-auto">
          <Image
            src={team[0].image}
            alt={team[0].name}
            width={200}
            height={200}
            className="rounded-full object-cover border-4 border-indigo-500"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{team[0].name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic">{team[0].role}</p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{team[0].bio}</p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {roles.map((role) => (
          <button
            key={role}
            onClick={() => setFilter(role)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              filter === role
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white'
            } hover:bg-indigo-500 dark:hover:bg-indigo-500`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Core Team */}
      <section data-aos="fade-up">
        <h2 className="text-3xl font-semibold text-center text-gray-700 dark:text-white mb-10">Our Core Team</h2>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team
            .slice(1)
            .filter((member) => filter === 'All' || member.role === filter)
            .map((member) => (
              <div
                data-aos="zoom-in"
                key={member.name}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={150}
                  height={150}
                  className="rounded-full object-cover mx-auto mb-4 border-2 border-indigo-400"
                />
                <h3 className="text-lg font-semibold text-center text-gray-800 dark:text-white">{member.name}</h3>
                <p className="text-sm text-center text-gray-500 dark:text-gray-300">{member.role}</p>
                <p className="mt-3 text-sm text-gray-700 dark:text-gray-200 text-center">{member.bio}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
