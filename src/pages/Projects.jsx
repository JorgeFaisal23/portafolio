import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ProjectCard from '../components/ProjectCard';
import examenUno from '../assets/examen1.png';
import examenDos from '../assets/examen2.png';

const dummyProjects = {
  react: [
    {
      title: 'Contador',
      description: 'Contador con useState',
      points: 15,
      img: '',
      link: 'https://github.com/tuusuario/contador-react',
    },
    {
      title: 'Todo App',
      description: 'Lista de tareas con hooks',
      points: 25,
      img: '',
      link: 'https://github.com/tuusuario/todo-react',
    },
  ],
  firebase: [
    {
      title: 'NavBar SPA',
      description: 'Login con Firebase y validaciones de sesión.',
      points: 20,
      img: examenUno,
      link: 'https://examenjf.netlify.app/',
    },
        {
      title: 'Gestor de tareas',
      description: 'App CRUD para administracion de tareas haciendo uso de fichas',
      points: 50,
      img: examenDos,
      link: 'https://gestor-tareas-jf.netlify.app/',
    },
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
  const [animatedDescription, setAnimatedDescription] = useState('');

    useEffect(() => {
      if (selectedProject) {
        let index = 0;
        setAnimatedDescription(''); // reiniciar

        const interval = setInterval(() => {
          setAnimatedDescription((prev) =>
            selectedProject.description.slice(0, index + 1)
          );
          index++;
          if (index >= selectedProject.description.length) {
            clearInterval(interval);
          }
        }, 30); // velocidad en ms

        return () => clearInterval(interval);
      } else {
        setAnimatedDescription('');
      }
    }, [selectedProject]);

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

{selectedProject && (
  <div className="bg-white border-2 border-black rounded-lg p-4 max-w-sm mb-4 shadow-lg font-mono text-sm text-black animate-fade-in">
    <h3 className="text-lg font-bold mb-2 uppercase">{selectedProject.title}</h3>

    {selectedProject.img && (
      <img
        src={selectedProject.img}
        alt={selectedProject.title}
        className="w-full h-32 object-cover border border-black mb-2"
      />
    )}

    <p className="mb-1 whitespace-pre-wrap">{animatedDescription}</p>

    {selectedProject.link && (
      <a
        href={selectedProject.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline hover:text-blue-800 transition-colors block mt-2"
      >
        Abrir.
      </a>
    )}

    <p className="text-green-600 mt-2">+{selectedProject.points} puntos de interés</p>
  </div>
)}

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