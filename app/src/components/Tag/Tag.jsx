import './Tag.scss';

export function Tag({ label, variant = 'default' }) {
  return <span className={`tag${variant === 'accent' ? ' tag--accent' : ''}`}>{label}</span>;
}
