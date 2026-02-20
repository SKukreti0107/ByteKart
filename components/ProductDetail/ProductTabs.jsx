const tabs = ['Specs', 'Performance', 'Sustainability']

const tabContent = {
  Specs: [
    'Boost Clock: 2.8 GHz',
    'Memory: 16GB GDDR7',
    'Power Draw: 280W',
    'Ports: 3x DP 2.1, 1x HDMI 2.1',
  ],
  Performance: [
    'Averages 140+ FPS at 1440p ultra settings',
    'Creator mode with stable encode acceleration',
    'Dynamic fan profile for low acoustic footprint',
  ],
  Sustainability: [
    'Shipped in 100% recyclable packaging',
    'Aluminum shroud with 65% recycled content',
    'Carbon-offset logistics for major regions',
  ],
}

export default function ProductTabs({ activeTab, setActiveTab }) {
  return (
    <section className="window-container border-none p-6">
      <div className="mb-5 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-4 py-2 text-sm font-bold ${
              activeTab === tab
                ? 'bg-[var(--matcha-deep)] text-white'
                : 'bg-[var(--off-white)] text-[var(--charcoal-dark)] hover:bg-[var(--baby-green)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {tabContent[activeTab].map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm font-medium text-[color:var(--charcoal-dark)]/80">
            <span className="material-symbols-outlined text-base text-[var(--matcha-deep)]">check_circle</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}
