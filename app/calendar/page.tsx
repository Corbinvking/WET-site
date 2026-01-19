'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  calendarEvents,
  groupEventsByDay,
  formatEventTime,
  getDeskLabel,
  getDeskColor,
  type CalendarEvent,
  type EventDesk,
  type EventImpact,
} from '@/data/calendar';

type ViewMode = 'day' | 'week' | 'month' | 'agenda';

const deskFilters: { value: EventDesk | 'all'; label: string }[] = [
  { value: 'all', label: 'All Desks' },
  { value: 'politics', label: 'Politics' },
  { value: 'economy', label: 'Economy' },
  { value: 'world', label: 'World' },
  { value: 'elections', label: 'Elections' },
  { value: 'crypto', label: 'Crypto' },
  { value: 'tech', label: 'Tech' },
  { value: 'sports', label: 'Sports' },
];

const impactFilters: { value: EventImpact | 'all'; label: string }[] = [
  { value: 'all', label: 'All Impact' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

export default function CalendarPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);
  const [deskFilter, setDeskFilter] = useState<EventDesk | 'all'>('all');
  const [impactFilter, setImpactFilter] = useState<EventImpact | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Current week: Jan 18-24, 2026
  const weekStart = '2026-01-18';
  const weekEnd = '2026-01-24';

  // Filter events
  const filteredEvents = useMemo(() => {
    return calendarEvents.filter(event => {
      // Desk filter
      if (deskFilter !== 'all' && event.desk !== deskFilter) return false;
      
      // Impact filter
      if (impactFilter !== 'all' && event.impact !== impactFilter) return false;
      
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(query);
        const matchesEntities = event.entities.some(e => e.toLowerCase().includes(query));
        if (!matchesTitle && !matchesEntities) return false;
      }
      
      return true;
    });
  }, [deskFilter, impactFilter, searchQuery]);

  // Group by day
  const groupedEvents = useMemo(() => {
    return groupEventsByDay(filteredEvents);
  }, [filteredEvents]);

  // Sort days
  const sortedDays = useMemo(() => {
    return Object.keys(groupedEvents).sort();
  }, [groupedEvents]);

  const toggleExpand = (eventId: string) => {
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Bar - ForexFactory style */}
      <div className="sticky top-[48px] z-40 bg-[#2a3f5f] border-b border-[#1e2d44]">
        <div className="container-wet">
          <div className="flex items-center justify-between py-2">
            {/* Left: Date range */}
            <div className="flex items-center gap-3">
              <button className="p-1 text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-white">
                This Week: Jan 18 - Jan 24
              </span>
              <button className="p-1 text-slate-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Right: Quick jumps */}
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#3a5070] rounded transition-colors">
                Up Next
              </button>
              <button className="px-2 py-1 text-xs font-medium text-slate-300 hover:text-white hover:bg-[#3a5070] rounded transition-colors">
                Search Events
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-wet py-4">
        <div className="flex gap-6">
          {/* Left Sidebar - Mini Calendar & Quick Jumps */}
          <aside className="hidden lg:block w-48 flex-shrink-0">
            {/* Navigation Section */}
            <div className="mb-4 text-xs font-medium text-text-secondary">
              <span className="text-text-primary font-semibold">Navigation</span>
            </div>

            {/* Mini Calendar */}
            <div className="mb-6 p-3 bg-bg-surface rounded border border-border">
              <div className="flex items-center justify-between mb-2">
                <button className="p-0.5 text-text-muted hover:text-text-primary">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-xs font-semibold text-text-primary">Jan 2026</span>
                <button className="p-0.5 text-text-muted hover:text-text-primary">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <MiniCalendar />
            </div>

            {/* Quick Jumps */}
            <div className="space-y-1 text-xs">
              <button className="block w-full text-left px-2 py-1.5 text-brand-primary font-medium hover:bg-bg-hover rounded">Today</button>
              <button className="block w-full text-left px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded">Tomorrow</button>
              <button className="block w-full text-left px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded">This Week</button>
              <button className="block w-full text-left px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded">Next Week</button>
              <div className="border-t border-border my-2" />
              <button className="block w-full text-left px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded">Yesterday</button>
              <button className="block w-full text-left px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded">Last Week</button>
              <button className="block w-full text-left px-2 py-1.5 text-text-secondary hover:bg-bg-hover rounded">Last Month</button>
              <div className="border-t border-border my-2" />
              <button className="block w-full text-left px-2 py-1.5 text-brand-primary font-medium hover:bg-bg-hover rounded flex items-center gap-1">
                <span className="text-brand-gold">↗</span> Up Next
              </button>
            </div>

            {/* Category Calendars */}
            <div className="mt-6 space-y-1 text-xs">
              <div className="text-text-muted mb-2 font-medium">DESK CALENDARS</div>
              {deskFilters.slice(1).map(desk => (
                <button
                  key={desk.value}
                  onClick={() => setDeskFilter(desk.value as EventDesk)}
                  className={cn(
                    "block w-full text-left px-2 py-1.5 rounded flex items-center gap-2",
                    deskFilter === desk.value ? "bg-brand-primary/10 text-brand-primary" : "text-text-secondary hover:bg-bg-hover"
                  )}
                >
                  <span className={cn("w-3 h-3 rounded-sm", getDeskBgColor(desk.value as EventDesk))} />
                  {desk.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Main Table */}
          <div className="flex-1 min-w-0">
            {/* Table Header */}
            <div className="bg-[#e8eaed] border border-[#c8ccd0] rounded-t overflow-hidden">
              <div className="grid grid-cols-[80px_60px_70px_50px_1fr_100px_80px_80px_80px_40px] text-[11px] font-semibold text-[#4a5568] uppercase tracking-wide">
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Date</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Time</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Desk</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Impact</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Event</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Markets</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Forecast</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Previous</div>
                <div className="px-2 py-2 border-r border-[#c8ccd0]">Actual</div>
                <div className="px-2 py-2"></div>
              </div>
            </div>

            {/* Table Body */}
            <div className="border-x border-b border-[#c8ccd0] rounded-b overflow-hidden">
              {sortedDays.map(day => (
                <DayGroup
                  key={day}
                  date={day}
                  events={groupedEvents[day]}
                  expandedEventId={expandedEventId}
                  onToggleExpand={toggleExpand}
                />
              ))}
            </div>

            {/* Empty state */}
            {sortedDays.length === 0 && (
              <div className="text-center py-12 text-text-muted">
                No events match your filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini Calendar Component
function MiniCalendar() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  // Jan 2026 starts on Thursday (index 4)
  const firstDay = 4;
  const daysInMonth = 31;
  const today = 19; // Jan 19
  const weekStart = 18;
  const weekEnd = 24;

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(<div key={`empty-${i}`} className="w-5 h-5" />);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today;
    const isInWeek = d >= weekStart && d <= weekEnd;
    cells.push(
      <button
        key={d}
        className={cn(
          "w-5 h-5 text-[10px] rounded-sm flex items-center justify-center transition-colors",
          isToday && "bg-brand-primary text-white font-bold",
          isInWeek && !isToday && "bg-blue-100 text-brand-primary",
          !isInWeek && !isToday && "text-text-secondary hover:bg-bg-hover"
        )}
      >
        {d}
      </button>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {days.map((d, i) => (
          <div key={i} className="w-5 h-4 text-[9px] text-text-muted text-center font-medium">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells}
      </div>
    </div>
  );
}

// Day Group Component (ForexFactory-style day header + events)
function DayGroup({
  date,
  events,
  expandedEventId,
  onToggleExpand,
}: {
  date: string;
  events: CalendarEvent[];
  expandedEventId: string | null;
  onToggleExpand: (id: string) => void;
}) {
  const dateObj = new Date(date + 'T12:00:00Z');
  const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const highImpactCount = events.filter(e => e.impact === 'high').length;

  return (
    <div>
      {/* Day Header Row */}
      <div className="bg-[#f4f5f6] border-b border-[#c8ccd0] grid grid-cols-[80px_1fr] text-[11px]">
        <div className="px-2 py-1.5 border-r border-[#c8ccd0] font-semibold text-text-primary">
          <div>{dayName}</div>
          <div className="text-text-muted font-normal">{monthDay}</div>
        </div>
        <div className="px-2 py-1.5 flex items-center gap-2">
          {highImpactCount > 0 && (
            <span className="text-[10px] px-1.5 py-0.5 bg-red-100 text-red-700 rounded font-medium">
              {highImpactCount} High Impact
            </span>
          )}
          <span className="text-[10px] text-text-muted">{events.length} events</span>
        </div>
      </div>

      {/* Event Rows */}
      {events.map((event, idx) => (
        <EventRow
          key={event.id}
          event={event}
          isExpanded={expandedEventId === event.id}
          onToggle={() => onToggleExpand(event.id)}
          showDate={false}
          isLast={idx === events.length - 1}
        />
      ))}
    </div>
  );
}

// Event Row Component (ForexFactory-style)
function EventRow({
  event,
  isExpanded,
  onToggle,
  showDate,
  isLast,
}: {
  event: CalendarEvent;
  isExpanded: boolean;
  onToggle: () => void;
  showDate: boolean;
  isLast: boolean;
}) {
  return (
    <>
      <div
        className={cn(
          "grid grid-cols-[80px_60px_70px_50px_1fr_100px_80px_80px_80px_40px] text-[11px] border-b border-[#e8eaed] hover:bg-[#f8f9fa] cursor-pointer transition-colors",
          isExpanded && "bg-[#f0f7ff]",
          isLast && !isExpanded && "border-b-[#c8ccd0]"
        )}
        onClick={onToggle}
      >
        {/* Date (empty for grouped view) */}
        <div className="px-2 py-2 border-r border-[#e8eaed]" />

        {/* Time */}
        <div className="px-2 py-2 border-r border-[#e8eaed] text-text-muted">
          {formatEventTime(event)}
        </div>

        {/* Desk */}
        <div className="px-2 py-2 border-r border-[#e8eaed]">
          <span className={cn("font-medium", getDeskColor(event.desk))}>
            {event.desk.toUpperCase().slice(0, 3)}
          </span>
        </div>

        {/* Impact */}
        <div className="px-2 py-2 border-r border-[#e8eaed] flex items-center justify-center">
          <ImpactIndicator impact={event.impact} />
        </div>

        {/* Event Title */}
        <div className="px-2 py-2 border-r border-[#e8eaed]">
          <span className="font-medium text-text-primary hover:text-brand-primary">
            {event.title}
          </span>
        </div>

        {/* Markets */}
        <div className="px-2 py-2 border-r border-[#e8eaed]">
          {event.relatedMarkets.length > 0 ? (
            <div className="flex items-center gap-1">
              <span className="text-text-muted">{event.relatedMarkets.length}</span>
              <div className="flex gap-0.5">
                {event.relatedMarkets.some(m => m.platforms.includes('kalshi')) && (
                  <span className="w-4 h-4 bg-blue-100 text-blue-700 text-[8px] font-bold rounded flex items-center justify-center">K</span>
                )}
                {event.relatedMarkets.some(m => m.platforms.includes('polymarket')) && (
                  <span className="w-4 h-4 bg-purple-100 text-purple-700 text-[8px] font-bold rounded flex items-center justify-center">P</span>
                )}
              </div>
            </div>
          ) : (
            <span className="text-text-subtle">—</span>
          )}
        </div>

        {/* Forecast */}
        <div className="px-2 py-2 border-r border-[#e8eaed] text-text-secondary">
          {event.forecast || '—'}
        </div>

        {/* Previous */}
        <div className="px-2 py-2 border-r border-[#e8eaed] text-text-secondary">
          {event.previous || '—'}
        </div>

        {/* Actual */}
        <div className="px-2 py-2 border-r border-[#e8eaed] text-text-muted">
          {event.actual || '—'}
        </div>

        {/* Expand chevron */}
        <div className="px-2 py-2 flex items-center justify-center">
          <svg
            className={cn("w-4 h-4 text-text-muted transition-transform", isExpanded && "rotate-180")}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Panel */}
      {isExpanded && <EventExpandedPanel event={event} />}
    </>
  );
}

// Impact Indicator (ForexFactory colored folders)
function ImpactIndicator({ impact }: { impact: EventImpact }) {
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-orange-400',
    low: 'bg-yellow-400',
  };

  return (
    <div className={cn("w-4 h-4 rounded-sm", colors[impact])} title={`${impact} impact`} />
  );
}

// Expanded Panel (ForexFactory detail section)
function EventExpandedPanel({ event }: { event: CalendarEvent }) {
  const [activeTab, setActiveTab] = useState<'summary' | 'markets' | 'history' | 'sources'>('summary');

  return (
    <div className="bg-[#f0f7ff] border-b border-[#c8ccd0] px-4 py-4">
      <div className="grid grid-cols-[1fr_1fr] gap-6">
        {/* Left Column: Specs */}
        <div className="border border-[#c8ccd0] rounded bg-white">
          <div className="bg-[#e8eaed] px-3 py-1.5 border-b border-[#c8ccd0] flex items-center justify-between">
            <span className="text-[11px] font-semibold text-text-primary">Specs</span>
            <span className="text-[10px] text-brand-primary">© W.E.T.</span>
          </div>
          <div className="p-3 text-[11px] space-y-2">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium text-text-muted">Summary</span>
              <span className="text-text-primary">{event.summary}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium text-text-muted">Market Angle</span>
              <span className="text-text-primary">{event.marketAngle}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium text-text-muted">Impact</span>
              <span className={cn(
                "font-medium",
                event.impact === 'high' && "text-red-600",
                event.impact === 'medium' && "text-orange-600",
                event.impact === 'low' && "text-yellow-600"
              )}>
                {event.impact.charAt(0).toUpperCase() + event.impact.slice(1)}
              </span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="font-medium text-text-muted">Type</span>
              <span className="text-text-primary capitalize">{event.eventType}</span>
            </div>
            {event.entities.length > 0 && (
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-text-muted">Entities</span>
                <div className="flex flex-wrap gap-1">
                  {event.entities.map(entity => (
                    <span key={entity} className="px-1.5 py-0.5 bg-bg-surface text-text-secondary rounded text-[10px]">
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {event.sourceLinks.length > 0 && (
              <div className="pt-2 border-t border-border">
                <a href="#" className="text-brand-primary hover:underline text-[10px]">
                  ↗ View full details for {event.title}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: History or Markets */}
        <div className="border border-[#c8ccd0] rounded bg-white">
          <div className="bg-[#e8eaed] px-3 py-1.5 border-b border-[#c8ccd0]">
            <span className="text-[11px] font-semibold text-text-primary">
              {event.relatedMarkets.length > 0 ? 'Linked Markets' : 'History'}
            </span>
          </div>
          <div className="p-3 text-[11px]">
            {event.relatedMarkets.length > 0 ? (
              <div className="space-y-2">
                {event.relatedMarkets.map(market => (
                  <Link
                    key={market.marketId}
                    href={`/market/${market.marketSlug}`}
                    className="block p-2 bg-bg-surface rounded hover:bg-bg-hover transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-text-primary group-hover:text-brand-primary">
                        {market.marketTitle}
                      </span>
                      <div className="flex items-center gap-2">
                        {market.yesProbability !== undefined && (
                          <span className="text-brand-primary font-semibold">{market.yesProbability}%</span>
                        )}
                        <div className="flex gap-0.5">
                          {market.platforms.includes('kalshi') && (
                            <span className="w-4 h-4 bg-blue-100 text-blue-700 text-[8px] font-bold rounded flex items-center justify-center">K</span>
                          )}
                          {market.platforms.includes('polymarket') && (
                            <span className="w-4 h-4 bg-purple-100 text-purple-700 text-[8px] font-bold rounded flex items-center justify-center">P</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {market.divergence && market.divergence > 0 && (
                      <div className="text-[10px] text-brand-primary mt-1">
                        Δ{market.divergence}pts divergence
                      </div>
                    )}
                  </Link>
                ))}
                <div className="pt-2 text-center">
                  <button className="text-brand-primary hover:underline text-[10px]">
                    ↓ More markets affected
                  </button>
                </div>
              </div>
            ) : event.history && event.history.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="text-left text-text-muted">
                    <th className="pb-1 font-medium">Date</th>
                    <th className="pb-1 font-medium text-right">Actual</th>
                    <th className="pb-1 font-medium text-right">Forecast</th>
                    <th className="pb-1 font-medium text-right">Previous</th>
                  </tr>
                </thead>
                <tbody>
                  {event.history.map((h, i) => (
                    <tr key={i} className="border-t border-border">
                      <td className="py-1 text-brand-primary">{h.date}</td>
                      <td className="py-1 text-right text-green-600">{h.actual}</td>
                      <td className="py-1 text-right text-text-secondary">{h.forecast}</td>
                      <td className="py-1 text-right text-text-muted">{h.previous}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-text-muted">No history available.</p>
            )}

            {/* Related Stories placeholder */}
            {event.relatedMarkets.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-text-muted">Related Stories</span>
                  <button className="text-brand-primary text-[10px]">Submit Related Story</button>
                </div>
                <p className="text-text-subtle text-[10px]">Currently no related stories.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for desk background colors
function getDeskBgColor(desk: EventDesk): string {
  const colors: Record<EventDesk, string> = {
    politics: 'bg-red-500',
    economy: 'bg-blue-500',
    world: 'bg-purple-500',
    elections: 'bg-orange-500',
    crypto: 'bg-yellow-500',
    tech: 'bg-cyan-500',
    sports: 'bg-green-500',
  };
  return colors[desk];
}


