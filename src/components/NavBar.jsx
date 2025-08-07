import { NavLink } from 'react-router-dom';
import reactJoker from '../assets/Jokers/react-joker.png';
import firebaseJoker from '../assets/Jokers/firebase-joker.png';
import csharpJoker from '../assets/Jokers/csharp-joker.png';
import tailwindJoker from '../assets/Jokers/tailwind-joker.png';
import skillsJoker from '../assets/Jokers/skills-joker.png';
import devlogsJoker from '../assets/Jokers/devlogs-joker.png';

const jokers = [
  { tech: 'react', img: reactJoker },
  { tech: 'firebase', img: firebaseJoker },
  { tech: 'csharp', img: csharpJoker },
  { tech: 'tailwind', img: tailwindJoker },
  { tech: 'skills', img: skillsJoker },
  { tech: 'devlogs', img: devlogsJoker },
];

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-3 p-4 bg-green-900 border-b-4 border-yellow-300">
      {jokers.map(({ tech, img }) => (
        <NavLink
          key={tech}
          to={`/projects/${tech}`}
          className={({ isActive }) =>
            `transition-transform duration-200 transform ${
              isActive ? 'scale-110' : 'hover:scale-105'
            }`
          }
        >
          <img
            src={img}
            alt={`${tech} joker`}
            className="w-20 h-28 rounded-md shadow-md border border-white"
          />
        </NavLink>
      ))}
    </nav>
  );
}