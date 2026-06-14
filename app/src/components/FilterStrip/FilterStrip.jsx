import { isPillActive } from '../../handlers/searchFilterHandler';
import { FilterPill } from '../FilterPill/FilterPill';
import './FilterStrip.scss';

export function FilterStrip({
  label,
  pills,
  activeValues,
  onToggle,
  ariaLabel,
  orientation = 'horizontal',
}) {
  const stripClass =
    orientation === 'vertical' ? 'filter-strip filter-strip--vertical' : 'filter-strip';

  return (
    <div className="filter-group">
      {label ? <span className="filter-group__label">{label}</span> : null}
      <div className={stripClass} role="group" aria-label={ariaLabel}>
        {pills.map((pill) => (
          <FilterPill
            key={pill.value}
            label={pill.label}
            value={pill.value}
            title={pill.title}
            isActive={isPillActive(activeValues, pill.value)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
}
