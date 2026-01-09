import { useEffect, useState } from 'react';

export default function ToggleTheme() {
  const [theme, setTheme] = useState<'dark' | 'regular'>('regular');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Read initial theme
    const savedTheme = localStorage.getItem('theme');
    const initialTheme = savedTheme || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'regular');
    setTheme(initialTheme as 'dark' | 'regular');
    document.body.setAttribute('data-color-mode', initialTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'regular' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.setAttribute('data-color-mode', newTheme);
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <button className="btn-toggle" title="Change theme" aria-label="Change theme">
        <div className="btn-toggle__toggler btn-toggle__toggler--off">☀️</div>
      </button>
    );
  }

  const themeOn = theme === 'dark' ? 'on' : 'off';

  return (
    <button
      className="btn-toggle"
      title="Change theme"
      aria-label="Change theme"
      onClick={toggleTheme}
    >
      <div className={`btn-toggle__toggler btn-toggle__toggler--${themeOn}`}>
        {theme === 'dark' ? '🌒' : '☀️'}
      </div>
    </button>
  );
}
