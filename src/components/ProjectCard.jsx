import Balatro from 'balatrobutton';
import 'balatrobutton/style';

export default function ProjectCard({ project, isSelected, onSelect }) {

  return (
    <div
      onClick={onSelect}
      className={`
        w-32 h-44 p-2 bg-white border-4 border-black rounded-xl text-black font-mono text-sm
        shadow-[4px_4px_0_0_black] cursor-pointer relative
        transition-all duration-300 ease-in-out
        ${isSelected ? 'translate-y-[-10px] rotate-[-2deg] z-10' : 'hover:translate-y-[-4px]'}
      `}
    >
      <div className="text-center font-bold text-xs mb-1 uppercase">{project.title}</div>
      <div className="text-[10px] text-center h-[60%] overflow-hidden">{project.description}</div>

    </div>
  );
}