import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const dummyProjects = {
  react: [
    { title: 'Contador', description: 'Contador con useState', points: 15 },
    { title: 'Todo App', description: 'Lista de tareas con hooks', points: 25 },
  ],
  firebase: [
    { title: 'Auth', description: 'Login con Firebase', points: 20 },
  ],
};

export default function Projects() {
  const { tech } = useParams();
  const [selectedProject, setSelectedProject] = useState(null);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem(`score-${tech}`);
    return saved ? parseInt(saved) : 0;
  });

  const handleSelect = (project) => {
    if (selectedProject?.title === project.title) {
      setSelectedProject(null);
    } else {
      setSelectedProject(project);
    }
  };

  const [isShaking, setIsShaking] = useState(false);
  const [floatingText, setFloatingText] = useState(null);

const handlePlay = (project) => {
  setIsShaking(true);
  setFloatingText(`+${project.points} Interés`);

  setTimeout(() => {
    setIsShaking(false);
    setFloatingText(null);

    const newScore = score + project.points;
    setScore(newScore);
    localStorage.setItem(`score-${tech}`, newScore);
    setSelectedProject(null);
  }, 300);
};

  const projects = dummyProjects[tech] || [];

  return (
    <div className="p-4 flex flex-col items-center font-['VT323']">
      <h2 className="text-2xl mb-2 font-bold uppercase text-yellow-300">Tecnología: {tech}</h2>
      <p className="mb-4 text-green-400 text-xl">
        Puntaje de interés: <span className="text-3xl">{score}</span>
      </p>

      {/* Cartas */}
      <div className="flex gap-4 flex-wrap justify-center mb-6">
        {projects.map((proj, i) => (
          <ProjectCard
            key={i}
            project={proj}
            isSelected={selectedProject?.title === proj.title}
            onSelect={() => handleSelect(proj)}
          />
        ))}
      </div>

      {/* Botón rojo retro */}
        <div className="relative h-12 mt-4 flex justify-center items-center">
        <button
            disabled={!selectedProject}
            onClick={() => selectedProject && handlePlay(selectedProject)}
            className={`
            px-6 py-2 border-2 text-lg uppercase tracking-wider rounded-sm transition-all duration-200 font-['VT323']
            ${selectedProject
                ? `bg-red-600 text-white border-black hover:bg-red-700 active:translate-y-[2px] ${isShaking ? 'shake' : ''}`
                : 'bg-gray-600 text-gray-300 border-gray-800 cursor-not-allowed'}
            `}
        >
            Jugar carta
        </button>

        {/* Texto flotante animado */}
        {floatingText && (
            <div className="absolute -top-6 text-green-400 font-['VT323'] text-xl animate-float">
            {floatingText}
            </div>
        )}
        </div>
    </div>
  );
}