import { SiteShell } from "@/components/site-shell";
import { fetchPlayers } from "@/lib/api";

export default async function DocsPage() {
  const players = await fetchPlayers();

  // Calculate tested players stats
  const totalPlayers = players.length;
  const playersWithTiers = players.filter(p => p.tiers.length > 0).length;
  const uniqueTiers = new Set(players.flatMap(p => p.tiers.map(t => t.tier))).size;
  
  // Count players by tier
  const tierCounts: Record<string, number> = {};
  players.forEach(player => {
    player.tiers.forEach(tier => {
      tierCounts[tier.tier] = (tierCounts[tier.tier] || 0) + 1;
    });
  });

  const docsContent = (
    <>
      <div className="docs-container">
        <header className="docs-header">
          <h1>UltraTiers Documentation</h1>
          <p className="docs-subtitle">Understanding the Point System & Ranking</p>
        </header>

        <section className="docs-section">
          <h2>How the Point System Works</h2>
          <p>
            UltraTiers tracks player rankings across 28 different game modes. 
            Each tier assignment earns points based on the difficulty and prestige of achieving that rank.
          </p>
          
          <div className="point-system-grid">
            <div className="point-card high-tier">
              <div className="point-header">HT1 - Highest Tier</div>
              <div className="point-value">60 pts</div>
              <div className="point-bar" style={{width: '100%'}}></div>
              <div className="point-desc">Top 1 player in any gamemode</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT1 - Lowest Tier 1</div>
              <div className="point-value">45 pts</div>
              <div className="point-bar" style={{width: '75%'}}></div>
              <div className="point-desc">Entry level for top tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT2 - High Tier 2</div>
              <div className="point-value">30 pts</div>
              <div className="point-bar" style={{width: '50%'}}></div>
              <div className="point-desc">Second highest tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT2 - Low Tier 2</div>
              <div className="point-value">20 pts</div>
              <div className="point-bar" style={{width: '33%'}}></div>
              <div className="point-desc">Lower second tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT3 - High Tier 3</div>
              <div className="point-value">10 pts</div>
              <div className="point-bar" style={{width: '17%'}}></div>
              <div className="point-desc">Third tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT3 - Low Tier 3</div>
              <div className="point-value">6 pts</div>
              <div className="point-bar" style={{width: '10%'}}></div>
              <div className="point-desc">Lower third tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT4 - High Tier 4</div>
              <div className="point-value">4 pts</div>
              <div className="point-bar" style={{width: '7%'}}></div>
              <div className="point-desc">Fourth tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT4 - Low Tier 4</div>
              <div className="point-value">3 pts</div>
              <div className="point-bar" style={{width: '5%'}}></div>
              <div className="point-desc">Lower fourth tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">HT5 - High Tier 5</div>
              <div className="point-value">2 pts</div>
              <div className="point-bar" style={{width: '3%'}}></div>
              <div className="point-desc">Fifth tier</div>
            </div>
            <div className="point-card">
              <div className="point-header">LT5 - Low Tier 5</div>
              <div className="point-value">1 pt</div>
              <div className="point-bar" style={{width: '2%'}}></div>
              <div className="point-desc">Entry tier</div>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>Tier Breakdown</h2>
          <div className="tier-explanation">
            <div className="tier-row">
              <span className="tier-label ht">HT (High Tier)</span>
              <p>Players who achieved the top position in a specific gamemode</p>
            </div>
            <div className="tier-row">
              <span className="tier-label lt">LT (Low Tier)</span>
              <p>Players who are on the leaderboard but not at the top position</p>
            </div>
            <div className="tier-row">
              <span className="tier-label unknown">Unknown</span>
              <p>Players who have played but not yet ranked on the leaderboard</p>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>Game Mode Categories</h2>
          <div className="mode-categories">
            <div className="category-card">
              <h3>Main Modes</h3>
              <p>Sword, Axe, Vanilla, Pot, NethOP, UHC, SMP, Mace</p>
              <span className="category-count">8 modes</span>
            </div>
            <div className="category-card">
              <h3>Sub Modes</h3>
              <p>Speed, Creeper, Elytra, Minecart, Trident, Diamond Survival, Diamond SMP, OG Vanilla, DeBuff, Bed, Bow, Manhunt</p>
              <span className="category-count">12 modes</span>
            </div>
            <div className="category-card">
              <h3>Extra Modes</h3>
              <p>AxePot, Pufferfish, OP, Spear Mace, Spear Elytra</p>
              <span className="category-count">5 modes</span>
            </div>
            <div className="category-card">
              <h3>Bonus Modes</h3>
              <p>Bridge, Pearl, Sumo</p>
              <span className="category-count">3 modes</span>
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>Tested Players Statistics</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{totalPlayers.toLocaleString()}</div>
              <div className="stat-label">Total Players Tracked</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{playersWithTiers.toLocaleString()}</div>
              <div className="stat-label">Players with Rankings</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{uniqueTiers}</div>
              <div className="stat-label">Unique Tier Types</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">28</div>
              <div className="stat-label">Game Modes</div>
            </div>
          </div>
          
          <div className="tier-distribution">
            <h3>Tier Distribution</h3>
            <div className="distribution-bars">
              {Object.entries(tierCounts)
                .sort(([,a], [,b]) => b - a)
                .slice(0, 10)
                .map(([tier, count]) => (
                  <div key={tier} className="distribution-row">
                    <span className="distribution-tier">{tier}</span>
                    <div className="distribution-bar-container">
                      <div 
                        className="distribution-bar" 
                        style={{width: `${Math.min(100, (count / Math.max(...Object.values(tierCounts))) * 100)}%`}}
                      ></div>
                    </div>
                    <span className="distribution-count">{count}</span>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <section className="docs-section">
          <h2>Global Rankings</h2>
          <p>
            The Global tab combines points from all 28 game modes to create an overall leaderboard.
            Players can also filter by region: EU, NA, SA, AS, AU, AF, ME, and Other.
          </p>
        </section>

        <section className="docs-section">
          <h2>About UltraTiers</h2>
          <p>
            UltraTiers is a comprehensive ranking system for UltraPVP network players. 
            It tracks player performance across all game modes and provides a unified point system 
            to compare overall skill and dedication across the network.
          </p>
          <div className="about-links">
            <a href="https://store.ultrapvp.net" target="_blank" rel="noreferrer" className="docs-link">
              Visit UltraPVP Store
            </a>
            <a href="https://ultrapvp.net" target="_blank" rel="noreferrer" className="docs-link">
              Main Website
            </a>
          </div>
        </section>
      </div>
    </>
  );

  return <SiteShell initialPlayers={players} isDocsPage={true} docsContent={docsContent} />;
}