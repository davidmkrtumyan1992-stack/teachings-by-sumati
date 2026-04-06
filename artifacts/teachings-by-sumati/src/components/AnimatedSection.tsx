import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function AnimatedSection({ children, delay = 0, className = '' }: AnimatedSectionProps) {
  const ref = useScrollAnimation();
  return (
    <div 
      ref={ref} 
      className={`scroll-animate ${className}`} 
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
