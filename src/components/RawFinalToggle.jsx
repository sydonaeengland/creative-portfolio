import { useState } from 'react';

// The signature RAW / FINAL interaction. Pass `raw` and `final` as React
// nodes (usually a <Placeholder> or <img>) to swap between them.
// `labels` optionally overrides the two side labels (e.g. "Planning"/"Published").
export default function RawFinalToggle({ raw, final, labels = ['Raw', 'Final'], stageStyle }) {
  const [state, setState] = useState('final');

  return (
    <div>
      <div className="rf-toggle" data-state={state}>
        <span className={`side raw${state === 'raw' ? ' is-active' : ''}`} onClick={() => setState('raw')}>
          {labels[0]}
        </span>
        <button
          className="rf-switch"
          aria-label="Toggle raw and final"
          onClick={() => setState((s) => (s === 'final' ? 'raw' : 'final'))}
        />
        <span className={`side final${state === 'final' ? ' is-active' : ''}`} onClick={() => setState('final')}>
          {labels[1]}
        </span>
      </div>
      <div className="rf-stage" style={stageStyle}>
        <div className={`rf-asset${state === 'raw' ? ' is-visible' : ''}`}>{raw}</div>
        <div className={`rf-asset${state === 'final' ? ' is-visible' : ''}`}>{final}</div>
      </div>
    </div>
  );
}
